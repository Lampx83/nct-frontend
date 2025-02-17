import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import config from "../config";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "../firebase.js";
import { useRouter } from 'next/navigation';

const QRModal = ({ show, handleClose, room }) => {
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const isRoomInPath = window.location.pathname.includes("room");
  const router = useRouter();
  const [onlineSize, setOnlineSize] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const chap = searchParams.get("chap");

  // Reference to the Firebase onValue listener
  const onValueListenerRef = useRef(null);

  useEffect(() => {
    if (show && isRoomInPath && room != null) {
      let currentURL = window.location.href;
      fetch(`${config.API_BASE_URL}/qrcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: currentURL }),
      })
        .then((response) => response.text())
        .then((data) => setQrCodeImage(data))
        .catch((error) => console.error("Error fetching QR code:", error));
      const db = getDatabase(app);
      let link = chap ? `/chap${chap}` : "";
      const usersRef = ref(
        db,
        `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${link}/users`
      );

      // Set up the onValue listener and save the reference
      onValueListenerRef.current = onValue(usersRef, (snapshot) => {
        let data = snapshot.val();
        let onlineSize = data ? Object.keys(data).length : 0; // Assuming data is an object
        setOnlineSize(onlineSize);
      });
    }

    // Cleanup function
    return () => {
      // Unsubscribe from the Firebase onValue listener when the component is unmounted or the modal is closed
      if (onValueListenerRef.current) {
        onValueListenerRef.current(); // This calls the Firebase listener function to unsubscribe
        onValueListenerRef.current = null; // Clear the reference
      }
    };
  }, [show, room]);

  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Vào phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center d-flex justify-content-center align-items-center">
        {qrCodeImage ? (
          <div className="qrcode-container">
            <div className="online-user" style={{ fontSize: "4rem" }}>
              {onlineSize}
            </div>
            <div className="qrcode-wrap">
              <img
                src={`data:image/png;base64,${qrCodeImage}`}
                alt="QR Code"
                className="qrcode"
                style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
              />
            </div>
            <div className="qr-link">{window.location.href}</div>
          </div>
        ) : (
          <div className="qr-link">Loading ...</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default QRModal;
