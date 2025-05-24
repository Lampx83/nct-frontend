"use client";
import Link from "next/link";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";
import "../../css/NewsDetail.css"

const API_URL = "https://nct-frontend-liard.vercel.app/admin";



const NewsDetails = ({ newsData }) => {

  return (
    <div>
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
          <div className="text-dark" dangerouslySetInnerHTML={{ __html: newsData?.content || "Không có nội dung" }}></div>
        </div>
      </div>
    </div>


  );
};

export default NewsDetails;
