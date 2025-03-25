"use client";
import React, { useState, useEffect } from "react";

function Footer() {
  const [footerData, setFooterData] = useState([]);
  const [rowMenu, setRowMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [footerResponse, rowResponse] = await Promise(
          fetch("https://nct-frontend-liard.vercel.app/admin/api/navigation/render/2?type=TREE")
        );

        const footerData = await footerResponse.json();
        const rowData = await rowResponse.json();

        setFooterData(footerData);
        setRowMenu(rowData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) return null;

  // Lấy thông tin từ API
  const schoolName = footerData[0]?.title || "";
  const addressTitle = footerData[1]?.title || "";
  const addressItems = footerData[1]?.items || [];

  return (
    <div className="container-fluid text-light footer pt-5 mt-5 position-relative" style={{ backgroundColor: "#134D8B" }}>
      {/* Thêm div cho ảnh nền */}
      <div 
        className="footer-bg-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/images/bg-footer.png')",
          backgroundSize: "100% auto",  // Điều chỉnh kích thước ảnh
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,  // Tăng độ đậm của ảnh
          zIndex: 1,
        }}
      ></div>

      {/* Wrap tất cả nội dung trong một div có z-index cao hơn */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Phần trên của footer - Logo và Thông tin liên hệ */}
        <div className="container">
          <div className="row g-5 align-items-center ms-0">
            {/* Cột logo */}
            <div className="col-lg-4 col-md-5">
              <img 
                src="https://nct-frontend-liard.vercel.app/admin/uploads/NEU_NCT_02_01_0c9458551d.png" 
                alt="Logo trường" 
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            </div>
            
            {/* Cột thông tin liên hệ */}
            <div className="col-lg-8 col-md-7">
              <h4 className="text-light fw-bold mb-4 utm-trajan">{schoolName}</h4>
              {addressItems.map((item) => (
                <p key={item.id} className="mb-2">
                  {item.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Phần dưới của footer - Copyright */}
        <div className="container">
          <div className="copyright">
            <div className="row align-items-center">
              {/* Phần bản quyền */}
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                Bản quyền thuộc về:&nbsp;
                <a className="border-bottom text-light" href="/">
                  Trường Công nghệ
                </a>
                ,&nbsp;
                <a className="border-bottom text-light" href="https://www.neu.edu.vn">
                  Đại học Kinh tế Quốc dân
                </a>
              </div>
              {/* Nút scroll to top */}
              <div className="col-md-6">
                <div className="footer-menu d-flex align-items-center justify-content-center justify-content-md-end">
                  <button
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                  >
                    <i className="fa-solid fa-angle-up"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
