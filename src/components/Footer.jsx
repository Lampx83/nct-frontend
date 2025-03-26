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
        const response = await fetch("https://nct-frontend-liard.vercel.app/admin/api/navigation/render/2?type=TREE");
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu menu:", error);
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
          <div className="row g-5 align-items-center">
            {/* Row cho Logo trên màn hình sm và md */}
            <div className="d-block d-lg-none col-sm-12">
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

            {/* Logo cho màn hình lg trở lên */}
            <div className="d-none d-lg-block col-lg-3">
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
            
            {/* Row cho thông tin và QR code trên màn hình sm và md */}
            <div className="d-block d-lg-none col-sm-12">
              <div className="row align-items-center">
                {/* Cột thông tin liên hệ */}
                <div className="col-8">
                  <h5 className="text-light fw-bold mb-4 utm-trajan">{schoolName}</h5>
                  {addressItems.map((item) => (
                    <p key={item.id} className="mb-2">
                      {item.title}
                    </p>
                  ))}
                </div>
                {/* QR Code */}
                <div className="col-4">
                  <img 
                    src="/images/NCT-QRCode.svg" 
                    alt="QR Code"
                    className="qr-code"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "150px"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Thông tin liên hệ cho màn hình lg trở lên */}
            <div className="d-none d-lg-block col-lg-7">
              <h4 className="text-light fw-bold mb-4 utm-trajan">{schoolName}</h4>
              {addressItems.map((item) => (
                <p key={item.id} className="mb-2">
                  {item.title}
                </p>
              ))}
            </div>

            {/* QR Code cho màn hình lg trở lên */}
            <div className="d-none d-lg-flex col-lg-2 justify-content-end align-items-center">
              <img 
                src="/images/NCT-QRCode.svg" 
                alt="QR Code"
                className="qr-code"
                style={{
                  maxWidth: "120px",
                  width: "100%",
                  height: "auto"
                }}
              />
            </div>
          </div>
        </div>

        {/* Phần dưới của footer - Copyright */}
        <div className="container">
          <div className="copyright">
            <div className="row align-items-center">
              {/* Phần bản quyền */}
              <div className="col-md-8 col-sm-9 text-md-start mb-3 mb-md-0">
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
              <div className="col-md-4 col-sm-3">
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
