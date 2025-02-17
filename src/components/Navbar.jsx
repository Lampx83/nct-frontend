"use client";
import React, { useEffect, useState } from "react";
import LogoSVG from "@/components/LogoSVG";


const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Fetching data using the fetch API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "https://fit.neu.edu.vn/admin/api/navigation/render/1?type=TREE"
        );
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const MenuItems = (items, level = 0) => {
    const handleSubmenuClick = (e, hasChildren) => {
      if (hasChildren) {
        e.preventDefault();
        e.stopPropagation();

        const isMobile = window.innerWidth < 992;
        const currentMenu = e.currentTarget.nextElementSibling;

        if (isMobile) {
          // Tìm tất cả menu cùng cấp (siblings)
          const parentUl = e.currentTarget.closest("ul");
          const siblingMenus = parentUl.querySelectorAll(
            ":scope > li > .dropdown-menu.show"
          );

          // Chỉ đóng các menu cùng cấp, không đóng menu cha hoặc menu con
          siblingMenus.forEach((menu) => {
            if (
              menu !== currentMenu &&
              !menu.contains(currentMenu) &&
              !currentMenu.contains(menu)
            ) {
              menu.classList.remove("show");
              const toggleButton = menu.previousElementSibling;
              if (toggleButton) {
                toggleButton.classList.remove("show");
                toggleButton.setAttribute("aria-expanded", "false");
              }
            }
          });

          // Toggle menu hiện tại
          currentMenu.classList.toggle("show");
          e.currentTarget.classList.toggle("show");
          e.currentTarget.setAttribute(
            "aria-expanded",
            e.currentTarget.getAttribute("aria-expanded") === "true"
              ? "false"
              : "true"
          );
        } else {
          // Desktop logic - giữ nguyên code xử lý cho desktop
          const submenuWrapper = e.currentTarget.nextElementSibling;
          if (submenuWrapper) {
            const allSubmenus = document.querySelectorAll(
              ".submenu-wrapper.show, .dropdown-menu.show"
            );
            allSubmenus.forEach((menu) => {
              if (menu !== submenuWrapper) {
                menu.classList.remove("show");
                if (menu.previousElementSibling) {
                  menu.previousElementSibling.classList.remove("show");
                  menu.previousElementSibling.setAttribute(
                    "aria-expanded",
                    "false"
                  );
                }
              }
            });

            submenuWrapper.classList.toggle("show");
            e.currentTarget.classList.toggle("show");
            e.currentTarget.setAttribute(
              "aria-expanded",
              e.currentTarget.getAttribute("aria-expanded") === "true"
                ? "false"
                : "true"
            );
          }
        }
      }
    };

    return items.map((item) => {
      // Xử lý nút đặc biệt như ScoreUp
      if (item.itemType === "button") {
        return (
          <li key={item.id} className="nav-item">
            <a
              href={item.path}
              className="btn btn-primary navbar-button p-3 rounded-0 d-flex justify-content-center align-items-center "
              style={{ backgroundColor: item.color || "" }}
            >
              {item.icon?.url && (
                <img
                  src={`https://fit.neu.edu.vn/admin${item.icon.url}`}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
              {!item.icon && item.title}
            </a>
          </li>
        );
      }
      // Xử lý menu có submenu
      if (item.items && item.items.length > 0) {
        return (
          <li
            key={item.id}
            className={`nav-item ${
              level === 0 ? "dropdown hover-primary" : "dropdown-submenu"
            }`}
          >
            <a
              className={`${level === 0 ? "nav-link" : "dropdown-item"} ${
                item.items.length > 0 ? "dropdown-toggle" : ""
              }`}
              href={item.path}
              onClick={(e) => handleSubmenuClick(e, true)}
              aria-expanded="false"
            >
              {item.title}
            </a>
            {level === 1 && (
              <div className="submenu-wrapper">
                {MenuItems(item.items, level + 1)}
              </div>
            )}
            {level !== 1 && (
              <ul className="dropdown-menu">
                {MenuItems(item.items, level + 1)}
              </ul>
            )}
          </li>
        );
      }
      // Xử lý menu item bình thường
      return (
        <li key={item.id} className="nav-item">
          <a
            className={level === 0 ? "nav-link" : "dropdown-item"}
            href={item.path}
            onClick={(e) => handleSubmenuClick(e, false)}
          >
            {item.title}
          </a>
        </li>
      );
    });
  };

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 ">
      <a
        href="/"
        className="navbar-brand d-flex align-items-center px-1 px-xxl-5 "
      >
        <img
          src="/images/LogoNEU.png"
          href="/"
          alt=""
          width="48px"
          height="48px"
          className="d-md-block ms-1 ms-md-0  wow fadeInDown"
        />
        <div className="ms-md-0 wow fadeInDown">
          <LogoSVG />
        </div>
        <div className="d-flex flex-column ms-2 d-none d-md-block d-xxl-block wow fadeInDown">
          <h1 className="m-0 fs-5 text-primary">KHOA CÔNG NGHỆ THÔNG TIN</h1>
          <h2 className="m-0 text-dark fs-6">
            Faculty of Information Technology
          </h2>
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
        className={`${
          isNavCollapsed ? "collapse" : ""
        } navbar-collapse wow fadeInDown`}
        id="navbarCollapse"
      >
        <ul className="navbar-nav ms-auto p-4 p-lg-0">
          {MenuItems(menuItems)}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
