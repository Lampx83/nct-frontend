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
              transition: "color 0.3s ease", fontSize: "1rem"
            }}
          >
            ĐẠI HỌC KINH TẾ QUỐC DÂN
          </h5>
          <h1
            className="m-0 text-white"
            style={{
              textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
              transition: "color 0.3s ease",
              fontSize: "1.5rem",
              fontWeight: "bold"
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
          margin: !isNavCollapsed ? "0 -12px" : "0",
          padding: !isNavCollapsed ? "1rem" : "0",
        }}
      >
        <ul className="navbar-nav ms-auto p-4 p-lg-0">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item position-relative">
              <a 
                className="nav-link text-white" 
                href={item.path}
                style={{
                  borderBottom: !isNavCollapsed ? "1px solid rgba(255,255,255,0.1)" : "none", // Thêm đường kẻ phân cách giữa các menu items
                  padding: !isNavCollapsed ? "1rem 0" : "10px", // Tăng padding cho menu items khi mở
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
// import React, { useEffect, useState } from "react";
// import LogoSVG from "@/components/LogoSVG";

// const Navbar = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState(null); // Theo dõi mục được hover để hiển thị submenu

//   // Fetching data using the fetch API
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch(
//           "https://nct-frontend-liard.vercel.app/admin/api/navigation/render/1?type=TREE"
//         );
//         const data = await response.json();
//         console.log(data)
//         setMenuItems(data);
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   const MenuItems = (items, level = 0) => {
//     const handleSubmenuClick = (e, hasChildren) => {
//       if (hasChildren) {
//         e.preventDefault();
//         e.stopPropagation();

//         const isMobile = window.innerWidth < 992;
//         const currentMenu = e.currentTarget.nextElementSibling;

//         if (isMobile) {
//           // Tìm tất cả menu cùng cấp (siblings)
//           const parentUl = e.currentTarget.closest("ul");
//           const siblingMenus = parentUl.querySelectorAll(
//             ":scope > li > .dropdown-menu.show"
//           );

//           // Chỉ đóng các menu cùng cấp, không đóng menu cha hoặc menu con
//           siblingMenus.forEach((menu) => {
//             if (
//               menu !== currentMenu &&
//               !menu.contains(currentMenu) &&
//               !currentMenu.contains(menu)
//             ) {
//               menu.classList.remove("show");
//               const toggleButton = menu.previousElementSibling;
//               if (toggleButton) {
//                 toggleButton.classList.remove("show");
//                 toggleButton.setAttribute("aria-expanded", "false");
//               }
//             }
//           });

//           // Toggle menu hiện tại
//           currentMenu.classList.toggle("show");
//           e.currentTarget.classList.toggle("show");
//           e.currentTarget.setAttribute(
//             "aria-expanded",
//             e.currentTarget.getAttribute("aria-expanded") === "true"
//               ? "false"
//               : "true"
//           );
//         } else {
//           // Desktop logic - giữ nguyên code xử lý cho desktop
//           const submenuWrapper = e.currentTarget.nextElementSibling;
//           if (submenuWrapper) {
//             const allSubmenus = document.querySelectorAll(
//               ".submenu-wrapper.show, .dropdown-menu.show"
//             );
//             allSubmenus.forEach((menu) => {
//               if (menu !== submenuWrapper) {
//                 menu.classList.remove("show");
//                 if (menu.previousElementSibling) {
//                   menu.previousElementSibling.classList.remove("show");
//                   menu.previousElementSibling.setAttribute(
//                     "aria-expanded",
//                     "false"
//                   );
//                 }
//               }
//             });

//             submenuWrapper.classList.toggle("show");
//             e.currentTarget.classList.toggle("show");
//             e.currentTarget.setAttribute(
//               "aria-expanded",
//               e.currentTarget.getAttribute("aria-expanded") === "true"
//                 ? "false"
//                 : "true"
//             );
//           }
//         }
//       }
//     };

//     return items.map((item) => {
//       // Xử lý nút đặc biệt như ScoreUp
//       if (item.itemType === "button") {
//         return (
//           <li key={item.id} className="nav-item">
//             <a
//               href={item.path}
//               className="btn btn-primary navbar-button p-3 rounded-0 d-flex justify-content-center align-items-center "
//               style={{ backgroundColor: item.color || "" }}
//             >
//               {item.icon?.url && (
//                 <img
//                   src={`https://nct-frontend-liard.vercel.app/admin${item.icon.url}`}
//                   alt={item.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                   }}
//                 />
//               )}
//               {!item.icon && item.title}
//             </a>
//           </li>
//         );
//       }
//       // Xử lý menu có submenu
//       if (item.items && item.items.length > 0) {
//         return (
//           <li
//             key={item.id}
//             className={`nav-item ${
//               level === 0 ? "dropdown hover-primary" : "dropdown-submenu"
//             }`}
//           >
//             <a
//               className={`${level === 0 ? "nav-link" : "dropdown-item"} ${
//                 item.items.length > 0 ? "dropdown-toggle" : ""
//               }`}
//               href={item.path}
//               onClick={(e) => handleSubmenuClick(e, true)}
//               aria-expanded="false"
//             >
//               {item.title}
//             </a>
//             {level === 1 && (
//               <div className="submenu-wrapper">
//                 {MenuItems(item.items, level + 1)}
//               </div>
//             )}
//             {level !== 1 && (
//               <ul className="dropdown-menu">
//                 {MenuItems(item.items, level + 1)}
//               </ul>
//             )}
//           </li>
//         );
//       }
//       // Xử lý menu item bình thường
//       return (
//         <li key={item.id} className="nav-item">
//           <a
//             className={level === 0 ? "nav-link" : "dropdown-item"}
//             href={item.path}
//             onClick={(e) => handleSubmenuClick(e, false)}
//           >
//             {item.title}
//           </a>
//         </li>
//       );
//     });
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleNavCollapse = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   // Xử lý khi di chuột vào/ra khỏi mục menu
//   const handleMouseEnter = (itemId) => {
//     setHoveredItem(itemId);
//   };

//   const handleMouseLeave = () => {
//     setHoveredItem(null);
//   };

//   return (
//     <nav
//       className={`navbar navbar-expand-lg navbar-light fixed-top p-0 transition-colors duration-300 ${scrolled ? "bg-red-600 shadow" : ""}`}
//       style={{
//         backgroundColor: scrolled ? "#990000" : "transparent",
//         backdropFilter: scrolled ? "blur(10px)" : "none",
//         WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
//         zIndex: 1000,
//         transition: "all 1s ease",
//       }}
//     >
//       <a
//         href="/"
//         className="navbar-brand d-flex align-items-center px-1 px-xxl-5"
//       >
//         <img
//           src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/NEU-NCT-02-01.png"
//           href="/"
//           alt=""
//           // width="48px"
//           height="80px"
//           className="d-md-block ms-1 ms-md-0 wow fadeInDown"
//         />
//         {/* <div className="ms-md-0 wow fadeInDown">
//           <LogoSVG />
//         </div> */}
//         <div className="d-flex flex-column ms-2 d-none d-md-block d-xxl-block wow fadeInDown">
//           <h5
//               className={`m-0 fs-6 ${scrolled ? "text-white" : "text-white"}`}
//               style={{
//                 textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
//                 transition: "color 0.3s ease",
//               }}
//             >
//             ĐẠI HỌC KINH TẾ QUỐC DÂN
//             </h5>
//           <h1
//             className={`m-0 fs-4 ${scrolled ? "text-white" : "text-white"}`}
//             style={{
//               textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
//               transition: "color 0.3s ease",
//             }}
//           >
//             TRƯỜNG CÔNG NGHỆ
//           </h1>
//         </div>
//       </a>
//       <button
//         className="navbar-toggler mx-2"
//         type="button"
//         onClick={handleNavCollapse}
//         aria-controls="navbarCollapse"
//         aria-expanded={!isNavCollapsed}
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div
//         className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse wow fadeInDown`}
//         id="navbarCollapse"
//         style={{paddingRight: "3rem"}}
//       >
//         <ul className="navbar-nav ms-auto p-4 p-lg-0">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               className="nav-item position-relative"
//               onMouseEnter={() => handleMouseEnter(item.id)}
//               onMouseLeave={handleMouseLeave}
//             >
//               <a
//                 className={`nav-link ${scrolled ? "text-white" : "text-white"}`}
//                 href={item.path}
//                 style={{
//                   textShadow: !scrolled ? "0 0 8px rgba(0, 0, 0, 0.8)" : "none",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 {item.title}
//               </a>
//               {item.children && hoveredItem === item.id && (
//                 <div
//                   className="submenu position-fixed" // Thay position-absolute bằng position-fixed
//                   style={{
//                     top: "100%", // Bắt đầu ngay dưới navbar
//                     left: 0, // Bắt đầu từ cạnh trái màn hình
//                     right: 0, // Kết thúc tại cạnh phải màn hình
//                     backgroundColor: "#ffffff",
//                     boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
//                     padding: "1rem",
//                     zIndex: 1001,
//                   }}
//                 >
//                   <div className="container-fluid"> {/* Sử dụng container-fluid thay vì container */}
//                     <div className="row">
//                       {item.children.map((subItem) => (
//                         <div key={subItem.id} className="col-md-4 mb-3">
//                           <a
//                             href={subItem.path}
//                             className="d-block text-dark text-decoration-none py-2"
//                             style={{
//                               fontSize: "0.9rem",
//                               transition: "color 0.3s ease",
//                             }}
//                           >
//                             {subItem.title}
//                           </a>
//                           {subItem.children && (
//                             <ul className="list-unstyled">
//                               {subItem.children.map((grandChild) => (
//                                 <li key={grandChild.id}>
//                                   <a
//                                     href={grandChild.path}
//                                     className="d-block text-dark text-decoration-none py-1"
//                                     style={{
//                                       fontSize: "0.8rem",
//                                       paddingLeft: "1rem",
//                                       transition: "color 0.3s ease",
//                                     }}
//                                   >
//                                     {grandChild.title}
//                                   </a>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;