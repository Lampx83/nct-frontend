"use client";
import React, { useEffect, useState } from "react";
import LogoSVG from "@/components/LogoSVG";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Theo dõi mục được hover để hiển thị submenu

  // Dữ liệu menu tĩnh dựa trên yêu cầu của bạn
  const staticMenuItems = [
    {
      id: 1,
      title: "GIỚI THIỆU",
      path: "#",
      children: [
        { id: 11, title: "Trường Công Nghệ", path: "/gioi-thieu/truong-cong-nghe" },
        { id: 12, title: "Cơ cấu tổ chức", path: "/gioi-thieu/co-cau-to-chuc" },
        { id: 13, title: "Liên hệ", path: "/gioi-thieu/lien-he" },
      ],
    },
    {
      id: 2,
      title: "ĐÀO TẠO",
      path: "#",
      children: [
        {
          id: 21,
          title: "Khoa Công Nghệ Thông Tin",
          path: "/dao-tao/khoa-cong-nghe-thong-tin",
          children: [
            { id: 211, title: "Khoa học máy tính", path: "/dao-tao/khoa-hoc-may-tinh" },
            { id: 212, title: "Công nghệ thông tin", path: "/dao-tao/cong-nghe-thong-tin" },
            { id: 213, title: "Kỹ thuật phần mềm", path: "/dao-tao/ky-thuat-phan-mem" },
            { id: 214, title: "An toàn thông tin", path: "/dao-tao/an-toan-thong-tin" },
            { id: 215, title: "Công nghệ thông tin và chuyển đổi số", path: "/dao-tao/cong-nghe-thong-tin-chuyen-doi-so" },
          ],
        },
        {
          id: 22,
          title: "Khoa Toán Kinh Tế",
          path: "/dao-tao/khoa-toan-kinh-te",
          children: [
            { id: 221, title: "Phân tích Dữ Liệu", path: "/dao-tao/phan-tich-du-lieu" },
            { id: 222, title: "Toán Kinh tế", path: "/dao-tao/toan-kinh-te" },
            { id: 223, title: "Định Phí Bảo hiểm Và Quản Trị Rủi Ro", path: "/dao-tao/dinh-phi-bao-hiem-quan-tri-rui-ro" },
          ],
        },
        { id: 23, title: "Khoa Khoa học cơ sở", path: "/dao-tao/khoa-khoa-hoc-co-so" },
        { 
          id: 24, 
          title: "Khoa Trí Tuệ Nhân Tạo", 
          path: "/dao-tao/khoa-tri-tue-nhan-tao",
          children: [
            { id: 241, title: "Trí Tuệ Nhân Tạo", path: "/dao-tao/tri-tue-nhan-tao" },
            { id: 242, title: "Khoa Học Dữ Liệu", path: "/dao-tao/khoa-hoc-du-lieu" },
          ],
        },
        { 
          id: 25, 
          title: "Khoa Thống Kê", 
          path: "/dao-tao/khoa-thong-ke",
          children: [
            { id: 251, title: "Thống Kê Kinh Tế", path: "/dao-tao/thong-ke-kinh-te" }
          ], 
        },
        {
          id: 26,
          title: "Khoa Hệ Thống Thông Tin",
          path: "/dao-tao/khoa-he-thong-thong-tin",
          children: [
            { id: 261, title: "Hệ thống thông tin quản lý", path: "/dao-tao/he-thong-thong-tin-quan-ly" },
            { id: 262, title: "Hệ thống thông tin", path: "/dao-tao/he-thong-thong-tin" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "THÔNG TIN",
      path: "#",
      children: [
        { id: 31, title: "Tuyển sinh", path: "/thong-tin/tuyen-sinh" },
        { id: 32, title: "Sinh viên", path: "/thong-tin/sinh-vien" },
        { id: 33, title: "Sự kiện", path: "/thong-tin/su-kien" },
        { id: 34, title: "Tin tức", path: "/thong-tin/tin-tuc" },
      ],
    },
  ];

  useEffect(() => {
    // Sử dụng dữ liệu tĩnh thay vì fetch API
    setMenuItems(staticMenuItems);
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
  };

  // Xử lý khi di chuột vào/ra khỏi mục menu
  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top p-0 transition-colors duration-300 ${scrolled ? "bg-red-600 shadow" : ""}`}
      style={{
        backgroundColor: scrolled ? "#990000" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        zIndex: 1000,
      }}
    >
      <a
        href="/"
        className="navbar-brand d-flex align-items-center px-1 px-xxl-5"
      >
        <img
          src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/NEU-NCT-02-01.png"
          href="/"
          alt=""
          // width="48px"
          height="80px"
          className="d-md-block ms-1 ms-md-0 wow fadeInDown"
        />
        {/* <div className="ms-md-0 wow fadeInDown">
          <LogoSVG />
        </div> */}
        <div className="d-flex flex-column ms-2 d-none d-md-block d-xxl-block wow fadeInDown">
          <h1
            className={`m-0 fs-5 ${scrolled ? "text-white" : "text-white"}`}
            style={{
              textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
              transition: "color 0.3s ease",
            }}
          >
            TRƯỜNG CÔNG NGHỆ
          </h1>
          <h3
            className={`m-0 fs-6 ${scrolled ? "text-white" : "text-white"}`}
            style={{
              textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
              transition: "color 0.3s ease",
            }}
          >
           Đại học Kinh tế Quốc Dân
          </h3>
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
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse wow fadeInDown`}
        id="navbarCollapse"
        style={{paddingRight: "3rem"}}
      >
        <ul className="navbar-nav ms-auto p-4 p-lg-0">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="nav-item position-relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className={`nav-link ${scrolled ? "text-white" : "text-white"}`}
                href={item.path}
                style={{
                  textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
                  transition: "color 0.3s ease",
                }}
              >
                {item.title}
              </a>
              {item.children && hoveredItem === item.id && (
                <div
                  className="submenu position-fixed" // Thay position-absolute bằng position-fixed
                  style={{
                    top: "100%", // Bắt đầu ngay dưới navbar
                    left: 0, // Bắt đầu từ cạnh trái màn hình
                    right: 0, // Kết thúc tại cạnh phải màn hình
                    backgroundColor: "#ffffff",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                    padding: "1rem",
                    zIndex: 1001,
                  }}
                >
                  <div className="container-fluid"> {/* Sử dụng container-fluid thay vì container */}
                    <div className="row">
                      {item.children.map((subItem) => (
                        <div key={subItem.id} className="col-md-4 mb-3">
                          <a
                            href={subItem.path}
                            className="d-block text-dark text-decoration-none py-2"
                            style={{
                              fontSize: "0.9rem",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {subItem.title}
                          </a>
                          {subItem.children && (
                            <ul className="list-unstyled">
                              {subItem.children.map((grandChild) => (
                                <li key={grandChild.id}>
                                  <a
                                    href={grandChild.path}
                                    className="d-block text-dark text-decoration-none py-1"
                                    style={{
                                      fontSize: "0.8rem",
                                      paddingLeft: "1rem",
                                      transition: "color 0.3s ease",
                                    }}
                                  >
                                    {grandChild.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;