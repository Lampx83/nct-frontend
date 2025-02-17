import React, { useState, useEffect } from "react";
import app from "../../firebase.js";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Heroes({ onShowLogin, user, loading }) {
  const handleShowLogin = () => {
    onShowLogin(true);
  };

  return (
    <div className="container">
      <div className="row flex-md-row-reverse align-items-center">
        <div className="col-md-6 align-middle text-center">
          <img
            className="w-75"
            src="/images/learning.svg"
            loading="lazy"
            alt="Learning"
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          {loading ? (
            <div
              id="login-spinner"
              className="spinner-border"
              role="status"
            ></div>
          ) : !user ? (
            <div>
              <p className="guide">
                VnCodelab cung cấp công cụ để tạo, quản lý, theo dõi phòng học
                một cách tiện lợi. Tại đây người sử dụng có thể soạn các bài,
                chia sẻ tới người học và theo dõi người học trong lớp. VnCodelab
                cũng cung cấp công cụ để chế bản sách điện tử và sách in. Về mặt
                nội dung, VnCodelab cung cấp nhiều bài học hữu ích, đặc biệt là
                liên quan đến Công nghệ.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <a className="btn btn-primary px-4 me-md-2" href="/room/uLNhho">
                  Hướng dẫn
                </a>
                <button
                  type="button"
                  className="btn btn-warning px-4 me-md-2 guest"
                  onClick={handleShowLogin}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="fs-3">Xin chào</div>
              <div
                className="text-primary fs-2  fw-bold"
                style={{ cursor: "pointer" }}
                onClick={handleShowLogin}
              >
                {user.displayName}
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                <a className="btn btn-primary px-4 me-md-2" href="/docs">
                  Quản lý
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Heroes;
