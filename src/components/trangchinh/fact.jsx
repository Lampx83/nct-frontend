"use client";

import { useEffect, useState } from "react";

const StatsSection = () => {
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await fetch(
          "https://nct-frontend-liard.vercel.app/admin/api/index-page?populate[stats][populate]=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stats data");
        }
        const data = await response.json();
        setStatsData(data.data.attributes.stats); // Truy cập mảng stats
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatsData();
  }, []);

  // Skeleton Loading Component
  const SkeletonStatsItem = () => (
    <div className="col-lg-3 col-md-6">
      <div className="stats-item d-flex flex-column justify-content-center">
        <span className="skeleton" style={{ width: "80px", height: "48px", background: "#e0e0e0" }}></span>
        <p className="skeleton" style={{ width: "100px", height: "16px", background: "#e0e0e0", marginTop: "10px" }}></p>
      </div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <section id="stats" className="stats section bg-dark text-white position-relative my-5">
      <img
        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
        alt="Stats Background"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ objectFit: "cover", zIndex: 1 }}
      />
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: "rgba(6, 6, 6, 0.8)", zIndex: 2 }}
      ></div>

      <div className="container position-relative z-3 py-4">
        <div className="row flex-nowrap justify-content-around gx-3">
          {loading
            ? [1, 2, 3, 4].map((_, index) => <SkeletonStatsItem key={index} />)
            : statsData.map((stat) => (
                <div key={stat.id} className="col-lg-3 col-md-6">
                  <div className="stats-item d-flex flex-column justify-content-center text-center p-3">
                    <i className={`fa ${stat.iconClass}`} aria-hidden="true"></i>
                    <span className="display-5 fw-bold" style={{ fontFamily: "Barlow, sans-serif"}}>{stat.number}</span>
                    <p className="mb-0 fw-bold" style={{ fontFamily: "Barlow, sans-serif"}}>
                      {stat.title}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <style jsx>{`
        .stats {
          overflow: hidden;
        }
        .stats .stats-item {
          min-height: 120px;
        }
        .skeleton {
          animation: pulse 1.5s infinite ease-in-out;
          display: inline-block;
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
        @media (max-width: 991px) {
          .row {
            flex-wrap: wrap !important;
          }
          .col-lg-3 {
            flex: 0 0 50% !important;
            max-width: 50% !important;
          }
          .stats-item {
            padding: 15px !important;
          }
        }
        @media (max-width: 767px) {
          .row {
            flex-wrap: wrap !important;
          }
          .stats-item span {
            font-size: 36px !important;
          }
          .stats-item p {
            font-size: 14px !important;
          }
          .col-lg-3 {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
          .stats-item {
            padding: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;