// SettingsModal.jsx
import React, {useEffect, useState} from "react";
import { Modal, Button, Tabs, Tab, Form } from "react-bootstrap";
import { getDatabase, ref, set } from "firebase/database";
import {getFirestore, doc, updateDoc, getDoc} from "firebase/firestore";
import app from "../firebase";

const SettingsModal = ({
  show,
  handleClose,
  template,
  handleTemplate,
  onSaveSettings,
  roomID,
  slideTitle,
  onTitleChange,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(template);
  const [editedTitle, setEditedTitle] = useState(slideTitle);
  const [room, setRoom] = useState(null);
  const [roomMembers, setRoomMembers] = useState("");

  const getRoom = async () => {
    const firestore = getFirestore(app);
    const roomRef = doc(firestore, "rooms", roomID);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      setRoom(roomSnap.data());
      setRoomMembers(roomSnap.data()?.members?.map(member => `${member.studentCode}    ${member.fullName}`)?.join("\n") || "");
    } else {
      console.log("No such document!");
    }
  }
  
  useEffect(() => {
    if (show) {
      getRoom();
    }
  }, [show]);

  useEffect(() => {
    setRoomMembers(room?.members?.map(member => `${member.studentCode}    ${member.fullName}`)?.join("\n") || "");
  }, [room]);

  const handleSave = async () => {
    try {
      // Save template changes
      handleTemplate(selectedTemplate);
      await onSaveSettings(selectedTemplate);

      // Save title changes if modified
      if (editedTitle !== slideTitle) {
        const db = getDatabase(app);
        const titleRef = ref(db, `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}/title`);
        await set(titleRef, editedTitle);
        
        const firestore = getFirestore(app);
        const roomRef = doc(firestore, "rooms", room.roomID);
        await updateDoc(roomRef, {
          labName: editedTitle
        });
        onTitleChange(editedTitle);
      }
      
      // Save room members
      const memberStr = room?.members?.map(member => `${member.studentCode}    ${member.fullName}`)?.join("\n") || "";
      const memberList = [];
      if (roomMembers !== memberStr) {
        const members = roomMembers.split("\n");
        members.forEach((member) => {
          const [studentCode, ...fullName] = member.replace(/\s+/g, " ").trim().split(" ");
          memberList.push({ studentCode, fullName: fullName.join(" ") });
        });
        
        const firestore = getFirestore(app);
        const roomRef = doc(firestore, "rooms", room.roomID);
        await updateDoc(roomRef, {
          members: roomMembers ? memberList : []
        });
      }

      handleClose();
    } catch (error) {
      console.error("Error saving settings:", error);
      setEditedTitle(slideTitle);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="template" className="mb-3">
          <Tab eventKey="template" title="Template">
            <div className="d-grid gap-2">
              <Button
                variant={selectedTemplate === "NEU" ? "primary" : "outline-primary"}
                onClick={() => setSelectedTemplate("NEU")}
              >
                NEU
              </Button>
              <Button
                variant={selectedTemplate === "HUST" ? "primary" : "outline-primary"}
                onClick={() => setSelectedTemplate("HUST")}
              >
                HUST
              </Button>
              <Button
                variant={selectedTemplate === "YHN" ? "primary" : "outline-primary"}
                onClick={() => setSelectedTemplate("YHN")}
              >
                Y Hà Nội
              </Button>
            </div>
          </Tab>
          <Tab eventKey="title" title="Document Title">
            <Form.Group className="mb-3">
              <Form.Label>Document Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Enter document title"
              />
            </Form.Group>
          </Tab>
          <Tab title={"Danh sách thành viên"} eventKey={"members"}>
            <Form.Group className="mb-3" controlId="room-members">
              <Form.Label column={true}>Thành viên:</Form.Label>
              <Form.Control as={"textarea"} rows={10} placeholder="<Email>    <Họ tên SV>"
                            value={roomMembers}
                            onChange={(e) => setRoomMembers(e.target.value)}
              />
            </Form.Group>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
