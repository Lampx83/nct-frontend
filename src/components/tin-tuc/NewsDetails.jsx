"use client";
import Link from "next/link";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";
import "../../css/NewsDetail.css"

const API_URL = "https://nct-frontend-liard.vercel.app/admin";



const NewsDetails = ({ newsData, dataDetail }) => {
  console.log(newsData);

  return (
    <div>
      <div
        className="cover"
        style={{
          height: "250px",
          backgroundPosition: "left",
          fontFamily: "Roboto sans-serif !important",
          marginTop: "50px",
        }}
      >
        <div
          className="mask d-flex align-items-end"
          style={{ height: "100%", padding: "20px" }}
        >
          <div className="container text-left text-black">
            <h2 className="display-7 text-black  my-4 ">{dataDetail?.title || "Tin tức"}</h2>
            <div className="text-black fw-bold mt-3 d-flex align-items-center">
              <span className="m-1 d-flex align-items-center">
                <i className="far fa-user-circle" style={{ fontSize: "18px" }}></i>
                <span className="ms-2">{dataDetail.createdBy.data.attributes.firstname}</span>
                <span className="ms-1">{dataDetail.createdBy.data.attributes.lastname}</span>
              </span>
              <span style={{ borderLeft: "2px solid gray", height: "24px" }} className="mx-2"></span>
              <span>
                {dataDetail.blog_category.data.attributes.title}
              </span>
            </div>

            <span className="d-flex align-items-center fw-bold">
              <i className="far fa-clock" style={{ fontSize: "18px" }}></i>
              <span className="ms-2 p-1">
                {moment(dataDetail.eventDate || newsData.createdAt).format("DD/MM/YYYY")}
              </span>
            </span>

          </div>
        </div>
      </div>
      <hr style={{ borderBottom: "2px solid gray", width: "85%", margin: "10px auto" }} />


      <div className="container">
        <div className="row">
          <div className="col-lg-9 mx-auto">
            <div className="content-wrapper p-3">
              <div className="text-dark" dangerouslySetInnerHTML={{ __html: dataDetail?.content || "Không có nội dung" }}></div>
            </div>
          </div>
          <div className="col-lg-3 mx-auto">
            <h3 className="text-dark text-center">Tin tức khác</h3>
            {newsData?.map((news, index) => (
              <div key={index}>
                <div className="card h-100 m-3">
                  <Link href={`/post/${news.attributes.slug}`}>
                    <img
                      src={
                        news.attributes.thumbnail?.data?.attributes?.url
                          ? `${API_URL}${news.attributes.thumbnail.data.attributes.url}`
                          : `https://source.unsplash.com/random/400x300`
                      }
                      alt={news.attributes.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <Link href={`/post/${news.attributes.slug}`}>
                      <h5 className="card-title">{news.attributes.title}</h5>
                    </Link>
                    {news.attributes.description && (
                      <p className="card-text text-muted">
                        {news.attributes.description.length > 100
                          ? news.attributes.description.substring(0, 95) + " [...]"
                          : news.attributes.description}
                      </p>
                    )}
                    <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="/images/LogoNCT.png"
                          alt="Editor Icon"
                          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                        />
                        <small className="text-muted">
                          {news.attributes.createdBy.data.attributes.firstname}{" "}
                          {news.attributes.createdBy.data.attributes.lastname}
                        </small>
                      </div>
                      <small className="text-muted">
                        {moment(news.attributes.eventDate || news.attributes.createdAt).format("DD/MM/YYYY")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>


  );
};

export default NewsDetails;
