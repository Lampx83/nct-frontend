"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../utils/config";
import "../css/lecturerInfo.css";
import Spinner from "../containers/Spinner";
const LecturerInfo = ({ lecturer, slug }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchLecturer = async () => {
  //     try {
  //       // Update the URL to use a filter for slug
  //       const response = await fetch(
  //         `${config.API_URL}/api/lecturers?filters[slug][$eq]=${slug}&populate=*`
  //       );
  //       const data = await response.json();

  //       // Check if any data was returned
  //       if (data.data && data.data.length > 0) {
  //         setLecturer(data.data[0]);
  //       } else {
  //         setLecturer(null);
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLecturer();
  // }, [slug]);

  // if (loading) return <Spinner />;
  // if (error) return <div>Error: {error}</div>;
  if (!lecturer) return <div>No Lecturer found</div>;

  const displayName = lecturer.attributes.displayName;
  const position = lecturer.attributes.position;
  const introduction = lecturer.attributes.introduction;
  const phone = lecturer.attributes.phone;
  const email = lecturer.attributes.email;
  const additionalInfo = lecturer.attributes.additionalInfo;
  const avatarUrl = `${config.API_URL}${lecturer.attributes.avatarNew.data.attributes.url}`;

  document.title = `${lecturer.attributes.displayName} | Khoa Công nghệ thông tin`;

  return (
    <div className="lecturer-info container">
      <div className="row mt-2 mb-5">
        <div className="col-lg-5 col-md-6 col-12 mt-4 pt-3">
          <div className="h-100 w-100 d-flex justify-content-center align-items-center overflow-hidden">
            <img
              style={{ height: "500px", objectFit: "cover" }}
              className="img-lecture"
              src={avatarUrl}
              alt={displayName}
            />
          </div>
        </div>
        <div className="col-lg-7 col-md-6 col-12 mt-4 pt-3">
          <div className="info-lecturer_name-content">
            <h1 className="mb-4 fw-bold">
              <span className="custom-h3">{displayName}</span>
            </h1>
            <h3 className="mb-4 fw-bold" style={{ fontWeight: "bolder" }}>
              <span className="custom-h3">GIỚI THIỆU</span>
            </h3>
          </div>
          <div className="info-lecturer_content" style={{ fontSize: "18px" }}>
            <p>
              {position} Khoa Công nghệ thông tin, Trường Công nghệ, Đại học
              Kinh tế quốc dân
            </p>
            <div dangerouslySetInnerHTML={{ __html: introduction }}></div>
            <p>{`Số điện thoại: ${phone}`}</p>
            <p>{`Email: ${email}`}</p>
          </div>
        </div>
      </div>
      <div className="row mx-md-4 mt-2">
        <div className="col-12">
          <div style={{ fontSize: "18px" }}>
            <div
              className="custom-h3 custom-list"
              dangerouslySetInnerHTML={{ __html: additionalInfo }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerInfo;
