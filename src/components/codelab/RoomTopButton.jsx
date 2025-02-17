import React, { useState, useEffect } from "react";
import $ from "jquery";
import firebase_legacy from "../../firebase_legacy.js";

function RoomTopButton({ docID, showReportModal, showWheelModal, showConfigModal }) {
  let t = "https://docs.google.com/document/d/" + docID;
  return (
    <div id="topButton">
      <div className="layout horizontal teacher b-them">
        <div className="btn-group teacher">
          <button
            type="button"
            className="btn btn-success dropdown-toggle dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="16"
              height="16"
              fill="#ffffff"
            >
              <path d="M0,0h142.4v142.4H0V0z" />
              <path d="M187.7,0h323.9v142.4H187.7V0z" />
              <path d="M0,184.8h142.4v142.4H0V184.8z" />
              <path d="M187.7,184.8h323.9v142.4H187.7V184.8z" />
              <path d="M0,369.6h142.4V512H0V369.6z" />
              <path d="M187.7,369.6h323.9V512H187.7V369.6z" />
            </svg>
            <span className="d-none d-md-inline">Công cụ</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#reportModal"
                href="#"
                onClick={showReportModal}
              >
                Báo cáo
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                id="memberList"
                onClick="showMemberList()"
              >
                Danh sách lớp
              </a>
            </li>
            <li>
              <a className="dropdown-item" id="showWheel" onClick={showWheelModal} href="#">
                Picker Wheel
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={showConfigModal}>
                Cấu hình
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={t}
                target="_blank"
              >
                Chỉnh sửa nội dung
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick="updateHTML()">
                Cập nhật nội dung
              </a>
            </li>
          </ul>
        </div>

        <button
          id="btnRaiseHand"
          type="button"
          className="btn btn-secondary ms-2 d-none"
          data-bs-toggle="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            width="16"
            height="16"
            fill="#ffffff"
          >
            <circle cx="21.732" cy="5.5" r="1.5" />
            <circle cx="17.732" cy="2.5" r="1.5" />
            <circle cx="13.732" cy="1.5" r="1.5" />
            <circle cx="9.732" cy="3.5" r="1.5" />
            <path
              d="M20.232,5.5V12c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5V2.5h-3V11c0,0.276-0.224,0.5-0.5,0.5
c-0.276,0-0.5-0.224-0.5-0.5V1.5h-3V11c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5V3.5h-3V16l-2.025-2.771
c-0.6-0.925-1.771-1.235-2.629-0.705c-0.855,0.542-1.067,1.724-0.475,2.646c0,0,3.266,4.943,4.658,7.059S11.408,26,15.625,26
c6.982,0,7.607-5.392,7.607-7s0-13.5,0-13.5H20.232z"
            />
          </svg>
          <span className="d-none d-md-inline">Giơ tay</span>
        </button>

        <button
          id="btnRoom"
          type="button"
          className="btn btn-primary ms-2 d-none room"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-online"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-people-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fill-rule="evenodd"
              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
            />
            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          </svg>
          <span className="d-none d-md-inline">Phòng chat</span>{" "}
          <span className="badge badge-secondary bg-secondary" id="numOnline">
            0
          </span>
        </button>

        <button
          id="login"
          type="button"
          className="guest btn btn-primary ms-3 d-none btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#modal-login"
        >
          <span>Đăng nhập</span>
        </button>
        <div
          id="login-spinner"
          className="spinner-border text-light ms-3"
          role="status"
        ></div>
        <div className="dropdown">
          <img
            id="avatar"
            src="../../images/user.svg"
            data-bs-toggle="dropdown"
            width="38x"
            height="38x"
            className="user avatar rounded-circle ms-3 d-none dropdown-toggle"
          />
          <ul
            className="dropdown-menu dropdown-menu-center text-small"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a
                className="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#modal-login"
              >
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={logOut}
              >
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown-menu">
          <a
            className="dropdown-item"
            href="#"
            onClick='deleteUserReport(" + doc.id + ")'
          >
            Xóa
          </a>
        </div>
        <div
          className="modal d-block1"
          id="modal-login"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Tài khoản</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div id="firebaseui-auth-container" className="guest"></div>
                <div id="user-signed-in" className="d-none d-flex user">
                  <div className="flex-grow-1 d-flex justify-content-center">
                    <img
                      src="../../images/user.svg"
                      width="110px"
                      height="110px"
                      className="avatar rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1  d-flex flex-column align-self-center me-4">
                    <div id="email" className="align-self-center">
                      Email
                    </div>
                    <div id="phone">Phone</div>
                    <div id="name" className="align-self-center">
                      Name
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-none user">
                <button
                  id="sign-out"
                  type="button"
                  className="btn btn-danger"
                  onClick={logOut}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function logOut() {
    firebase_legacy.auth().signOut();
  }
}

export default RoomTopButton;
