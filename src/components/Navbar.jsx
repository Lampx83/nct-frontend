"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import LogoSVG from "@/components/LogoSVG";

const Navbar = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const [menuItems, setMenuItems] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isToggleClicked, setIsToggleClicked] = useState(false);

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
    setIsToggleClicked(true);
    setIsNavCollapsed(!isNavCollapsed);
    setTimeout(() => {
      setIsToggleClicked(false);
    }, 500);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top p-0"
      style={{
        backgroundColor:
          pathname === "/"
            ? scrolled || !isNavCollapsed
              ? "var(--bs-heading-color)"
              : "transparent"
            : "var(--bs-heading-color)",
        backdropFilter: (pathname === "/" && scrolled) || !isNavCollapsed ? "blur(10px)" : "none",
        WebkitBackdropFilter: (pathname === "/" && scrolled) || !isNavCollapsed ? "blur(10px)" : "none",
        zIndex: 1000,
        transition: isToggleClicked ? "none" : "all 0.5s ease",
      }}
    >
      <a href="/" className="navbar-brand d-flex align-items-center px-1 px-xxl-5">
        <img
          src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/NEU-NCT-02-01.png"
          alt="Logo"
          height="80px"
          className="d-md-block ms-1 ms-md-0"
        />
        <div className="d-flex flex-column ms-2 d-none d-md-block d-xxl-block">
          <h5
            className="m-0 text-white"
            style={{
              textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
              transition: "color 0.3s ease", fontSize: "0.8rem",
              fontFamily: " Barlow, sans-serif",
              fontWeight: "bold",
            }}
          >
            ĐẠI HỌC KINH TẾ QUỐC DÂN
          </h5>
          <h1
            className="m-0 text-white mt-1"
            style={{
              textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
              transition: "color 0.3s ease",
              fontSize: "1.1rem",
              fontWeight: "bold",
              fontFamily: "Barlow, sans-serif",
            }}
          >
            TRƯỜNG CÔNG NGHỆ
          </h1>
        </div>
      </a>
      <button
        className="navbar-toggler mx-2"
        type="button"
        onClick={handleNavCollapse}
        aria-controls="navbarCollapse"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div 
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} 
        id="navbarCollapse"
        style={{
          backgroundColor: !isNavCollapsed ? "var(--bs-heading-color)" : "transparent",
          // margin: !isNavCollapsed ? "0px -12px" : "0",
          padding: !isNavCollapsed ? "1rem" : "0",
          marginRight: !isNavCollapsed ? "48px" : "60px",
          // marginTop: !isNavCollapsed ? "0px -12px" : "0",
          // marginBottom: !isNavCollapsed ? "0px -12px" : "0",
        }}
      >
        <ul className="navbar-nav ms-auto p-4 p-lg-0">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item position-relative">
              <a 
                className="nav-link text-white fw-bolder" 
                href={item.path}
                style={{
                  borderBottom: !isNavCollapsed ? "1px solid rgba(255,255,255,0.1)" : "none", // Thêm đường kẻ phân cách giữa các menu items
                  padding: !isNavCollapsed ? "1rem 0" : "10px", // Tăng padding cho menu items khi mở
                  fontFamily: "Barlow, sans-serif",
                  fontSize: "1.0rem",
                  fontWeight: "bold",
                  textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;