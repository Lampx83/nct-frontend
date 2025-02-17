"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import StepContent from "../components/codelab/StepContent";
import Header from "../components/codelab/Header";
import BookCover from "../components/codelab/BookCover";
import firebase from "firebase/compat/app";
import debounce from "../utils/debounce";
import app from "../firebase";
import "firebase/compat/database";
import { Timestamp } from "firebase/firestore";
import {
  getDatabase,
  onDisconnect,
  ref,
  set,
  onValue,
  off,
  push,
  get,
} from "firebase/database";
import "firebase/firestore";
import { Previewer } from "pagedjs";
import StepList from "../components/codelab/StepList";
import config from "../config";
import "@/css/toolbar.css";
import { useSearchParams } from "next/navigation";
import { Toaster } from "sonner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAutoLogout } from "../hooks/useAutoLogout";
import LoginModal from "../modals/LoginModal";
import DocError from "../components/codelab/DocError";
import { Button, Offcanvas } from "react-bootstrap";
import DocControls from "../components/codelab/DocControls";
import { usePathname, useRouter } from "next/navigation";
const TOAST_TYPES = {
  RAISE_HAND: "RAISE_HAND",
  LOWER_HAND: "LOWER_HAND",
  ENTER_ROOM: "ENTER_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
};

const Document = ({
  dataResponse,
  isRoomInPath,
  url,
  steps,
  contents,
  listChapter,
  chap,
}) => {
  const params = useParams();
  const pathname = usePathname(); // Lấy path hiện tại (VD: "/room/bAmGhf")
  const searchParams = useSearchParams(); // Lấy query string (VD: "?display=doc")
  const router = useRouter();

  const update = searchParams.get("update");
  const slide = searchParams.get("slide") || 1;
  const [currentStep, setCurrentStep] = useState(0);
  const [showStepList, setShowStepList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [slideTitle, setSlideTitle] = useState(null);
  const [template, setTemplate] = useState("NEU");
  const isSyllabusInPath = window.location.pathname.includes("syllabus");
  const display = searchParams.get("display") || "slide";
  const isTeacher = room?.userID === user?.uid;

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const [raisedHands, setRaisedHands] = useState({});
  const previousHandsRef = useRef({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [docError, setDocError] = useState(null);
  const isListenerAddedRef = useRef(false);
  const [isRaised, setIsRaised] = useState(false);

  useAutoLogout(user);
  const [sidebar, setSidebar] = useState(false);

  const onDocClick = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams.toString()); // Chuyển thành đối tượng có thể chỉnh sửa
    queryParams.set("display", "doc"); // Ghi đè giá trị của display
    router.replace(`${pathname}?${queryParams.toString()}`); // Cập nhật URL
  }, [location]);

  const onSlideClick = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams.toString()); // Chuyển thành đối tượng có thể chỉnh sửa
    queryParams.set("display", "slide"); // Ghi đè giá trị của display
    router.replace(`${pathname}?${queryParams.toString()}`); // Cập nhật URL
  }, [router, pathname, searchParams]);
  const onBookClick = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams.toString()); // Chuyển thành đối tượng có thể chỉnh sửa
    queryParams.set("display", "book"); // Ghi đè giá trị của display

    router.replace(`${pathname}?${queryParams.toString()}`); // Cập nhật URL
  }, [location]);

  async function saveScrollLog(room, user) {
    try {
      await fetch(`${config.API_BASE_URL}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logType: "scrollPosition",
          roomID: room?.roomID,
          user: user.displayName,
        }),
      });
    } catch (err) {
      console.error("Error saving log to Firebase:", err);
    }
  }

  const handleStepClick = useCallback(
    (index) => {
      console.log("Handling step click:", index);

      if (index < 0 || index >= steps.length) {
        console.error("Invalid step index:", index);
        return;
      }

      setCurrentStep(index);
      setShowStepList(false);

      window.location.hash = `#${index}`;

      if (room?.roomID && user?.uid) {
        try {
          const db = getDatabase(app);
          let link = chap ? `/chap${chap}` : "";
          set(
            ref(
              db,
              `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID
              }${link}/users/${user.uid}`
            ),
            {
              step: index,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              name: user.displayName,
              email: user.email,
            }
          );
        } catch (error) {
          console.error("Error updating step in Firebase:", error);
        }
      }
    },
    [chap, user]
  );

  const handleTitleClick = useCallback(() => {
    handleStepClick(0);
  }, [handleStepClick]);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevChap = usePrevious(chap);

  const handleUserLogin = (userData) => {
    if (userData) {
      setUser(userData);
      setShowLogin(false);
    }
  };
  const handleLogLink = () => {
    // Select all anchor (<a>) elements in the document
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      // Skip links that contain the text "Đăng xuất"
      if (link.textContent.trim() === "Đăng xuất") {
        return;
      }

      // Remove any existing click event listener by cloning the element
      const clonedLink = link.cloneNode(true);
      link.parentNode.replaceChild(clonedLink, link);

      // Add a new event listener for click events
      clonedLink.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent default behavior (e.g., navigation)

        try {
          // Send a log of the clicked link to the server
          const response = await fetch(`${config.API_BASE_URL}/logs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logType: "clickLink",
              roomID: room?.roomID, // Ensure `room` exists before accessing `roomID`
              timestamp: new Date().toISOString(), // ISO timestamp format
              userName: user.displayName, // Assuming `user` exists and has `displayName`
              log: `Link: ${clonedLink.href}`, // Log the link's URL
            }),
          });

          if (!response.ok) {
            console.error("Failed to log clicked link:", response.statusText);
          }
        } catch (error) {
          console.error("Error logging clicked link:", error);
        }

        // Open the link in a new tab
        window.open(clonedLink.href, "_blank");
      });
    });
  };

  const readDoc = async () => {
    try {
      if (dataResponse.labName) {
        document.title = dataResponse.labName;
        setSlideTitle(dataResponse.labName);
      }

      setRoom(dataResponse);
      let labConfig = dataResponse.config;

      if (isRoomInPath) {
        //In room
        if (update === "true" && dataResponse.docID) {
          // navigate(`/doc/${dataResponse.docID}`);
          router.replace(`/doc/${dataResponse.docID}`);
          return;
        }
        labConfig = dataResponse.config;
        dataResponse.teacher = dataResponse.userID === user.uid;

        if (dataResponse?.template) setTemplate(dataResponse?.template);
        const db = getDatabase(app);
        let link = chap ? `/chap${chap}` : "";
        const refUsers = ref(
          db,
          `/labs/${dataResponse.docID.replace(/\./g, "")}/${dataResponse?.roomID
          }${link}/users/${user.uid}`
        );

        await onDisconnect(refUsers).set({});
        const handleOnDisconnect = async () => {
          try {
            // Make the API call when disconnecting
            const response = await fetch(`${config.API_BASE_URL}/logs`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                logType: "leaveRoom",
                roomID: dataResponse?.roomID,
                timestamp: new Date().toISOString(), // Use ISO timestamp for consistency
                userName: user.displayName,
                log: "Thoát trình duyệt",
              }),
            });
            if (!response.ok) {
              console.error(
                "Failed to log on disconnect:",
                response.statusText
              );
            } else {
            }
          } catch (error) {
            console.error("Error logging disconnect event:", error);
          }
        };
        if (!isListenerAddedRef.current) {
          window.addEventListener("beforeunload", handleOnDisconnect);
          isListenerAddedRef.current = true;
        }
        // Register the event listener for disconnect
        // log click link
        const hash = window.location.hash;
        const hashIndex = hash ? parseInt(hash.substring(1), 10) : 0;
        //Vao phong, dang ky step
        if (hashIndex > 0) {
          let link = chap ? `/chap${chap}` : "";
          set(
            ref(
              db,
              `/labs/${dataResponse.docID.replace(/\./g, "")}/${dataResponse?.roomID
              }${link}/users/${user.uid}`
            ),
            {
              step: hashIndex,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              name: user.displayName,
              email: user.email,
            }
          );
        }

        const handleChapChange = async () => {
          if (isRoomInPath && room && user) {
            const db = getDatabase(app);
            const prevChapRef = ref(
              db,
              `/labs/${dataResponse.docID.replace(/\./g, "")}/${dataResponse?.roomID
              }/chap${prevChap}/users/${user.uid}`
            );
            await set(prevChapRef, null); // Set the data to null to clear it
          }
        };
        if (prevChap !== chap) {
          await handleChapChange();
        }
      }

      setLoading(false);
      if (!isRoomInPath) {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("update", "false");

        router.replace(`${location.pathname}?${queryParams.toString()}`);
      }
    } catch (error) {
      console.error("Error fetching doc:", error);
      setDocError("An error occurred while loading the document.");
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   handleLogLink();
  // }, [loading, room, user, chap, currentStep]);
  useEffect(() => {
    let lastLoggedPosition = null;
    if (room && room?.roomID && user) {
      const debouncedSaveScrollLog = debounce(() => {
        saveScrollLog(room, user);
      }, 300);
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (
          scrollTop + windowHeight >= documentHeight - 1 &&
          lastLoggedPosition !== "bottom"
        ) {
          try {
            lastLoggedPosition = "bottom";
            debouncedSaveScrollLog();
          } catch (error) {
            console.error("Error logging scroll event: ", error);
          }
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [room, user, currentStep]);
  useEffect(() => {
    if (isRoomInPath) {
      if (!user) {
        // setLoading(!user);
        setShowLogin(true);
        return;
      }
    }
    readDoc();
  }, [user, selectedItem, chap, prevChap, isRoomInPath]);

  useEffect(() => {
    const hashIndex = parseInt(window.location.hash.substring(1), 10);
    if (!isNaN(hashIndex) && hashIndex <= steps.length) {
      setCurrentStep(hashIndex);
    }
  }, [chap]);

  useEffect(() => {  //Change css
    if (!loading) {
      if (display === "book") {
        let paged = new Previewer();
        let DOMContent = document.querySelector(".main-content");
        paged
          .preview(DOMContent, ["../css/book.css"], document.body)
          .then(() => { });
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = `/css/${display}.css`;
        link.id = "dynamic-css";
        const existingLink = document.getElementById("dynamic-css");
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
        document.head.appendChild(link);
      }
    }
  }, [loading, display]);

  useEffect(() => {
    if (room?.roomID && user) {
      const db = getDatabase(app);
      const raisedHandsRef = ref(
        db,
        `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}/users`
      );

      const unsubscribe = onValue(raisedHandsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Get current raised hands
          const currentHands = Object.entries(data)
            .filter(([uid, userData]) => userData.isRaise)
            .reduce((acc, [uid, userData]) => {
              acc[uid] = userData;
              return acc;
            }, {});

          // Only process notifications if we have previous state
          // This prevents notifications on initial load
          if (Object.keys(previousHandsRef.current).length > 0) {
            // Check for new raised hands
            Object.entries(currentHands).forEach(([uid, userData]) => {
              if (
                uid !== user.uid &&
                (!previousHandsRef.current[uid] ||
                  !previousHandsRef.current[uid].isRaise) &&
                userData.timestamp > Date.now() - 2000 // Only show if raised within last 2 seconds
              ) {
                setToastMessage(`${userData.name} raised their hand!`);
                setShowToast(true);
              }
            });

            // Check for lowered hands
            Object.entries(previousHandsRef.current).forEach(
              ([uid, userData]) => {
                if (
                  uid !== user.uid &&
                  userData.isRaise &&
                  (!currentHands[uid] || !currentHands[uid].isRaise) &&
                  data[uid]?.timestamp > Date.now() - 2000 // Only show if lowered within last 2 seconds
                ) {
                  const userName =
                    userData.name || data[uid]?.name || "Someone";
                  setToastMessage(`${userName} lowered their hand`);
                  setShowToast(true);
                }
              }
            );
          }

          // Update the previous state reference
          previousHandsRef.current = currentHands;
          // Update the state
          setRaisedHands(currentHands);
        }
      });

      return () => {
        // Cleanup listener
        off(raisedHandsRef);
      };
    }
  }, [room, user]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleWarning = () => {
    setShowWarningModal(true);
  };

  const showWarning = useAutoLogout(handleWarning);

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  let mainContent;
  if (display != null && (display === "book" || display === "doc")) {
    //Hiển thị toàn bộ nội dung
    mainContent = contents.map((content, index) => {
      return (
        <div className="container"

        >
          <StepContent
            room={room}
            steps={steps}
            step={steps[index]}
            content={content}
            currentStep={index}
            display={display}
            user={user}
          />
        </div>
      );
    });
  } else {
    mainContent = (
      <StepContent
        chap={chap}
        room={room}
        steps={steps}
        step={steps[currentStep]}
        content={contents[currentStep]}
        currentStep={currentStep}
        display={display}
        user={user}
      />
    );
  }

  const handleDownload = () => {
    // Implement download logic
    console.log("Downloading document...");
  };

  const handleCompare = () => {
    // Implement version comparison logic
    console.log("Comparing versions...");
  };

  const handlePrint = () => {
    window.print();
  };
  const handleShare = () => {
    // Implement share logic
    console.log("Sharing document...");
  };
  const handleTemplate = useCallback((value) => {
    setTemplate(value);
  }, []);
  const handleSettingModal = useCallback((value) => {
    setShowSettingsModal(value);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (window.innerWidth >= 1400) return;

      // Check if we're not in an input field
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          if (currentStep > 0) {
            handleStepClick(currentStep - 1);
          }
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          if (currentStep < steps.length - 1) {
            handleStepClick(currentStep + 1);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentStep, steps.length, handleStepClick]);

  const [showNavHint, setShowNavHint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400 && !showNavHint) {
        setShowNavHint(true);
        setTimeout(() => setShowNavHint(false), 3000);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (room?.roomID) {
      const db = getDatabase(app);
      const titleRef = ref(
        db,
        `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}/title`
      );

      const unsubscribe = onValue(titleRef, (snapshot) => {
        const newTitle = snapshot.val();
        if (newTitle) {
          setSlideTitle(newTitle);
        }
      });

      return () => unsubscribe();
    }
  }, [room]);

  const sendNotification = async (type, userName) => {
    if (!room?.roomID || !user) return;

    const db = getDatabase(app);
    const notificationsRef = ref(
      db,
      `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}/notifications`
    );

    await push(notificationsRef, {
      type,
      userName: userName || user.displayName,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  };

  const toggleRaiseHand = async () => {
    if (!room?.roomID || !user) {
      console.log("Validation failed");
      return;
    }

    const newRaisedState = !isRaised;
    const db = getDatabase(app);
    const userRef = ref(
      db,
      `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${chap ? `/chap${chap}` : ""
      }/users/${user.uid}`
    );

    try {
      // Get current user data
      const currentData = (await get(userRef)).val() || {};

      const updateData = {
        ...currentData,
        isRaise: newRaisedState,
        name: user.displayName,
        timestamp: Date.now(),
        photo: user.photoURL,
      };

      await set(userRef, updateData);

      // Update local state
      setIsRaised(newRaisedState);

      // Send notification to all users
      await sendNotification(
        newRaisedState ? TOAST_TYPES.RAISE_HAND : TOAST_TYPES.LOWER_HAND,
        user.displayName
      );

      // Send log to backend MongoDB
      const currentStep = window.location.hash.split("#")[1] || null;
      await fetch(`${config.API_BASE_URL}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logType: "raiseHand",
          roomID: room.roomID,
          userID: user.uid,
          userName: user.displayName,
          stepID: currentStep,
          status: newRaisedState ? "RAISED_HAND" : "LOWERED_HAND",
        }),
      });

      setToastMessage(
        newRaisedState ? "You raised your hand!" : "You lowered your hand"
      );
      setShowToast(true);
    } catch (error) {
      console.error("Error in toggleRaiseHand:", error);
      setToastMessage("Error updating hand status");
      setShowToast(true);
    }
  };

  // Force logout effect
  useEffect(() => {
    if (!room?.roomID || !user || isTeacher) return;

    const db = getDatabase(app);
    const forceLogoutRef = ref(
      db,
      `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}/forceLogout`
    );

    const unsubscribe = onValue(forceLogoutRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.users && data.users.includes(user.uid)) {
        // User is in the force logout list
        firebase
          .auth()
          .signOut()
          .then(() => {
            // Clear the forceLogout flag for this user
            const userIndex = data.users.indexOf(user.uid);
            if (userIndex > -1) {
              data.users.splice(userIndex, 1);
              set(forceLogoutRef, data.users.length > 0 ? data : null);
            }

            // Redirect to home or show message
            setShowToast(true);
            setToastMessage("You have been logged out by the teacher");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          });
      }
    });

    return () => unsubscribe();
  }, [room?.roomID, user, isTeacher]);

  return display.includes("book") ? (
    <div className="print">
      {display.includes("book") && <BookCover />}
      {mainContent}
    </div>
  ) : (
    <div className={`${template}`}>
      <Toaster position={"top-right"} richColors className={"me-4"} />
      {(display.includes("slide") || display.includes("doc")) &&
        !isSyllabusInPath &&
        user && (
          <Header
            template={template}
            showSettingsModal={showSettingsModal}
            handleSettingModal={handleSettingModal}
            steps={steps}
            contents={contents}
            listChapter={listChapter}
            currentStep={currentStep}
            handleStepClick={handleStepClick}
            showStepList={showStepList}
            slideTitle={slideTitle}
            onDocClick={onDocClick}
            onSlideClick={onSlideClick}
            onBookClick={onBookClick}
            room={room}
            chap={chap}
            onUserLogin={handleUserLogin}
            loading={loading}
            onTitleClick={handleTitleClick}
            display={display}
            raisedHands={raisedHands}
            user={user}
            handleTemplate={handleTemplate}
            docError={docError}
            handleShowSideBar={() => setSidebar((prev) => !prev)}
            isRaised={isRaised}
            toggleRaiseHand={toggleRaiseHand}
          />
        )}


      <div className="fluid-container overflow-hidden2">
        <div className="d-flex">
          <div
            className={`sidebar-container ${sidebar ? "open" : "closed"}`}
            style={{
              width: sidebar ? "320px" : "0px",
              overflow: "hidden",
              // height: "100vh",
              position: "sticky",
              top: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "white",
            }}
          >
            <div
              className=""
              style={{
                height: "calc(100vh - 66px)",
                overflowY: "auto",
                overflowX: "hidden",
                marginTop: 66,

              }}
            >
              <StepList
                steps={steps}
                currentStep={currentStep}
                handleStepClick={handleStepClick}
                show={showStepList}
                display={display}
                room={room}
                chap={chap}
                user={user}
              />
            </div>
          </div>
          <div
            style={{
              paddingLeft: 0,
              width: sidebar ? "calc(100% - 320px)" : "100%",
            }}
          >
            {loading ? (
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-primary m-5"
                  role="status"
                ></div>
              </div>
            ) : docError ? (
              <DocError error={docError} />
            ) : (
              room && (
                <div className={`justify-content-center content`}
                >
                  {mainContent}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        user={user}
        onSignOut={() => {
          firebase.auth().signOut();
        }}
      />

      <div
        className={`nav-hint-toast ${showNavHint ? "show" : ""}`}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "20px",
          zIndex: 1000,
          transition: "opacity 0.3s",
          opacity: showNavHint ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        Sử dụng Phím mũi tên để Chuyển Slide
      </div>
    </div>
  );
};
export default Document;
