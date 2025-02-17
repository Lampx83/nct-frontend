import React, { useEffect, useState, useRef } from "react";
import app from "../../firebase.js";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import LoginModal from "../../modals/LoginModal";

function NavBar({ onShowLogin, user }) {
  const uiContainerRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const handleShowLogin = () => {
    onShowLogin(true);
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
        <div className="container">
          <div ref={uiContainerRef} />
          <NavLink to="/" exact className="hone">
            <a className="navbar-brand" href="/">
              <img
                src="/images/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-tops me-1"
                alt="logo"
              />
              <img
                src="/images/logo_text.svg"
                height="30"
                className="d-inline-block align-tops me-1"
                alt="logo_text"
              />
            </a>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/*<li className="nav-item dropdown">*/}
              {/*    <a*/}
              {/*        className="nav-link nav-link-white dropdown-toggle"*/}
              {/*        href="/#"*/}
              {/*        id="navbarDropdown"*/}
              {/*        role="button"*/}
              {/*        data-bs-toggle="dropdown"*/}
              {/*        aria-expanded="false"*/}
              {/*    >*/}
              {/*        <span>Chủ đề</span>*/}
              {/*    </a>*/}
              {/*    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
              {/*        <li>*/}
              {/*            <a className="dropdown-item" href="/#">*/}
              {/*                <span>Tất cả</span>*/}
              {/*            </a>*/}
              {/*        </li>*/}
              {/*        <li>*/}
              {/*            <a className="dropdown-item" href="/#">*/}
              {/*                <span></span>*/}
              {/*            </a>*/}
              {/*        </li>*/}
              {/*    </ul>*/}
              {/*</li>*/}

              {/* <li className="nav-item">
              <a className="nav-link nav-link-white" href="/?cateID=Project">
                <span>Project</span>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link nav-link-white" href="/roadmap/1">
                <span>Roadmap</span>
              </a>
            </li> */}
            </ul>
            <div className="d-flex">
              <form
                method="get"
                action="/"
                className="d-none flex-grow-1 flex-md-grow-0"
              >
                <input
                  className="form-control"
                  type="search"
                  name="text"
                  placeholder="Search"
                  aria-label="Search"
                  id="input-search"
                />
              </form>
              {location.pathname === "/docs" &&
                (user ? (
                  <div
                    className="text-light"
                    style={{ cursor: "pointer" }}
                    onClick={handleShowLogin}
                  >
                    {user.displayName}
                  </div>
                ) : (
                  <button
                    id="login"
                    type="button"
                    className="guest btn btn-primary ms-3  btn-warning"
                    onClick={handleShowLogin}
                  >
                    <span>Đăng nhập</span>
                  </button>
                ))}
              {/*<div className="">*/}
              {/*    {loading ? (<div*/}
              {/*        id="login-spinner"*/}
              {/*        className="spinner-border text-light ms-3"*/}
              {/*        role="status"*/}
              {/*    ></div>) : user ? (<div className="dropdown">*/}
              {/*        <img*/}
              {/*            id="avatar"*/}
              {/*            src="/images/user.svg"*/}
              {/*            data-bs-toggle="dropdown"*/}
              {/*            width="38x"*/}
              {/*            height="38x"*/}
              {/*            className="user avatar rounded-circle ms-3 dropdown-toggle"*/}
              {/*            alt="user"*/}
              {/*        />*/}
              {/*        <ul*/}
              {/*            className="dropdown-menu dropdown-menu-center text-small"*/}
              {/*            aria-labelledby="dropdownUser1"*/}
              {/*        >*/}
              {/*            <li>*/}
              {/*                <a className="dropdown-item" href="/mylabs">*/}
              {/*                    Quản lý bài học*/}
              {/*                </a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a className="dropdown-item" href="/myclasses">*/}
              {/*                    Quản lý lớp học*/}
              {/*                </a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a*/}
              {/*                    className="dropdown-item"*/}
              {/*                    href="/#"*/}
              {/*                    data-bs-toggle="modal"*/}
              {/*                    data-bs-target="#modal-login"*/}
              {/*                >*/}
              {/*                    Tài khoản*/}
              {/*                </a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <hr className="dropdown-divider"/>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a*/}
              {/*                    className="dropdown-item"*/}
              {/*                    href="/#"*/}
              {/*                    onClick={() => {*/}
              {/*                        firebase.auth().signOut().then(r => {*/}
              {/*                        });*/}
              {/*                    }}*/}
              {/*                >*/}
              {/*                    Đăng xuất*/}
              {/*                </a>*/}
              {/*            </li>*/}
              {/*        </ul>*/}
              {/*    </div>) : (*/}
              {/*        <button*/}
              {/*        id="login"*/}
              {/*        type="button"*/}
              {/*        className="guest btn btn-primary ms-3  btn-warning"*/}
              {/*        onClick={onShowLogin(true)}*/}
              {/*    >*/}
              {/*        <span>Đăng nhập</span>*/}
              {/*    </button>*/}
              {/*    )}*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
