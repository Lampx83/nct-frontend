"use client";
import React, { useState, useEffect } from "react";

function Footer() {
  const [bulletMenu, setBulletMenu] = useState([]);
  const [rowMenu, setRowMenu] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [bulletResponse, rowResponse] = await Promise.all([
          fetch(
            "https://nct-frontend-liard.vercel.app/admin/api/navigation/render/2?type=TREE"
          ),
          fetch(
            "https://nct-frontend-liard.vercel.app/admin/api/navigation/render/3?type=TREE"
          ),
        ]);

        const bulletData = await bulletResponse.json();
        const rowData = await rowResponse.json();

        if (bulletData.length > 0) {
          setBulletMenu(bulletData);
        }
        setRowMenu(rowData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Hiển thị loading khi dữ liệu chưa được tải
  if (loading) return null;

  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5">
      <div className="container">
        <div className="row g-5">
          {bulletMenu.length > 0 && (
            <>
              {/* Menu Địa chỉ */}
              <div className="col-lg-6 d-flex flex-column align-items-center align-items-lg-start">
                <h4 className="text-light fw-bold mb-4">
                  {bulletMenu[0].title}
                </h4>
                {bulletMenu[0].items.map((item) => (
                  <p className="mb-2 text-center text-lg-start" key={item.id}>
                    {/* Icon tự động theo kiểu thông tin */}
                    {/\d{7,}/.test(item.title) ? ( // Nếu chuỗi item.title chứa ít nhất 7 chữ liên tục -> sđt
                      <i className="fa fa-phone-alt me-3"></i>
                    ) : item.title.includes("@") ? ( // Nếu chuỗi item.title chứa kí tự '@' -> email
                      <i className="fa fa-envelope me-3"></i>
                    ) : item.title.includes("facebook") ? ( // Nếu chuỗi item.title chứa từ 'facebook' -> link
                      <i className="fa-brands fa-facebook me-3"></i>
                    ) : (
                      <i className="fa fa-map-marker-alt me-3"></i>
                    )}
                    {item.title}
                  </p>
                ))}

              </div>
              {/* Menu Thông tin (Chia thành 2 cột) */}
              <div className="col-lg-6 d-none d-lg-block">
                <h4 className="text-light fw-bold mb-4 text-center text-lg-start">
                  {bulletMenu[1].title}
                </h4>
                <div className="row">
                  <div className="col-6 d-flex flex-column">
                    {bulletMenu[1].items
                      .slice(0, Math.ceil(bulletMenu[1].items.length / 2))
                      .map((item) => (
                        <a
                          key={item.id}
                          className="btn btn-link"
                          href={item.path}
                        >
                          {item.title}
                        </a>
                      ))}
                  </div>
                  <div className="col-6 d-flex flex-column">
                    {bulletMenu[1].items
                      .slice(Math.ceil(bulletMenu[1].items.length / 2))
                      .map((item) => (
                        <a
                          key={item.id}
                          className="btn btn-link"
                          href={item.path}
                        >
                          {item.title}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="container mt-4">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 d-flex flex-wrap align-items-center justify-content-center justify-content-md-start">
              Bản quyền thuộc về:&nbsp;
              <a className="border-bottom" href="/">
                Trường Công nghệ
              </a>
              ,&nbsp;
              <a className="border-bottom" href="https://www.neu.edu.vn">
                Đại học Kinh tế Quốc dân
              </a>
            </div>
            {/* Menu cuối */}
            <div className="col-md-6 text-center text-md-end ">
              <div className="footer-menu d-flex flex-wrap align-items-center  justify-content-center">
                {rowMenu.map((item) => (
                  <a key={item.id} href={item.path} target={item.target}>
                    {item.title}
                  </a>
                ))}
                {/* Nút cuộn lên đầu trang */}

                <button
                  className="btn btn-primary btn-sm ps-3 pe-3"
                  href="#"
                  role="button"
                  onClick={scrollToTop}
                >
                  <i className="fa fa-arrow-up"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
