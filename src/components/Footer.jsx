"use client";
import React, { useState, useEffect } from "react";

function Footer() {
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
        const rowResponse = await fetch(
          "https://nct-frontend-liard.vercel.app/admin/api/navigation/render/3?type=TREE"
        );
        const rowData = await rowResponse.json();
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
            <div className="col-lg-4">
              <img 
                src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/NEU-NCT-02-01.png" 
                alt="Logo trường" 
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            </div>
            
            {/* Cột thông tin liên hệ */}
            <div className="col-lg-8">
              <h4 className="text-light fw-bold mb-4 utm-trajan">Trường Công nghệ - Đại học Kinh tế Quốc dân</h4>
              <p className="mb-2">
                Phòng 1209B Nhà A1, Đại Học Kinh tế Quốc dân
              </p>
              <p className="mb-2">
                207 Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, TP. Hà Nội
              </p>
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
                    <i class="fa-solid fa-angle-up"></i>
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
