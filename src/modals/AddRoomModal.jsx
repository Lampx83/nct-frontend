import React, { useEffect, useState } from "react";
import {Form, Modal} from "react-bootstrap";
import "firebaseui/dist/firebaseui.css";
import config from "../config";
import { makeid } from "../utils/codelab";

const AddRoomModal = ({ show, handleClose, room, user }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optionsModal, setOptionsModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomMembers, setRoomMembers] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  useEffect(() => {
    if (show) {
      fetch(`${config.API_BASE_URL}/labs/${room.docID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const finalData = data?.map((room) => {
            if (room.userID === user.uid) {
              return room;
            }
          }).filter((room) => !!room);
          setRooms(finalData); // Assuming the API response is an array of rooms
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
          setLoading(false);
        });
    }
  }, [show]);
  const handleCreateRoom = () => {
    setCreatingRoom(true);
    const memberList = [];
    if (roomMembers) {
      const members = roomMembers.split("\n");
      members.forEach((member) => {
        const [studentCode, ...fullName] = member.replace(/\s+/g, " ").trim().split(" ");
        memberList.push({ studentCode, fullName: fullName.join(" ") });
      });
    }
    
    const roomData = {
      docID: room.docID,
      userID: user.uid,
      roomID: makeid(6),
      userEmail: user.email,
      config: room.config,
      roomName: roomName,
      members: memberList,
    };

    fetch(`${config.API_BASE_URL}/createRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        window.location.href = "/room/" + roomData?.roomID;
      })
      .catch((error) => {
        console.error("Error creating room:", error);
      })
      .finally(() => {
        setCreatingRoom(false);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Các phòng đã tạo:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border spinner-border rooms-spinner"
                role="status"
              ></div>
            </div>
          ) : (
            <table className="table table-borderless" id="table-rooms">
              <tbody id="tbody-rooms">
              {rooms?.map((room) => (
                <tr key={room?.roomID} id={room?.roomID}>
                  <td className="align-middle">{room?.roomName || room?.roomID}</td>
                  <td className="text-end align-middle">
                    <a
                      href={`/room/${room?.roomID}`}
                      className="text-primary"
                      target="_blank"
                    >
                      Vào phòng
                    </a>
                  </td>
                  <td className="text-end align-middle">
                    <a
                      href="#"
                      className="bi bi-three-dots-vertical link-dark"
                      data-bs-toggle="dropdown"
                    ></a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Xóa
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            id="add-room-button"
            onClick={() => {
              setOptionsModal(true);
              handleClose();
            }}
          >
            Tạo phòng mới
          </button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={optionsModal} onHide={() => setOptionsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thiết lập phòng học:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="room-name">
              <Form.Label column={true}>Tên phòng:</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên phòng" 
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="room-members">
              <Form.Label column={true}>Thành viên:</Form.Label>
              <Form.Control as={"textarea"} rows={10} placeholder="<MSV>    <Họ tên SV>" 
                value={roomMembers}
                onChange={(e) => setRoomMembers(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            id="add-room-button"
            onClick={handleCreateRoom}
            disabled={creatingRoom}
          >
            {creatingRoom ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : "Xác nhận"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRoomModal;
