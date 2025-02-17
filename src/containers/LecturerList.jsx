"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../utils/fetch";
import config from "../utils/config";
import "../css/lectureList.css";

const LecturerList = () => {
  //document.title = "Giảng viên - Cán bộ | Khoa Công nghệ thông tin";
  const { data, error, loading } = useFetch(
    `${config.API_URL}/api/lecturers?populate=*&pagination[pageSize]=100`
  );

  const itemsPerPage = 12;

  // Initialize the currentPage state with 1 or value from localStorage
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== "undefined") {
      const savedPage = parseInt(localStorage.getItem("currentPage"), 10) || 1;
      setCurrentPage(savedPage);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPage", currentPage); // Save current page to localStorage
    }
  }, [currentPage]);

  if (loading) return null;
  if (error) return <div>Error: {error.message}</div>;

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
    }
  };

  // Sắp xếp dữ liệu theo thứ tự index tăng dần
  const sortedData = data?.data?.slice().sort((a, b) => {
    const indexA = a.attributes.index;
    const indexB = b.attributes.index;

    if (indexA === null) return 1;
    if (indexB === null) return -1;
    return indexA - indexB;
  });

  const totalItems = sortedData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = sortedData?.slice(startIndex, endIndex);

  return (
    <div className="lecturer-list">
      <div className="container pt-5">
        <h1 className="text-center mb-5 text-primary bold">
          Giảng viên - cán bộ
        </h1>

        {/* Danh sách giảng viên */}
        <div className="row">
          {itemsToDisplay.map((lecturer) => (
            <div
              key={lecturer.id}
              className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 wow fadeIn mb-4"
            >
              <div className="card  bg-light h-100 text-center">
                <Link href={`/lecturer/${lecturer.attributes.slug}`}>
                 
                  <img
                    className="object-fit-cover"
                    src={`https://fit.neu.edu.vn/admin${lecturer.attributes.avatarNew.data.attributes.url}`}
                    alt={lecturer.attributes.displayName}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      aspectRatio: "3 / 4", // Tỷ lệ 4:3
                    }}
                  />
                </Link>
                <Link
                  href={`/lecturer/${lecturer.attributes.slug}`}
                  className="lecturer-name-link"
                >
                  <div className="card-body d-flex flex-column align-content-center">
                    <h2 className="text-truncate">{lecturer.attributes.displayName}</h2>
                    <h3 className="text-dark position">{lecturer.attributes.position}</h3>
                  </div>{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <nav>
          <ul className="pagination justify-content-center">
            {/* Nút trước */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleClick(currentPage - 1)}
                aria-label="Previous"
              >
                <i className="fa fa-chevron-left"></i>
              </button>
            </li>

            {/* Các số trang */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Nút sau */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handleClick(currentPage + 1)}
                aria-label="Next"
              >
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
