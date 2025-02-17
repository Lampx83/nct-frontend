// Header.js
import React, { useEffect, useState, useRef, memo } from "react";
import { getFirestore, doc, updateDoc, or } from "firebase/firestore";
import app from "../../firebase";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import {
  getDatabase,
  ref as dbRef,
  push as dbPush,
  set,
  ref,
  onValue,
  get,
  off,
} from "firebase/database";
import LoginModal from "../../modals/LoginModal";
import AddRoomModal from "../../modals/AddRoomModal";
import QRModal from "../../modals/QRModal";
import UserMenu from "./UserMenu";
import { Button } from "react-bootstrap";
import { GrMenu } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { Toast } from "react-bootstrap";
import config from "../../config";
import DocControls from "./DocControls";
import { useRouter } from "next/navigation";
import { DownloadDoneOutlined } from "@mui/icons-material";
const Header = ({
  showSettingsModal,
  handleSettingModal,
  template,
  steps,
  contents,
  listChapter,
  currentStep,
  handleTemplate,
  handleStepClick,
  showStepList,
  onTitleClick,
  room,
  user,
  onUserLogin,
  onDocClick,
  onSlideClick,
  onBookClick,
  chap,
  slideTitle,
  display,
  docError,
  handleShowSideBar = () => { },
}) => {
  // const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const isRoomInPath = window.location.pathname.includes("room");
  const [isRaised, setIsRaised] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const navbarRef = useRef(null);
  const TOAST_TYPES = {
    RAISE_HAND: "RAISE_HAND",
    LOWER_HAND: "LOWER_HAND",
    ENTER_ROOM: "ENTER_ROOM",
    LEAVE_ROOM: "LEAVE_ROOM",
  };

  useEffect(() => {
    if (room) {
      setTeacher(room?.userID);
    }
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        const navbar = document.getElementById("navbarNav");
        if (navbar?.classList?.contains("show")) {
          navbar?.classList?.remove("show");
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [room]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        onUserLogin(currentUser);
      } else {
        onUserLogin(null);
      }
      setLoadingLogin(false);
    });

    return () => unsubscribe();
  }, [onUserLogin]);

  const sendNotification = async (type, userName) => {
    if (!room?.roomID || !user) return;

    const db = getDatabase(app);
    const notificationsRef = dbRef(
      db,
      `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}/notifications`
    );

    await dbPush(notificationsRef, {
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
      `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}${chap ? `/chap${chap}` : ""
      }/users/${user.uid}`
    );
    const userPath = `/logs`;
    try {
      // Get current user data
      const currentData = (await get(userRef)).val() || {};

      const updateData = {
        ...currentData,
        isRaise: newRaisedState,
        name: user.displayName,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        photo: user.photoURL,
      };
      // const updateData2 = {
      //   logType: "raiseHand",
      //   ...currentData,
      //   isRaise: newRaisedState,
      //   name: user.displayName,
      //   timestamp: firebase.database.ServerValue.TIMESTAMP,
      //   photo: user.photoURL,
      // };
      await set(userRef, updateData);
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
          roomID: room?.roomID,
          userID: user.uid,
          userName: user.displayName,
          stepID: currentStep,
          status: newRaisedState ? "RAISED_HAND" : "LOWERED_HAND",
        }),
      });

      setIsRaised(newRaisedState);
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

  const handleQrCodeClick = () => {
    setShowQRModal(true);
  };

  const handleDocClick = () => {
    onDocClick();
  };

  const handleSlideClick = () => {
    onSlideClick();
  };
  const handleBookClick = () => {
    onBookClick();
  };
  const handleDownloadWordFile = async () => {
    try {
      const docID = room.docID.replace(/\./g, "");
      // Gửi request đến API để tải file
      const response = await fetch(
        `${config.API_BASE_URL}/download-word?docID=${docID}`,
        {
          method: "GET",
        }
      );

      // Kiểm tra nếu response trả về thành công
      if (!response.ok) {
        throw new Error("Failed to download file: " + response.statusText);
      }

      // Lấy dữ liệu file từ response
      const blob = await response.blob();

      // Tạo một URL từ Blob để người dùng có thể tải file
      const url = window.URL.createObjectURL(blob);

      // Tạo một thẻ <a> ẩn để tải file
      const a = document.createElement("a");
      a.href = url;
      const nameFileDownload = docID.replace("anonymous", "");
      a.download = `${nameFileDownload}.docx`; // Đặt tên file tải về
      document.body.appendChild(a);
      a.click();

      // Hủy URL sau khi sử dụng
      window.URL.revokeObjectURL(url);

      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const handleRedirectGoogle = () => {
    const docID = room.docID.replace(/\./g, "");
    window.open(`https://docs.google.com/document/d/${docID}/edit`);
  };
  const [loadingLogin, setLoadingLogin] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const [showAddRoom, setShowAddRoom] = useState(false);
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const handleCloseAddRoom = () => {
    setShowAddRoom(false);
  };

  const handlerUpdate = async () => {
    console.log("Update");
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const url = `${origin}${pathname}?update=true`;

    try {
      // Gọi API cập nhật
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error("Update thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    } finally {
      // Sau khi cập nhật xong, xóa query parameter mà không tải lại trang
      router.replace(pathname);
    }
  };
  const handlerLogout = () => {
    if (room?.roomID) {
      const db = getDatabase(app);
      let link = chap ? `/chap${chap}` : "";
      const refUsers = ref(
        db,
        `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}${link}/users/${user.uid
        }`
      );
      set(refUsers, {});
    }
    const auth = getAuth(app);
    auth.signOut();
  };
  const loadRooms = () => {
    setShowAddRoom(true);
  };
  const handleSaveSettings = async (selectedTemplate) => {
    try {
      const db = getFirestore(app);
      if (!room?.roomID) {
        throw new Error("Document ID is missing or invalid.");
      }
      const sanitizedDocID = room?.roomID.replace(/\./g, "");
      const docRef = doc(db, "rooms", sanitizedDocID);
      await updateDoc(docRef, { template: selectedTemplate });
      handleSettingModal(false);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  useEffect(() => {
    if (!room?.roomID || !user) return;

    const db = getDatabase(app);
    const notificationsRef = dbRef(
      db,
      `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}/notifications`
    );

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const notification = snapshot.val();
      if (!notification) return;

      // Get the last notification
      const lastNotificationKey = Object.keys(notification).pop();
      const lastNotification = notification[lastNotificationKey];

      if (lastNotification.userName === user.displayName) return;

      let message = "";
      switch (lastNotification.type) {
        case TOAST_TYPES.RAISE_HAND:
          message = `${lastNotification.userName} raised their hand`;
          break;
        case TOAST_TYPES.LOWER_HAND:
          message = `${lastNotification.userName} lowered their hand`;
          break;
        case TOAST_TYPES.ENTER_ROOM:
          message = `${lastNotification.userName} entered the room`;
          break;
        case TOAST_TYPES.LEAVE_ROOM:
          message = `${lastNotification.userName} left the room`;
          break;
        default:
          return;
      }

      setToastMessage(message);
      setShowToast(true);
    });

    return () => unsubscribe();
  }, [room?.roomID, user]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  useEffect(() => {
    if (!room?.roomID || !user) return;

    const database = getDatabase(app);
    let link = chap ? `/chap${chap}` : "";
    const userPath = `/labs/${room?.docID.replace(/\./g, "")}/${room?.roomID
      }${link}/uploads`;
    const fileRef = dbRef(database, userPath);

    // Hiển thị trạng thái loading ban đầu
    setUploadedFiles(null);

    onValue(fileRef, (snapshot) => {
      const files = [];
      snapshot.forEach((childSnapshot) => {
        files.push(childSnapshot.val());
      });
      console.log(files);
      setUploadedFiles(files); // Cập nhật danh sách files
    });

    // Hủy listener khi component unmount
    return () => {
      off(fileRef);
    };
  }, [room?.roomID, user]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State để theo dõi trạng thái của menu


  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen); // Thay đổi trạng thái khi click vào hamburger
    handleShowSideBar(); // Gọi hàm của props để hiển thị sidebar
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-light">
        <div className="container-fluid">
          <div className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="d-flex">
              <Button onClick={handleHamburgerClick}>
                {isMenuOpen ? (
                  <GrClose size={24} />
                ) : (
                  <GrMenu size={24} />
                )}
              </Button>

              {listChapter === null && (
                <div
                  className={`ms-3 nav-link fw-bold chapter-select fs-2`}
                  onClick={onTitleClick}
                  style={{ cursor: "pointer" }}
                >
                  {slideTitle}
                </div>
              )}

              {listChapter?.length > 0 && (
                <div className="nav-center d-flex align-self-center">
                  {
                    <div className="chapter-select-wrap align-items-center">
                      <div className="dropdown">
                        {slideTitle && (
                          <>
                            <a
                              className="ms-3 nav-link fw-bold chapter-select dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              href="#"
                            >
                              {listChapter[chap - 1] || slideTitle || "NỘI DUNG"}
                            </a>
                            <ul className="dropdown-menu chapter-option">
                              {listChapter?.map((item, index) => (
                                <li key={index}>
                                  {" "}
                                  <Link
                                    className={`dropdown-item ${chap === index + 1 ? "highlighted" : ""
                                      }`}
                                    href={{
                                      pathname: window.location.pathname,
                                      query: {
                                        chap: index + 1,
                                      },
                                      hash: "#1"
                                    }}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  }
                </div>
              )}
              {/* <a href="#">
            <h3 className="ms-3" onClick={() => handleTitleClick()}>
              {slideTitle}
            </h3>
          </a> */}
            </div>
          </div>


          <div className="collapse navbar-collapse me-auto" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div className="d-flex justify-content-between p-2">
                <div className="d-flex">
                  {!docError ? (
                    <DocControls
                      handleDownloadWordFile={handleDownloadWordFile}
                      isRaised={isRaised}
                      toggleRaiseHand={toggleRaiseHand}
                      room={room}
                      chap={chap}
                      uploadedFiles={uploadedFiles}
                      users={users}
                      setUsers={setUsers}
                      user={user}
                      display={display}
                      teacher={teacher}
                      handlerUpdate={handlerUpdate}
                      handleDocClick={handleDocClick}
                      handleSlideClick={handleSlideClick}
                      handleBookClick={handleBookClick}
                      handleQrCodeClick={handleQrCodeClick}
                      handleSettingModal={handleSettingModal}
                      showSettingsModal={showSettingsModal}
                      template={template}
                      handleTemplate={handleTemplate}
                      onSaveSettings={handleSaveSettings}
                      isRoomInPath={isRoomInPath}
                      loadRooms={loadRooms}
                      handleRedirectGoogle={handleRedirectGoogle}
                    />
                  ) : null}

                  <div className="login ms-2 me-4 align-self-center">
                    {loadingLogin ? (
                      <div
                        id="login-spinner"
                        className="spinner-border text-light ms-3"
                        role="status"
                      />
                    ) : user ? (
                      <UserMenu teacher={teacher} user={user} onLogout={handlerLogout} />
                    ) : (
                      <Button variant="primary" onClick={handleShowLogin}>
                        Đăng nhập
                      </Button>
                    )}
                  </div>
                  {user && room && (
                    <AddRoomModal
                      show={user && showAddRoom}
                      user={user}
                      handleClose={handleCloseAddRoom}
                      room={room}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        show={!user && showLogin}
        handleClose={handleCloseLogin}
        user={user}
        onSignOut={() => {
          firebase.auth().signOut();
        }}
      />
      <QRModal
        room={room}
        show={showQRModal}
        handleClose={() => setShowQRModal(false)}
      />
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

// Memoize the component with a custom comparison function
export default memo(Header, (prevProps, nextProps) => {
  // Return true if we don't want to re-render
  return (
    prevProps.template === nextProps.template &&
    prevProps.currentStep === nextProps.currentStep &&
    prevProps.showSettingsModal === nextProps.showSettingsModal &&
    prevProps.stepsData === nextProps.stepsData &&
    prevProps.room === nextProps.room &&
    prevProps.user === nextProps.user &&
    prevProps.chap === nextProps.chap &&
    prevProps.slideTitle === nextProps.slideTitle &&
    prevProps.display === nextProps.display
  );
});
