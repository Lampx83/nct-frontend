"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");
  const [menuItems, setMenuItems] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "https://nct-frontend-liard.vercel.app/admin/api/navigation/render/1?type=TREE"
        );
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => (
      <li
        key={item.id}
        className={`nav-item position-relative ${item.items.length > 0 ? "dropdown" : ""}`}
        style={{
          // margin: "20px 0", // Đã comment out, có thể điều chỉnh lại nếu cần
        }}
      >
        <a
          className={`nav-link text-white ${item.items.length > 0 ? "dropdown-toggle" : ""}`}
          href={item.path}
          style={{
            padding: "0.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "transparent",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          onClick={(e) => {
            if (item.items.length > 0) {
              e.preventDefault();
              handleDropdownToggle(item.id);
            } else {
              setIsNavCollapsed(true);
              setActiveDropdown(null);
            }
          }}
        >
          <span>{item.title.toUpperCase()}</span>
          {/* Icon đã bị comment out trong code của bạn, nếu cần có thể bỏ comment */}
          {/* <i
            className={`fas fa-chevron-${
              item.items.length > 0
                ? activeDropdown === item.id
                  ? "up"
                  : "down"
                : "right"
            }`}
            style={{
              fontSize: "0.7rem",
              transition: "transform 0.3s ease",
              transform:
                item.items.length > 0 && activeDropdown === item.id
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
            }}
          ></i> */}
        </a>
        {item.items.length > 0 && (
          <ul
            className={`dropdown-menu ${activeDropdown === item.id ? "show" : ""}`}
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "none",
              marginTop: "5px",
              marginBottom: "0",
              position: "static",
              width: "100%",
              boxShadow: "none",
              padding: "0",
              transition: "max-height 0.3s ease, opacity 0.3s ease",
              maxHeight: activeDropdown === item.id ? "500px" : "0",
              opacity: activeDropdown === item.id ? 1 : 0,
              overflow: "hidden",
            }}
          >
            {item.items.map((subItem, index) => (
              <li
                key={subItem.id}
                style={{
                  borderBottom:
                    index < item.items.length - 1
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "none",
                }}
              >
                <a
                  className="dropdown-item text-white"
                  href={subItem.path}
                  style={{
                    padding: "0.75rem 1.5rem",
                    textAlign: "left",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    backgroundColor: "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => {
                    setIsNavCollapsed(true);
                    setActiveDropdown(null);
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255,0,0,0.2)") // Màu hover mới: đỏ nhạt
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {subItem.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav
      className="navbar fixed-top"
      style={{
        backgroundColor: "transparent",
        zIndex: 1000,
        transition: "all 0.5s ease",
        padding: "0px",
        width: "100vw",
        // overflowX: "hidden",
      }}
    >
      <div className="container-fluid p-0 m-0" style={{ width: "100vw", overflowX: "hidden" }}>
        {/* Dòng 1: Thông báo - ĐHKTQD - Chọn ngôn ngữ */}
        <div
          className="row w-100"
          style={{
            backgroundColor: scrolled ? "white" : "transparent",
          }}
        >
          <div className="col-6 d-flex align-items-center">
            <i
              className="fas fa-bell px-3"
              style={{ color: scrolled ? "var(--bs-heading-color)" : "white" }}
            ></i>
            <span style={{ color: scrolled ? "var(--bs-heading-color)" : "white" }}>
              Thông báo
            </span>
          </div>
          <div className="col-6 text-end px-1">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: scrolled ? "var(--bs-heading-color)" : "white",
                }}
              >
                {language}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => setLanguage("Tiếng Việt")}>
                    Tiếng Việt
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setLanguage("English")}>
                    English
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dòng 2: Menu - Tìm kiếm */}
        <div
          className="row w-100 align-items-center"
          style={{
            backgroundColor: scrolled ? "var(--bs-heading-color)" : "transparent",
            transition: "background-color 0.5s ease",
            height: "68px"
          }}
        >
          <div className="col-4 d-flex py-2">
            <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
              <i className="fas fa-bars text-white fs-4"></i>
            </button>
          </div>
          <div className="col-4 text-center"></div>
          <div className="col-4 text-end">
            <button className="btn px-1">
              <i className="fas fa-search text-white fs-4"></i>
            </button>
          </div>
        </div>

        {/* Khối căn giữa: ĐHKTQD - Logo - TRƯỜNG CÔNG NGHỆ */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{
            zIndex: 1001,
            width: "100%",
            maxWidth: "280px",
            paddingTop: "12px",
            backgroundColor: scrolled ? "var(--bs-heading-color)" : "transparent",
            transition: "background-color 0.5s ease",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            overflow: "visible",
          }}
        >
          <h6
            className="fw-bold m-0"
            style={{
              color: "white",
              transition: "color 0.3s ease",
            }}
          >
            ĐẠI HỌC KINH TẾ QUỐC DÂN
          </h6>
          <div
            style={{
              backgroundColor: scrolled ? "var(--bs-heading-color)" : "transparent",
              borderBottomLeftRadius: "80px",
              borderBottomRightRadius: "80px",
              paddingBottom: "20px",
            }}
          >
            <img
              src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/NEU-NCT-02-01.png"
              alt="Logo"
              height="92px"
            />
            <h5
              className="fw-bold m-0"
              style={{
                color: "white",
                transition: "color 0.3s ease",
              }}
            >
              TRƯỜNG CÔNG NGHỆ
            </h5>
          </div>
        </div>

        {/* Menu Items - Sidebar trượt từ trái sang phải */}
        <div
          className="navbar-collapse"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "20%",
            backgroundColor: "var(--bs-heading-color)",
            transform: isNavCollapsed ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 1002,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <button
            className="btn text-white mb-3"
            onClick={handleNavCollapse}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1003,
              padding: "20px 10px",
            }}
          >
            <i className="fas fa-times fs-4"></i>
          </button>
          <div className="mt-5">
            <ul className="navbar-nav w-100 text-start">{renderMenuItems(menuItems)}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;