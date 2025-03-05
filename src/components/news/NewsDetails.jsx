"use client";
import Link from "next/link";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";

const API_URL = "https://nct-frontend-liard.vercel.app/admin";

const styles = `
  .image {
  display: flex; 
  justify-content: center;
  align-items: center;
}

.image img {
  max-width: 100%; /* Đảm bảo ảnh không vượt quá kích thước container */
  height:auto;
  width: 80%;
  border-radius: 8px; /* Bo góc ảnh */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng nhẹ */
}
`;

const NewsDetails = ({ newsData }) => {
console.log(newsData);
  return (
    <div>
      <style>{styles}</style>
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
        <div className="row s-25">
          <div className="col-lg-9 col-12 pr-lg-5" id="post-content">
            <div dangerouslySetInnerHTML={{ __html: newsData?.content || "Không có nội dung" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
