import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import { Button, Modal } from "react-bootstrap";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "../firebase";

const LoginModal = ({ show, handleClose, user, onSignOut }) => {
  useEffect(() => {
    if (show && !user) {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(getAuth(app));
      ui.start("#firebaseui-auth-container", {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            if (authResult.user) {
              console.log(authResult.user);
            }
          },
          uiShown: function () {
            // This is what should happen when the form is fully loaded. In this example, I hide the loader element.
          },
        },
        signInFlow: "popup",
        signInOptions: [
          "microsoft.com",
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
          // {
          //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, // Cho phép đăng nhập/đăng ký bằng email
          //   requireDisplayName: true, // Yêu cầu người dùng nhập tên hiển thị khi đăng ký
          // },
        ],
      });
    }
  }, [show]);
  return (
    <>
      <style>
        {`
                    .btn {
                        height: 50px; /* Set the height to match other buttons */
                        display: flex;
                        align-items: center; /* Center-align the text or content */
                        justify-content: center; /* Center-align horizontally */
                        font-size: 16px; /* Ensure the font size matches */
                        padding: 0 12px; /* Adjust padding for content */
                    }
                `}
      </style>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? <>Tài khoản</> : <>Đăng nhập</>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!user ? (
            <div id="firebaseui-auth-container" className="guest"></div>
          ) : (
            <div id="user-signed-in" className="d-flex user">
              <div className="flex-grow-1 d-flex justify-content-center">
                <img
                  src={user.photoURL}
                  width="110px"
                  height="110px"
                  className="avatar rounded-circle"
                  alt="user"
                />
              </div>
              <div className="flex-grow-1  d-flex flex-column align-self-center me-4">
                <div id="name" className="align-self-center text-primary fs-5">
                  {user.displayName}
                </div>
                <div id="email" className="align-self-center ">
                  {user.email}
                </div>
                <div id="phone">{user.phoneNumber}</div>
              </div>
            </div>
          )}
        </Modal.Body>
        {user && (
          <Modal.Footer>
            <Button variant="warning" onClick={onSignOut}>
              Đăng xuất
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
