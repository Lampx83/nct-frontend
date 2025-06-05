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
      <div style={{marginTop: "120px", width:"85%", marginLeft:"auto", marginRight:"auto"}}>
        <div className="row">
          <div className="col-lg-8 mx-auto " >
            <div
              className="cover"
              style={{
                backgroundPosition: "left",
                fontFamily: "Roboto sans-serif !important",
              }}
            >
              <div className="mask d-flex align-items-end">
                <div className="container text-left text-black">
                  <h2 className="display-7 text-black  ">{dataDetail?.title || "Tin tức"}</h2>
                  <div className="text-black fw-bold mt-3 d-flex align-items-center">
                    <span className=" d-flex align-items-center">
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
            <hr style={{ borderBottom: "2px solid gray", width: "100%", margin: "10px auto" }} />
            <div className="content-wrapper p-3">
              <div className="text-dark" dangerouslySetInnerHTML={{ __html: dataDetail?.content || "Không có nội dung" }}></div>
            </div>
          </div>
          <div className="col-lg-4 mx-auto" >
            <h4 className="text-dark fw-bold text-center">TIN TỨC KHÁC</h4>
            {newsData?.[0] && (
              <div className="card m-3">
                <Link href={`/post/${newsData[0].attributes.slug}`}>
                  <img
                    src={
                      newsData[0].attributes.thumbnail?.data?.attributes?.url
                        ? `${API_URL}${newsData[0].attributes.thumbnail.data.attributes.url}`
                        : `https://source.unsplash.com/random/400x300`
                    }
                    alt={newsData[0].attributes.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body  d-flex flex-column">
                  <Link href={`/post/${newsData[0].attributes.slug}`}>
                    <h5 className="card-title">{newsData[0].attributes.title}</h5>
                  </Link>
                </div>
              </div>
            )}

            {newsData?.slice(1).map((news, index) => (
              <div key={index} className="card shadow-sm border-1 m-3">
                  <div className="row g-0 align-items-center pt-2 px-3">
                    <div className="col-8">
                      <Link href={`/post/${news.attributes.slug}`} className="text-decoration-none">
                        <p className="m-2 text-dark fw-bold" style={{textAlign:"justify"}}>{news.attributes.title}</p>
                      </Link>
                    </div>

                    <div className="col-4 p-1">
                      <Link href={`/post/${news.attributes.slug}`}>
                        <img
                          src={`${API_URL}${news.attributes.thumbnail.data.attributes.url}`}
                          alt={news.attributes.title}
                          style={{ objectFit: "cover", height: "60px", width: "100%" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
  );
};

export default NewsDetails;
