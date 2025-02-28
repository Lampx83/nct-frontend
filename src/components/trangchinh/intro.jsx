"use client";

import { useEffect } from "react";

export function Intro() {
  // Khởi tạo AOS cho animation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const AOS = require("aos");
      AOS.init();
    }
  }, []);

  return (
    <section id="services" className="services section pt-3 mt-3 pb-3 mb-2">
      {/* Section Title */}
      <div className="container text-center" data-aos="fade-up">
        <h2>TRƯỜNG CÔNG NGHỆ - ĐẠI HỌC KINH TẾ QUỐC DÂN</h2>
        <p className="mb-1 fw-bold fs-4">ĐÓN ĐẦU CÔNG NGHỆ – TẠO DỰNG TƯƠNG LAI</p>
      </div>
      <div className="text-center mx-5 px-5 mt-0">
        <p className="fs-6 mb-4">Trường Công nghệ – một thành viên của Trường Đại học Kinh tế Quốc dân, nơi khai phóng tiềm năng công nghệ và sáng tạo.
Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.
Với một đội ngũ giảng viên hàng đầu và cơ sở vật chất hiện đại, Trường Công nghệ tự hào là cái nôi đào tạo những nhà lãnh đạo công nghệ tương lai, sẵn sàng chinh phục các thách thức trong kỷ nguyên số.</p>
      </div>
      {/* End Section Title */}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-5">
          <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div className="service-item">
              <div className="img">
                <img
                  src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/220814_ISFA_NEU0811.png"
                  className="img-fluid"
                  alt="Service 1"
                />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-activity"></i> {/* Icon Bootstrap */}
                </div>
                <h3>Giảng Viên Kinh Nghiệm</h3>
                <p>Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.</p>
              </div>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="300">
            <div className="service-item">
              <div className="img">
                <img
                  src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/4833ce6317447ce428ba973bd7531318.jpg"
                  className="img-fluid"
                  alt="Service 2"
                />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-broadcast"></i> {/* Icon Bootstrap */}
                </div>
                <h3>Chất Lượng Quốc Tế</h3>
                <p>Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.</p>
              </div>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="400">
            <div className="service-item">
              <div className="img">
                <img
                  src="https://nct.neu.edu.vn/wp-content/uploads/2024/05/220814_ISFA_NEU0812.png"
                  className="img-fluid"
                  alt="Service 3"
                />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-easel"></i> {/* Icon Bootstrap */}
                </div>
                <h3>Đối Tác Đa Dạng</h3>
                <p>Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.</p>
              </div>
            </div>
          </div>
          {/* End Service Item */}
        </div>
      </div>

      {/* CSS trực tiếp với styled-jsx */}
      <style jsx>{`
        .services {
          color: #444444; /* --default-color */
          background-color: #ffffff; /* --background-color */
          padding: 60px 0;
          scroll-margin-top: 90px;
          overflow: clip;
        }

        .services .img {
          border-radius: 8px;
          overflow: hidden;
        }

        .services .img img {
          transition: 0.6s;
          width: 100%;
          height: 300px; /* Kích thước cố định cho hình ảnh, tỷ lệ 4:3 */
          object-fit: cover; /* Giữ tỷ lệ và cắt phần dư */
        }

        .services .details {
          background: rgba(255, 255, 255, 0.95); /* --surface-color với opacity */
          padding: 50px 30px;
          margin: -100px 30px 0 30px;
          transition: all ease-in-out 0.3s;
          position: relative;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0px 0 25px rgba(0, 0, 0, 0.1);
        }

        .services .details .icon {
          margin: 0;
          width: 72px;
          height: 72px;
          background: #ff4a17; /* --accent-color */
          color: #ffffff; /* --contrast-color */
          border: 6px solid #ffffff; /* --contrast-color */
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 28px;
          transition: ease-in-out 0.3s;
          position: absolute;
          top: -36px;
          left: calc(50% - 36px);
        }

        .services .details h3 {
          font-weight: 700;
          margin: 10px 0 15px 0;
          font-size: 22px;
          transition: ease-in-out 0.3s;
          color: #273d4e; /* --heading-color */
        }

        .services .details p {
          color: rgba(68, 68, 68, 0.9); /* color-mix approximation */
          line-height: 24px;
          font-size: 14px;
          margin-bottom: 0;
        }

        .services .service-item:hover .details h3 {
          color: #ff4a17; /* --accent-color */
        }

        .services .service-item:hover .details .icon {
          background: #ffffff; /* --surface-color */
          border: 2px solid #ff4a17; /* --accent-color */
        }

        .services .service-item:hover .details .icon i {
          color: #ff4a17; /* --accent-color */
        }

        .services .service-item:hover .img img {
          transform: scale(1.2);
        }

        /* Section Title */
        .section-title {
          padding-bottom: 60px;
          position: relative;
        }

        .section-title h2 {
          font-size: 14px;
          font-weight: 500;
          padding: 0;
          line-height: 1px;
          margin: 0;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(68, 68, 68, 0.5); /* color-mix approximation */
          position: relative;
        }

        .section-title h2::after {
          content: "";
          width: 120px;
          height: 1px;
          display: inline-block;
          background: #ff4a17; /* --accent-color */
          margin: 4px 10px;
        }

        .section-title p {
          color: #273d4e; /* --heading-color */
          margin: 0;
          font-size: 36px;
          font-weight: 800;
          text-transform: uppercase;
          font-family: "Raleway", sans-serif;
        }

        @media (max-width: 768px) {
          .section-title p {
            font-size: 24px;
          }
        }

        @media (max-width: 768px) {
          .services .img img {
            height: 200px; /* Giảm kích thước trên mobile */
          }

          .services .details {
            margin: -70px 20px 0 20px;
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
}