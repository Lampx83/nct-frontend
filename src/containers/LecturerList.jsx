"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../utils/fetch";
import "../css/lectureList.css";
import config from "../utils/config";



const LecturerList = () => {
  const { data, error, loading } = useFetch(
    `${config.API_URL}/api/lecturers?populate=*&pagination[pageSize]=100`
  );

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPage = parseInt(localStorage.getItem("currentPage"), 10);
      if (!isNaN(savedPage) && savedPage > 0) {
        setCurrentPage(savedPage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPage", currentPage);
    }
  }, [currentPage]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  const sortedData = data?.data?.slice().sort((a, b) => {
    const indexA = a.attributes.index ?? Number.MAX_VALUE;
    const indexB = b.attributes.index ?? Number.MAX_VALUE;
    return indexA - indexB;
  });

  if (!sortedData || sortedData.length === 0) {
    return <div className="text-center">Không có dữ liệu giảng viên.</div>;
  }

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const itemsToDisplay = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="lecturer-list">
      <div className="container pt-5 mt-5">
        <h1 className="text-center mt-2 mb-4 text-primary fw-bolder">
          Giảng viên - cán bộ
        </h1>

        <div className="row">
          {itemsToDisplay.map((lecturer) => (
            <div key={lecturer.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card bg-light h-100 text-center">
                <Link href={`/giang-vien/${lecturer.attributes.slug}`}>
                  <div className="event-image-container">
                    <img
                      className="event-image"
                      src={`${config.API_URL}${lecturer.attributes.avatarNew?.data?.attributes?.url || "/default-avatar.jpg"}`}
                      alt={lecturer.attributes.displayName}
                      style={{ cursor: "pointer", width: "100%", aspectRatio: "3 / 4" }}
                    />
                  </div>
                </Link>
                <Link href={`/giang-vien/${lecturer.attributes.slug}`} className="lecturer-name-link">
                  <div className="card-body">
                    <h2 className="text-truncate name-lecturer fw-bolder fs-5">{lecturer.attributes.displayName}</h2>
                    <h3 className="text-dark position fs-6 px-3">{lecturer.attributes.position || "Chưa cập nhật"}</h3>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handleClick(currentPage - 1)}>
                <i className="fa fa-chevron-left"></i>
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                <button className="page-link" onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handleClick(currentPage + 1)}>
                <i className="fa fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LecturerList;
