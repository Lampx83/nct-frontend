"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { RxUpdate } from "react-icons/rx";
import { IoDocumentTextOutline, IoSettings } from "react-icons/io5";
import { RiSlideshow2Line } from "react-icons/ri";
import { HiQrCode, HiOutlineUserGroup } from "react-icons/hi2";
import RaiseHandButton from "./RaiseHandButton";
import ChatRoom from "./ChatRoom";
import SettingsModal from "../../modals/SettingsModal";
import { ArrowCircleUpRounded, FilePresentRounded, Download, CodeOutlined } from "@mui/icons-material";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import UploadedFilesModal from "./UploadedFilesModal";
import AttendeesModal from "./AttendeesModal";
import config from "../../config";

const DocControls = ({
  handleDownloadWordFile,
  isRaised,
  toggleRaiseHand,
  room,
  chap,
  uploadedFiles,
  users,
  setUsers,
  user,
  display,
  teacher,
  handlerUpdate,
  handleDocClick,
  handleSlideClick,
  handleQrCodeClick,
  handleSettingModal,
  showSettingsModal,
  template,
  handleTemplate,
  onSaveSettings,
  isRoomInPath,
  loadRooms,
  handleRedirectGoogle,
  slideTitle,
  onTitleChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = () => {
    router.push(`${pathname}/onlineJudge`);
  };

  const handleNavigateStudent = () => {
    router.push(`${pathname}/editor`);
  };

  const [roomUsers, setRoomUsers] = useState([]);
  const [showFileList, setShowFileList] = useState(false);

  useEffect(() => {
    if (room?.roomID) {
      const db = getDatabase();
      const link = chap ? `/chap${chap}` : "";
      const userPath = `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${link}/users`;
      const userRef = ref(db, userPath);

      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setRoomUsers(data ? Object.entries(data).map(([uid, info]) => ({ uid, ...info })) : []);
      });

      return () => unsubscribe();
    }
  }, [room, chap]);

  return (
    <>
      {isRoomInPath && (
        <button
          className={`btn btn-primary ${isRaised ? "btn-danger" : "btn-outline-light"} ms-2 hide-expand`}
          onClick={toggleRaiseHand}
          disabled={!room?.roomID}
        >
          <RaiseHandButton isRaised={isRaised} raisedHandsCount={roomUsers.filter(user => user.isRaise)?.length || 0} />
        </button>
      )}

      {teacher === user?.uid ? (
        <button className="btn btn-primary ms-2 me-2" onClick={handleNavigate}>
          <CodeOutlined size={24} />
        </button>
      ) : (
        <button className="btn btn-primary ms-2 me-2" onClick={handleNavigateStudent}>
          <CodeOutlined size={24} />
        </button>
      )}

      {room?.roomID && user && <ChatRoom chap={chap} room={room} user={user} users={users} />}
      {teacher === user?.uid && (
        <button className="btn btn-primary ms-2 me-2 hide-expand">
          <RxUpdate size={24} onClick={handlerUpdate} />
        </button>
      )}
      {teacher === user?.uid && (
        <>
          <button className="btn btn-primary ms-2 me-2" onClick={() => setShowFileList(true)}>
            <FilePresentRounded size={24} />
          </button>
          <UploadedFilesModal show={showFileList} onClose={() => setShowFileList(false)} uploadedFiles={uploadedFiles} />
        </>
      )}

      {teacher === user?.uid && <AttendeesModal roomID={room?.roomID} roomUsers={roomUsers} />}

      <ButtonGroup className="ms-2 me-2">
        <Button variant="outline-primary" className={display === "doc" ? "active" : ""} onClick={handleDocClick}>
          <IoDocumentTextOutline size={24} />
        </Button>
        <Button variant="outline-primary" className={display === "slide" ? "active" : ""} onClick={handleSlideClick}>
          <RiSlideshow2Line size={24} />
        </Button>
      </ButtonGroup>

      <Button className="btn btn-primary ms-2 me-2 hide-expand" onClick={handleQrCodeClick}>
        <HiQrCode size={24} />
      </Button>

      {teacher === user?.uid && (
        room?.docID?.length !== 44 ? (
          <Button className="btn btn-primary ms-2 me-2 hide-expand" onClick={handleDownloadWordFile}>
            <Download size={24} />
          </Button>
        ) : (
          <Button className="btn btn-primary ms-2 me-2 hide-expand" onClick={handleRedirectGoogle}>
            <ArrowCircleUpRounded size={24} />
          </Button>
        )
      )}

      { teacher === user?.uid && (
        <Button className="btn btn-primary ms-2 me-2" onClick={() => handleSettingModal(true)}>
          <IoSettings size={24} />
        </Button>
      )}

      <SettingsModal
        show={showSettingsModal}
        handleClose={() => handleSettingModal(false)}
        template={template}
        handleTemplate={handleTemplate}
        onSaveSettings={onSaveSettings}
        roomID={room?.roomID}
        slideTitle={slideTitle}
        onTitleChange={onTitleChange}
      />
    </>
  );
};

export default DocControls;
