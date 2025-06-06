"use client";
import '../../css/introHome.css';
import config from "@/utils/config";

import { useEffect, useState } from "react";

export function Intro() {
  const [introData, setIntroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const AOS = require("aos");
      AOS.init();
    }

    const fetchIntroData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/api/index-page?populate[imagesIntroduction][populate]=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("API Response:", data); // Debug dữ liệu API
        setIntroData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIntroData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  const imagesIntroduction = introData?.data?.attributes?.imagesIntroduction || [];
  const introductionHtml = introData?.data?.attributes?.introduction || "";
  const baseUrl = config.API_URL; // Base URL của API

  // Hàm xử lý HTML từ API
  const renderIntroduction = () => {
    return { __html: introductionHtml };
  };

  return (
    <section id="services" className="services section text-center">
      {/* Section Title và Introduction từ API */}
      <div className="intro p-md-5 pt-5 pb-5" dangerouslySetInnerHTML={renderIntroduction()} />

      {/* Images Introduction */}
      <div className="container-fuild px-5 mx-1" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-5 d-flex align-items-stretch">
          {imagesIntroduction.map((item, index) => {
            const imageUrl = item.image?.data?.attributes?.url
              ? `${baseUrl}${item.image.data.attributes.url}`
              : "https://via.placeholder.com/400x300"; // Fallback image
            console.log("Image URL:", imageUrl); // Debug URL ảnh

            return (
              <div
                key={item.id}
                className="col-xl-3 col-md-6" 
                data-aos="zoom-in"
                data-aos-delay={200 + index * 100}
              >
                <div className="service-item d-flex flex-column h-100">
                  <div className="img">
                    <img
                      src={imageUrl}
                      className="img-fluid"
                      alt={item.title || `Service ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300"; // Fallback nếu ảnh lỗi
                        console.error("Image failed to load:", imageUrl);
                      }}
                    />
                  </div>
                  <div className="details position-relative d-flex flex-column align-items-center text-center p-4 flex-grow-1">
                    <div className="icon">
                      <i
                        className={`bi bi-${
                          index === 0 ? "activity" : index === 1 ? "broadcast" : "easel"
                        }`}
                      
                      />
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="text-content">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> 

      {/* CSS trực tiếp với styled-jsx */}
      <style jsx>{`
        .services {
          color: #444444;
          background-color: #ffffff;
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
          height: 300px;
          object-fit: cover;
        }

        .services .details {
          background: rgba(255, 255, 255, 0.95);
          padding: 35px 22px;
          margin: -100px 15px 0 15px;
          transition: all ease-in-out 0.3s;
          position: relative;
          text-align: center;
          border-radius: 8px;
          box-shadow: inset 0px 0 20px rgba(0, 0, 0, 0.1); 
        }

        .services .details .icon {
          margin: 0;
          width: 72px;
          height: 72px;
          background: #780614;
          color: #ffffff;
          border: 6px solid #ffffff;
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
          font-size: clamp(1.25rem,1.25vw,1.5em);
          transition: ease-in-out 0.3s;
          color: #273d4e;

        }

        .services .details p {
          color: rgba(68, 68, 68, 0.9);
          line-height: 24px;
          font-size: 14px;
          margin-bottom: 0;
        }

        .services .service-item:hover .details h3 {
          color: #780614;
        }

        .services .service-item:hover .details .icon {
          background: #ffffff;
          border: 2px solid #780614;
        }

        .services .service-item:hover .details .icon i {
          color: #780614;
        }

        .services .service-item:hover .img img {
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .services .img img {
            height: 200px;
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