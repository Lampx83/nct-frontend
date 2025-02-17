import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "firebaseui/dist/firebaseui.css";
import config from "../config";

const PrintSettingModal = ({ show, handleClose }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [show]);

  return (
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
              {rooms.map((room) => (
                <tr key={room.roomID} id={room.roomID}>
                  <td className="align-middle">{room.roomID}</td>
                  <td className="text-end align-middle">
                    <a
                      href={`/room/${room.roomID}`}
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
        <button type="submit" className="btn btn-primary" id="add-room-button">
          Tạo phòng mới
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintSettingModal;
