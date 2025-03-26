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
    <div className="lecturer-info container mt-5 pt-3">
      <div className="row mt-2 mb-5 mt-5 pt-3">
        <div className="col-3 col-lg-4 col-md-12 col-xs-12">
          <div className="row h-100 w-100 d-flex justify-content-center ">
              <div className="col-12">
                <img
                  style={{ objectFit: "cover" }}
                  className="img-lecture mb-3 align-self-center"
                  src={avatarUrl}
                  alt={displayName}
                />
                <p className="m-0 py-1 text-dark"><i class="fa-solid fa-award fa-lg"></i><b> Chức vụ: </b>{position}</p>
                <p className="m-0 py-1 text-dark"><i class="fa-solid fa-phone"></i><b> Số điện thoại: </b>{phone}</p>
                <p className="m-0 py-1 text-dark"><i class="fa-solid fa-envelope"></i><b> Email: </b>{email}</p>
              </div>
          </div>
        </div>
        <div className="col-9 col-lg-8 col-md-12 col-xs-12">
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
