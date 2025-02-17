"use client"
import React, { useState } from "react";
import useFetch from "../utils/fetch";
import config from "../utils/config";
import "../css/topstudentlist.css"; 
import Spinner from "../containers/Spinner";
import { BorderAll } from "@mui/icons-material";

const TopStudentList = () => {
  document.title = "Sinh Viên Tiêu Biểu | Khoa Công nghệ thông tin";

  const { data, error, loading } = useFetch(
    `${config.API_URL}/api/featured-students?populate=*`
  );
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  // Sắp xếp ngẫu nhiên dữ liệu
  const randomizedData = data?.data?.slice().sort(() => Math.random() - 0.5);

  const totalItems = randomizedData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = randomizedData?.slice(startIndex, endIndex);

  return (
    <div className="student-list">
      <div className="container container-md container-xl container-xxl py-5">
        <h1 className="text-center mb-5 text-primary bold">
          Sinh Viên Tiêu Biểu
        </h1>

        <div className="row">
          {itemsToDisplay.map((student) => (
            <div
              key={student.id}
              className="col-12 col-sm-12 col-md-4 col-lg-3 col-xxl-2 wow fadeInUp mb-4"
            >
              <div className="card h-100 text-center remove_boder">
                <div className="content-overlay"></div>
                <img
                  className="student-img border border-sv"
                  src={`https://fit.neu.edu.vn/admin${student.attributes.avatar.data.attributes.url}`}
                  alt={student.attributes.displayName}
                />
                <div className="mt-2">
                  <h5 className="student-name mt-2 mb-1">
                    {student.attributes.displayName}
                  </h5>
                  <p className="card-text mt-1" dangerouslySetInnerHTML={{ __html: student.attributes.introduction }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopStudentList;
