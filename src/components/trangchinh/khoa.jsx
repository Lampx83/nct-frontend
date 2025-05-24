"use client";

import { useEffect, useState } from "react";

const ClientsSection = () => {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const response = await fetch(
          "https://nct-frontend-liard.vercel.app/admin/api/index-page?populate[departments][populate]=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch departments data");
        }
        const data = await response.json();
        setClientsData(data.data.attributes.departments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClientsData();
  }, []);

  const SkeletonClientItem = () => (
    <div className="client-logo d-flex flex-column align-items-center">
      <div
        className="skeleton"
        style={{ width: "100%", height: "200px", background: "#e0e0e0" }}
      ></div>
      <h5
        className="skeleton"
        style={{ width: "80%", height: "30px", background: "#e0e0e0", marginTop: "15px" }}
      ></h5>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  const baseUrl = "https://nct-frontend-liard.vercel.app/admin";

  return (
    <section id="clients" className="clients section">
      <div className="container">
        <h2 className="text-center fw-bold mb-1">CÁC KHOA TRỰC THUỘC</h2>
        <div className="clients-wrap">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((_, index) => <SkeletonClientItem key={index} />)
            : clientsData.map((department) => {
                const logoUrl = department.thumbnail?.data?.attributes?.url
                  ? `${baseUrl}${department.thumbnail.data.attributes.url}`
                  : "https://via.placeholder.com/150";
                
                const departmentLink = department.link || "#"; // Nếu không có link thì không điều hướng

                return (
                  <div
                    key={department.id}
                    className="client-logo d-flex flex-column align-items-center"
                  >
                    <a href={departmentLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src={logoUrl}
                        alt={department.name}
                        className="logo-img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                          console.error("Image failed to load:", logoUrl);
                        }}
                      />
                    </a>
                    <a href={department.link} target="_blank" rel="noopener noreferrer">
                      <h5>{department.name}</h5>
                    </a>
                  </div>
                );
              })}
        </div>
      </div>

      <style jsx>{`
        .clients {
          color: #333;
          background-color: #fff;
          padding: 25px 0;
          overflow: hidden;
        }
        .clients .container {
          margin: 0 auto;
          padding: 0 15px;
          width: 95%;
          max-width: none;
        }
        .clients .clients-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap:  0px;
        }
        .clients .client-logo {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          align-items: center;
          overflow: hidden;
          flex: 0 0 31%;
          max-width: 31%;
          padding: 20px;
          min-height: 280px;
        }
        .clients .client-logo .logo-img {
          display: block;  
          width: 220px;
          height: 220px;
          padding: 20px 0 10px 0;
          transition: transform 0.3s ease;
          object-fit: contain;
        }

        .clients .client-logo h5 {
          margin: 0;
          padding: 10px 15px;
          font-size: 18spx;
          color: #333;
          text-align: center;
          line-height: 1.3;
          max-width: 90%;
          word-wrap: break-word;
          transition: color 0.3s ease;
        
          cursor: pointer;
          text-decoration: none;
        }
        .clients .client-logo h5:hover {
          color: #780614;
        }
        .clients .client-logo:hover .logo-img {
          transform: scale(1.1);
        }
        @media (max-width: 991px) {
          .clients .client-logo {
            flex: 0 0 48%;
            max-width: 48%;
            min-height: 240px;
          }
          .clients .client-logo .logo-img {
            max-width: 150px;
          }
          .clients .client-logo h5 {
            font-size: 18px;
            white-space: normal;
          }
        }
        @media (max-width: 640px) {
          .clients .client-logo {
            flex: 0 0 100%;
            max-width: 100%;
            min-height: 200px;
          }
          .clients .client-logo .logo-img {
            max-width: 120px;
            padding: 15px 0 10px 0;
          }
          .clients .client-logo h5 {
            font-size: 16px;
            white-space: normal; /* Cho phép tiêu đề xuống dòng */
          }
        }
        .skeleton {
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
