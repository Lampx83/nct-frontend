"use client";
import Link from "next/link";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";

const API_URL = "https://nct-frontend-liard.vercel.app/admin";

const styles = `
figure.table {
  height: auto !important;
  width: 100% !important; /* hoặc giữ 98.99% nếu bạn muốn */
}

      figure.image {
          text-align: center;
      }
           .content-wrapper {
          margin: 0 auto;
        }
        .content-wrapper p {
          text-align: justify;
          font-family: "Roboto", sans-serif;
          line-height: 1.6;
        }

      figure.image img {
          width: 50%;
          height: auto;
          display: block;
          margin: 0 auto;
      }
      figure.image_resized {
    margin: 0 auto; 
     }
      figure.image figcaption {
       background-color: rgba(0, 0, 0, 0.05); /* Màu nền nhẹ */
        font-style: italic; 
        text-align: center; 
        padding: 8px 12px; /* Tạo khoảng cách */
        width: 50%; 
        margin:auto; /* Căn giữa figcaption */ }
      figure.image figcaption span {
     background-color: transparent !important; }
`;

const NewsDetails = ({ newsData }) => {
  console.log(newsData);
  console.log(newsData.createdBy.data.attributes.lastname);
  return (
    <div>
      <style>{styles}</style>
      <div
        className="cover"
        style={{
          background: "#223042",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "Roboto sans-serif !important",

        }}
      >
        <div
          className="mask d-flex align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "100%" }}
        >
          <div className="container text-center text-white">
            <h2 className="display-7 text-light my-4 ">{newsData?.title || "Tin tức"}</h2>
            <hr style={{ borderBottom: "2px solid gray", width: "50px", margin: "10px auto" }} />
            <p className="text-light mt-3">
              <span className="me-1">
                <i className="far fa-user-circle" style={{ fontSize: "18px" }}></i>
                <span className="ms-2">{newsData.createdBy.data.attributes.firstname}</span>
                <span className="ms-1">{newsData.createdBy.data.attributes.lastname}</span>
              </span>
              <span className="ms-1">
                <i className="far fa-clock" style={{ fontSize: "18px" }}></i>
                <span className="ms-2">
                  {moment(newsData.eventDate || newsData.createdAt).format("DD/MM/YYYY")}
                </span>
              </span>
            </p>

          </div>
        </div>
      </div>
      <div className="container p-3">
        <div className="content-wrapper">
          <div dangerouslySetInnerHTML={{ __html: newsData?.content || "Không có nội dung" }}></div>
        </div>
      </div>
    </div>


  );
};

export default NewsDetails;
