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
  width: 70%;
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
          background: "#223042",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="mask d-flex align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.2)", height: "100%" }}
        >
          <div className="container text-center text-white">
            <h2 className="display-7 text-light my-4 ">{newsData?.title || "Tin tức"}</h2>
            <hr style={{ borderBottom: "2px solid gray", width: "50px", margin: "10px auto" }}/>
            <p className="text-light mt-3">
              Tác giả Editor NST đăng vào {moment(newsData.eventDate || newsData.createdAt).format("DD/MM/YYYY")}
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
