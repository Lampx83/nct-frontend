"use client";

import { useEffect, useState } from "react";
import config from "@/utils/config";

const ClientsSection = () => {
  const baseUrl = config.API_URL;
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/index-page?populate[departments][populate]=*`
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
    <div className="col text-center">
      <div className="skeleton mx-auto" style={{ width: "100px", height: "100px", background: "#e0e0e0" }}></div>
      <div className="skeleton mt-2 mx-auto" style={{ width: "80%", height: "20px", background: "#e0e0e0" }}></div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <section id="clients" className="clients section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">CÁC KHOA TRỰC THUỘC</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonClientItem key={index} />)
            : clientsData.slice(0, 6).map((department) => {
                const logoUrl = department.thumbnail?.data?.attributes?.url
                  ? `${baseUrl}${department.thumbnail.data.attributes.url}`
                  : "https://via.placeholder.com/150";
                const departmentLink = department.link || "#";

                return (
                  <div key={department.id} className="col text-center mt-3 mb-3">
                    <a
                      href={departmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block"
                    >
                      <img
                        src={logoUrl}
                        alt={department.name}
                        className="img-fluid mx-auto d-block client-logo-img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </a>
                    <a
                      href={departmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none d-block mt-2"
                    >
                      <h5 className="mb-0 text-dark">{department.name}</h5>
                    </a>
                  </div>
                );
              })}
        </div>
      </div>

      <style jsx>{`
        .client-logo-img {
          max-height: 160px;
          transition: transform 0.3s ease;
        }
        .client-logo-img:hover {
          transform: scale(1.1);
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
