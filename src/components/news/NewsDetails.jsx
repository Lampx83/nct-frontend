"use client";
import Link from "next/link";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";

const API_URL = "https://nct-frontend-liard.vercel.app";

const NewsDetails = ({ newsData }) => {
  const { slug } = useParams();

  return (
    <div>
      <div
        className="cover"
        style={{
          backgroundImage: `url(${newsData?.thumbnail?.data?.attributes?.url ? API_URL + newsData.thumbnail.data.attributes.url : "/images/background-2.png"})`,
          height: "40vh",
          maxHeight: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="mask d-flex align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.2)", height: "100%" }}
        >
          <div className="container text-center text-white">
            <h2 className="display-7 text-light">{newsData?.title || "Tin tức"}</h2>
            <p className="text-light mt-3">
              <i className="fa-regular fa-clock"></i> {moment(newsData?.attributes?.evenDate).format("DD [tháng] MM YYYY, HH:mm")}
            </p>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div dangerouslySetInnerHTML={{ __html: newsData?.content || "Không có nội dung" }}></div>
      </div>
    </div>
  );
};

export default NewsDetails;
