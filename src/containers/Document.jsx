"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "material-icons/iconfont/material-icons.css";
import StepContent from "../components/codelab/StepContent";
import Header from "../components/codelab/Header";
import BookCover from "../components/codelab/BookCover";
import firebase from "firebase/compat/app";
import debounce from "../utils/debounce";
import app from "../firebase";
import "firebase/compat/database";
import {
  onDisconnect,
  ref,
  set,
  onValue,
  off,
  push,
  get,
} from "firebase/database";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Previewer } from "pagedjs";
import StepList from "../components/codelab/StepList";
import config from "../config";
import "@/css/toolbar.css";
import { useSearchParams } from "next/navigation";
import { Toaster } from "sonner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { useAutoLogout } from "../hooks/useAutoLogout";
import LoginModal from "../modals/LoginModal";
import DocError from "../components/codelab/DocError";
import { usePathname, useRouter } from "next/navigation";
import { useTabVisibility } from "@/hooks/useTabVisibility";
import AiTutorChat from "../components/codelab/AiTutorChat";
import html2pdf from "html2pdf.js";
import database from "../services/database";

const TOAST_TYPES = {
  RAISE_HAND: "RAISE_HAND",
  LOWER_HAND: "LOWER_HAND",
  ENTER_ROOM: "ENTER_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
};
// const firestore = getFirestore(app);
const Document = ({
  iframe,
  dataResponse,
  roomType,
  isRoomInPath,
  url,
  steps,
  contents,
  listChapter,
  chap,
}) => {
  const pathname = usePathname(); // Lấy path hiện tại (VD: "/room/bAmGhf")
  const searchParams = useSearchParams(); // Lấy query string (VD: "?display=doc")
  const router = useRouter();
  const isVisible = useTabVisibility();
  const update = searchParams.get("update");
  const [currentStep, setCurrentStep] = useState(0);
  const [showStepList, setShowStepList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [slideTitle, setSlideTitle] = useState(null);
  const iframeRef = useRef(null);
  const [orgConfig, setOrgConfig] = useState(
    room?.organization || {
      nameVi: "",
      nameEn: "",
      logoBase64: null,
      primaryColor: "#0061bb",
      secondaryColor: "#d66f41", // Default to orange color if not provided
    }
  );

  useEffect(() => {
    if (room?.organization) {
      setOrgConfig(room.organization);
    }
  }, [room?.organization?.nameVi, room?.organization?.nameEn, room?.organization?.logoBase64, room?.organization?.primaryColor, room?.organization?.secondaryColor]);

  // Memoize computed values to prevent unnecessary re-renders
  const isSyllabusInPath = useMemo(() => 
    typeof window !== "undefined"
      ? window.location.pathname.includes("syllabus")
      : false,
    [pathname]
  );
  
  const display = useMemo(() => 
    searchParams.get("display") || "slide",
    [searchParams]
  );
  
  const isTeacher = useMemo(() => 
    room?.userID === user?.uid,
    [room?.userID, user?.uid]
  );

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const previousUsersRef = useRef({});
  const [raisedHands, setRaisedHands] = useState({});
  const previousHandsRef = useRef({});
  const [showLogin, setShowLogin] = useState(false);
  const [docError, setDocError] = useState(null);
  const isListenerAddedRef = useRef(false);
  const [isRaised, setIsRaised] = useState(false);
  useAutoLogout(user, room);
  const [sidebar, setSidebar] = useState(false);
  const [tabEventQueue, setTabEventQueue] = useState([]);
  // const [tabEventToast, setTabEventToast] = useState(null);
  const toastTimeoutRef = useRef(null);
  const onDocClick = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("display", "doc");
    router?.replace(`${pathname}?${queryParams.toString()}`);
  }, [pathname, searchParams.toString(), router]);

  const onSlideClick = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams.toString()); // Chuyển thành đối tượng có thể chỉnh sửa
    queryParams.set("display", "slide"); // Ghi đè giá trị của display
    router?.replace(`${pathname}?${queryParams.toString()}`); // Cập nhật URL
  }, [router, pathname, searchParams.toString()]);
  const onBookClick = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams.toString()); // Chuyển thành đối tượng có thể chỉnh sửa
    queryParams.set("display", "book"); // Ghi đè giá trị của display
    router?.replace(`${pathname}?${queryParams.toString()}`); // Cập nhật URL
  }, [pathname, searchParams.toString(), router]);

  async function saveScrollLog(room, user) {
    try {
      fetch(`${config.API_LOG_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logType: "scrollPosition",
          roomID: room?.roomID,
          userName: user.displayName,
          userID: user.uid,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Error saving log to Firebase:", err);
    }
  }

  const handleStepClick = useCallback(
    (index) => {
      if (index < 0 || index >= steps.length) {
        console.error("Invalid step index:", index);
        return;
      }

      setCurrentStep(index);
      setShowStepList(false);

      window.location.hash = `#${index}`;

      if (room?.roomID && user?.uid) {
        try {
          const db = database;
          let link = chap ? `/chap${chap}` : "";
          set(
            ref(
              db,
              `/labs/${room.docID?.replace(/\./g, "")}/${room?.roomID
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
    [chap, user, room]
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
          router.replace(`/doc/${dataResponse.docID}`);
          return;
        }
        labConfig = dataResponse.config;
        dataResponse.teacher = dataResponse.userID === user.uid;

        const db = database;
        let link = chap ? `/chap${chap}` : "";
        const refUsers = ref(
          db,
          `/labs/${dataResponse.docID?.replace(/\./g, "")}/${dataResponse?.roomID
          }${link}/users/${user.uid}`
        );

        await onDisconnect(refUsers).set({});
        const handleOnDisconnect = async () => {
          try {
            // Make the API call when disconnecting
            fetch(`${config.API_LOG_URL}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                logType: "leaveRoom",
                roomID: dataResponse?.roomID,
                timestamp: new Date().toISOString(), // Use ISO timestamp for consistency
                userName: user.displayName,
                userID: user.uid,

                log: "Thoát trình duyệt",
              }),
            });
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

        // Always register user in Firebase when entering room
        const userRef = ref(
          db,
          `/labs/${dataResponse.docID?.replace(/\./g, "")}/${dataResponse?.roomID
          }${link}/users/${user.uid}`
        );

        await set(userRef, {
          step: hashIndex,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });

        const handleChapChange = async () => {
          if (isRoomInPath && room && user) {
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
        // queryParams.set("update", "false");

        // router.replace(`${location.pathname}?${queryParams.toString()}`);
      }
    } catch (error) {
      console.error("Error fetching doc:", error);
      setDocError("An error occurred while loading the document.");
      setLoading(false);
    }
  };
  // Memoize tab visibility logging to prevent excessive Firebase calls
  // const logTabVisibility = useCallback(async (visible) => {
  //   if (!room?.roomID || !user?.uid) return;
  //  
  //   const logRef = doc(firestore, `rooms/${room.roomID}/monitor`, user.uid);
  //   const logEntry = {
  //     displayName: user.displayName,
  //     timestamp: new Date().toISOString(),
  //     status: visible ? "active" : "inactive",
  //   };
  //  
  //   try {
  //     await updateDoc(logRef, {
  //       events: arrayUnion(logEntry),
  //       lastUpdate: serverTimestamp(),
  //     });
  //   } catch (error) {
  //     console.log("Error updating log, trying to create new:", error);
  //     try {
  //       await setDoc(logRef, {
  //         displayName: user.displayName,
  //         events: [logEntry],
  //         lastUpdate: serverTimestamp(),
  //       });
  //       console.log("Created new log successfully");
  //     } catch (error) {
  //       console.error("Error creating new log:", error);
  //     }
  //   }
  // }, [room?.roomID, user?.uid, user?.displayName]);

  // Debounce tab visibility changes to prevent rapid Firebase calls
  // const debouncedLogTabVisibility = useMemo(
  //   () => debounce(logTabVisibility, 1000),
  //   [logTabVisibility]
  // );

  // useEffect(() => {
  //   if (room?.roomID && user?.uid) {
  //     debouncedLogTabVisibility(isVisible);
  //   }
  // }, [isVisible, room?.roomID, user?.uid, debouncedLogTabVisibility]);
  // const isInitialLoadRef = useRef(true);
  //
  // useEffect(() => {
  //   if (!room?.roomID || !user?.uid) return;
  //
  //   const monitorCol = collection(firestore, `rooms/${room.roomID}/monitor`);
  //   const unsub = onSnapshot(monitorCol, (snapshot) => {
  //     // Skip processing on initial load
  //     if (isInitialLoadRef.current) {
  //       isInitialLoadRef.current = false;
  //       return;
  //     }
  //
  //     // snapshot.docChanges().forEach((change) => {
  //     //   if (change.type === "modified" || change.type === "added") {
  //     //     const data = change.doc.data();
  //     //     const lastEvent = data.events?.at(-1);
  //     //     if (lastEvent && change.doc.id !== user.uid) {
  //     //       setTabEventQueue((prev) => [
  //     //         ...prev,
  //     //         {
  //     //           name: data.displayName || change.doc.id,
  //     //           status: lastEvent.status,
  //     //         },
  //     //       ]);
  //     //     }
  //     //   }
  //     // });
  //   });
  //
  //   return () => {
  //     unsub();
  //     // isInitialLoadRef.current = true; // Reset the ref when component unmounts
  //   };
  // }, [room?.roomID, user?.uid]);
  // useEffect(() => {
  //   if (!tabEventToast && tabEventQueue.length > 0) {
  //     // Lấy toast đầu tiên trong queue ra hiển thị
  //     setTabEventToast(tabEventQueue[0]);
  //     setTabEventQueue((prev) => prev.slice(1));
  //   }
  // }, [tabEventToast, tabEventQueue]);
  //
  // // Tách riêng effect để xử lý timeout
  // useEffect(() => {
  //   if (tabEventToast) {
  //     // Clear any existing timeout
  //     if (toastTimeoutRef.current) {
  //       clearTimeout(toastTimeoutRef.current);
  //     }
  //
  //     // Set new timeout
  //     toastTimeoutRef.current = setTimeout(() => {
  //       setTabEventToast(null);
  //     }, 3000);
  //   }
  //   return () => {
  //     if (toastTimeoutRef.current) {
  //       clearTimeout(toastTimeoutRef.current);
  //     }
  //   };
  // }, [tabEventToast]);

  // Memoize scroll handler to prevent recreation on every render
  const handleScroll = useCallback(() => {
    if (!room?.roomID || !user) return;
    
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollTop + windowHeight >= documentHeight - 1) {
      try {
        saveScrollLog(room, user);
      } catch (error) {
        console.error("Error logging scroll event: ", error);
      }
    }
  }, [room?.roomID, user?.uid]);

  // Debounce the scroll handler
  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 300),
    [handleScroll]
  );

  useEffect(() => {
    if (room?.roomID && user) {
      window.addEventListener("scroll", debouncedHandleScroll);
      return () => {
        window.removeEventListener("scroll", debouncedHandleScroll);
      };
    }
  }, [room?.roomID, user?.uid, debouncedHandleScroll]);
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
  // Memoize CSS colors to prevent unnecessary recalculations
  const cssColors = useMemo(() => ({
    "--primary-color": orgConfig.primaryColor || "#0061bb",
    "--second-color": orgConfig.secondaryColor || "#d66f41"
  }), [orgConfig.primaryColor, orgConfig.secondaryColor]);

  // Update CSS colors when they change
  useEffect(() => {
    for (const [key, value] of Object.entries(cssColors)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [cssColors]);

  // Handle CSS and book preview loading
  useEffect(() => {
    if (loading) return;

    if (display === "book") {
      const paged = new Previewer();
      const DOMContent = document.querySelector(".main-content");
      if (DOMContent) {
        paged.preview(DOMContent, ["../css/book.css"], document.body)
          .catch(error => console.error("Error loading book preview:", error));
      }
    } else {
      const cssFile = room?.roomType === "Phòng thi" ? "test.css" : `${display}.css`;
      const existingLink = document.getElementById("dynamic-css");
      
      // Only update if CSS file changed
      if (!existingLink || existingLink.href !== `/css/${cssFile}`) {
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
        
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = `/css/${cssFile}`;
        link.id = "dynamic-css";
        document.head.appendChild(link);
      }
    }
  }, [loading, display, room?.roomType]);


  // thông báo raiseHand và rời/vào phòng
  // useEffect(() => {
  //   if (room?.roomID && user) {
  //     const db = database;
  //     const usersRef = ref(
  //       db,
  //       `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}/users`
  //     );
  //
  //
  //     const unsubscribe = onValue(usersRef, (snapshot) => {
  //       const data = snapshot.val();
  //
  //       if (data) {
  //         // Get current raised hands
  //         const currentHands = Object.entries(data)
  //           .filter(([uid, userData]) => userData.isRaise)
  //           .reduce((acc, [uid, userData]) => {
  //             acc[uid] = userData;
  //             return acc;
  //           }, {});
  //
  //         // Check for new users entering the room
  //         Object.entries(data).forEach(([uid, userData]) => {
  //           if (
  //             uid !== user.uid &&
  //             !previousUsersRef.current[uid] &&
  //             userData.timestamp > Date.now() - 5000 // Increased to 5 seconds for better detection
  //           ) {
  //             const userName = userData.name || "Someone";
  //             console.log(`New user detected: ${userName} (${uid})`);
  //             setUserEnterMessage(`${userName} đã vào phòng`);
  //             setShowUserEnterToast(true);
  //
  //             // Auto hide toast after 3 seconds
  //             setTimeout(() => {
  //               setShowUserEnterToast(false);
  //             }, 3000);
  //           }
  //         });
  //
  //         // Update previous users ref
  //         previousUsersRef.current = data;
  //
  //         // Only process notifications if we have previous state
  //         // This prevents notifications on initial load
  //         if (Object.keys(previousHandsRef.current).length > 0) {
  //           // Check for new raised hands
  //           Object.entries(currentHands).forEach(([uid, userData]) => {
  //             if (
  //               uid !== user.uid &&
  //               (!previousHandsRef.current[uid] ||
  //                 !previousHandsRef.current[uid].isRaise) &&
  //               userData.timestamp > Date.now() - 2000 // Only show if raised within last 2 seconds
  //             ) {
  //               setToastMessage(`${userData.name} raised their hand!`);
  //               setShowToast(true);
  //             }
  //           });
  //
  //           // Check for lowered hands
  //           Object.entries(previousHandsRef.current).forEach(
  //             ([uid, userData]) => {
  //               if (
  //                 uid !== user.uid &&
  //                 userData.isRaise &&
  //                 (!currentHands[uid] || !currentHands[uid].isRaise) &&
  //                 data[uid]?.timestamp > Date.now() - 2000 // Only show if lowered within last 2 seconds
  //               ) {
  //                 const userName =
  //                   userData.name || data[uid]?.name || "Someone";
  //                 setToastMessage(`${userName} lowered their hand`);
  //                 setShowToast(true);
  //               }
  //             }
  //           );
  //         }
  //
  //         // Update the previous state reference
  //         previousHandsRef.current = currentHands;
  //         // Update the state
  //         setRaisedHands(currentHands);
  //       }
  //     });
  //
  //     return () => {
  //       off(usersRef);
  //     };
  //   }
  // }, [room?.roomID, room?.docID, user?.uid]);

  useEffect(() => {
    //Kiểm tra đăng nhập hay chưa
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

  const mainContentRef = useRef();

  let mainContent;
  let mainContentDoc;
  if (display != null && (display === "book" || display === "doc")) {
    //Hiển thị toàn bộ nội dung
    mainContent = contents.map((content, index) => {
      return (
        <div
          className="container"
          style={index === 0 ? { marginTop: "0" } : {}}
        >
          <StepContent
            room={room}
            orgConfig={orgConfig}
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
    mainContentDoc = (
      <div ref={mainContentRef}
        className={`justify-content-center content`}
      >
        {contents.map((content, index) => (
          <div
            className="container"
            key={index}
            style={index === 0 ? { marginTop: "0" } : {}}
          >
            <StepContent
              room={room}
              orgConfig={orgConfig}
              steps={steps}
              step={steps[index]}
              content={content}
              currentStep={index}
              display="doc"
              user={user}
            />
          </div>
        ))}
      </div>
    );

    mainContent = (
      <StepContent
        isRoomInPath={isRoomInPath}
        chap={chap}
        room={room}
        steps={steps}
        step={steps[currentStep]}
        content={contents[currentStep]}
        currentStep={currentStep}
        display={display}
        user={user}
        orgConfig={orgConfig}
      />
    );
  }

  const handleExportPdf = useCallback(() => {
    if (display === "doc" && mainContentRef.current) {
      console.log("Exporting PDF...");
      console.log("Main content ref:", mainContentRef.current);
      setIsExportingPdf(true); // Bắt đầu hiển thị spinner

      // Hàm chuyển đổi ảnh sang base64 để tránh CORS
      const convertImagesToBase64 = async () => {
        const images = mainContentRef.current.querySelectorAll("img");
        console.log("Tìm thấy", images.length, "ảnh");

        if (images.length === 0) {
          console.log("Không có ảnh nào, bỏ qua bước chuyển đổi");
          return;
        }

        const promises = Array.from(images).map(async (img, index) => {
          console.log(`Xử lý ảnh ${index + 1}:`, img.src);
          return new Promise((resolve) => {
            if (img.complete && img.naturalHeight !== 0) {
              console.log(`Ảnh ${index + 1} đã load xong, kích thước:`, img.naturalWidth, 'x', img.naturalHeight);
              // Ảnh đã load xong, chuyển sang base64
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;

              try {
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                console.log(`Ảnh ${index + 1} chuyển sang base64 thành công`);
                img.src = dataURL;
                resolve();
              } catch (error) {
                console.warn(`Không thể chuyển ảnh ${index + 1} sang base64:`, error);
                console.warn('Ảnh src:', img.src);
                resolve();
              }
            } else {
              console.log(`Ảnh ${index + 1} chưa load xong, đợi...`);
              // Ảnh chưa load xong, đợi load
              img.onload = () => {
                console.log(`Ảnh ${index + 1} load xong, kích thước:`, img.naturalWidth, 'x', img.naturalHeight);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                try {
                  ctx.drawImage(img, 0, 0);
                  const dataURL = canvas.toDataURL('image/png');
                  console.log(`Ảnh ${index + 1} chuyển sang base64 thành công`);
                  img.src = dataURL;
                  resolve();
                } catch (error) {
                  console.warn(`Không thể chuyển ảnh ${index + 1} sang base64:`, error);
                  console.warn('Ảnh src:', img.src);
                  resolve();
                }
              };
              img.onerror = () => {
                console.warn(`Lỗi load ảnh ${index + 1}:`, img.src);
                resolve();
              };
            }
          });
        });

        console.log("Đợi tất cả ảnh xử lý xong...");
        await Promise.all(promises);
        console.log("Tất cả ảnh đã xử lý xong");
      };

      // Thực hiện xuất PDF
      convertImagesToBase64().then(() => {
        console.log("Bắt đầu tạo PDF...");
        html2pdf()
          .set({
            margin: 0.5,
            filename: `document.pdf`,
            html2canvas: {
              scale: 2,
              useCORS: true,
              allowTaint: false,
              foreignObjectRendering: true
            },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          })
          .from(mainContentRef.current)
          .save()
          .then(() => {
            console.log("PDF xuất thành công!");
            setIsExportingPdf(false); // Ẩn spinner khi hoàn thành
          })
          .catch((error) => {
            console.error('Lỗi xuất PDF:', error);
            console.error('Error details:', {
              message: error.message,
              stack: error.stack,
              name: error.name
            });
            setIsExportingPdf(false); // Ẩn spinner khi có lỗi
          });
      }).catch((error) => {
        console.error('Lỗi chuyển đổi ảnh:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        setIsExportingPdf(false); // Ẩn spinner khi có lỗi
      });
    } else {
      console.log("Không thể xuất PDF:", {
        display,
        hasMainContentRef: !!mainContentRef.current
      });
    }
  }, [display]);

  const handlePrintPdf = useCallback(() => {
    if (mainContentRef.current) {
      // Thêm CSS để in khổ ngang và lề tối thiểu
      const style = document.createElement('style');
      style.innerHTML = `@media print { @page { size: landscape; margin: 0; } body { margin: 0 !important; } }`;
      document.head.appendChild(style);

      const printContents = mainContentRef.current.innerHTML;
      // const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      // document.body.innerHTML = originalContents;
      document.head.removeChild(style);
      window.location.reload(); // reload lại để khôi phục event listener/react state
    }
  }, [display]);
  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      alert("Không thể in nội dung iframe!");
      return;
    }

    // Kiểm tra nếu iframe đã tải xong
    const iframeDoc = iframe.contentWindow.document;
    if (iframeDoc.readyState === "complete") {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      // Nếu chưa xong, đợi sự kiện load
      const onLoad = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        iframe.removeEventListener("load", onLoad);
      };

      iframe.addEventListener("load", onLoad);

      // Fallback timeout nếu "load" không kích hoạt sau 5s
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        iframe.removeEventListener("load", onLoad);
      }, 5000);
    }
  };

  const handleSettingModal = useCallback((value) => {
    setShowSettingsModal(value);
  }, []);

  const [showNavHint, setShowNavHint] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [showUserEnterToast, setShowUserEnterToast] = useState(false);
  const [userEnterMessage, setUserEnterMessage] = useState("");

  // Close AI chat when aiTutorEnabled is turned off
  useEffect(() => {
    if (room?.aiTutorEnabled === false && aiChatOpen) {
      setAiChatOpen(false);
    }
  }, [room?.aiTutorEnabled, aiChatOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (currentStep > 0) {
            handleStepClick(currentStep - 1);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (currentStep < steps.length - 1) {
            handleStepClick(currentStep + 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep, steps.length, handleStepClick]);


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
      const db = database;
      const titleRef = ref(
        db,
        `/labs/${room?.docID?.replace(/\./g, "")}/${room.roomID}/title`
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

  // useEffect(() => {
  //   if (room?.roomID) {
  //     const roomRef = doc(firestore, "rooms", room.roomID);
  //
  //     const unsubscribe = onSnapshot(roomRef, (doc) => {
  //       if (doc.exists()) {
  //         const roomData = doc.data();
  //         console.log("Room data updated:", roomData);
  //         // Update the room state with new data
  //         setRoom(prevRoom => ({
  //           ...prevRoom,
  //           ...roomData
  //         }));
  //       }
  //     });
  //
  //     return () => unsubscribe();
  //   }
  // }, [room?.roomID]);

  const sendNotification = async (type, userName) => {
    if (!room?.roomID || !user) return;

    const db = database;
    const notificationsRef = ref(
      db,
      `/labs/${room.docID?.replace(/\./g, "")}/${room.roomID}/notifications`
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
    const db = database;
    const userRef = ref(
      db,
      `/labs/${room.docID?.replace(/\./g, "")}/${room.roomID}${chap ? `/chap${chap}` : ""
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
      fetch(`${config.API_LOG_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logType: "raiseHand",
          roomID: room.roomID,
          userID: user.uid,
          userName: user.displayName,
          timestamp: new Date().toISOString(), // ISO timestamp format

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

    const db = database;
    const forceLogoutRef = ref(
      db,
      `/labs/${room.docID?.replace(/\./g, "")}/${room.roomID}/forceLogout`
    );

    const unsubscribe = onValue(forceLogoutRef, (snapshot) => {
      const data = snapshot.val();
      // Check if data exists and has users array
      if (
        data?.users &&
        Array.isArray(data.users) &&
        data.users.includes(user.uid)
      ) {
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
    <div>
      <Toaster position={"top-right"} richColors className={"me-4"} />
      {(display.includes("slide") || display.includes("doc")) &&
        !isSyllabusInPath && !iframe && (
          <Header
            roomType={roomType}
            isRoomInPath={isRoomInPath}
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
            docError={docError}
            handleShowSideBar={() => setSidebar((prev) => !prev)}
            isRaised={isRaised}
            toggleRaiseHand={toggleRaiseHand}
            orgConfig={orgConfig}
            setOrgConfig={setOrgConfig}
          />
        )}

      <div className="fluid-container overflow-hidden2" style={{ flex: 1, transition: "margin-right 0.3s" }}>
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
                height: "calc(100vh - 82px)",
                overflowY: "auto",
                overflowX: "hidden",
                marginTop: 82,
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
              transition: "margin-right 0.3s",
              marginRight: aiChatOpen ? 550 : 0,
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
                <>
                  <div className={`justify-content-center content`} >
                    {mainContent}
                  </div>
                  <div style={{ display: 'none' }}>
                    {mainContentDoc}
                  </div>
                  <iframe
                    ref={iframeRef}
                    src={`https://fit.neu.edu.vn/room/${room?.roomID}/iframe?display=doc`}
                    // 
                    // src={`http:///room/${room?.roomID}/iframe?display=doc`}
                    style={{ width: "100%", height: "600px", border: "1px solid #ccc", display: 'none' }}
                    title="Printable Iframe"
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
      {/* AI Tutor Chat Sidebar (right) */}
      {user && room?.aiTutorEnabled !== false && (
        <AiTutorChat
          room={room}
          user={user}
          isOpen={aiChatOpen}
          onToggle={() => setAiChatOpen((v) => !v)}
          currentStep={currentStep}
          steps={steps}
          content={contents[currentStep]}
          dataResponse={dataResponse}
        />
      )}
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

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      {/* {tabEventToast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background:
              tabEventToast.status === "inactive" ? "#f44336" : "#4caf50",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            zIndex: 9999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontWeight: "bold",
          }}
        >
          {tabEventToast.name}{" "}
          {tabEventToast.status === "inactive"
            ? "đã rời tab"
            : "đã quay lại tab"}
        </div>
      )} */}
      {isExportingPdf && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <div className="text-primary fw-bold">Đang xuất PDF...</div>
          </div>
        </div>
      )}

      {/* User Enter Toast */}
      {showUserEnterToast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#4caf50",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            zIndex: 9999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            animation: "slideInRight 0.3s ease-out",
          }}
        >
          {userEnterMessage}
        </div>
      )}
    </div>
  );
};
export default Document;