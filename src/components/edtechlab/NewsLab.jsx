import React, { useEffect, useState } from "react";
import config from "../../utils/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/news.css";
import useFetch from "../../utils/fetch";
import Link from 'next/link';
import Spinner from "../../containers/Spinner";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const NewsLab = () => {
  // Fetch dung hook
  const {
    data: newsData,
    error,
    loading,
  } = useFetch(`${config.API_URL}/api/blogs`, {
    populate: "*",
    pagination: { start: 0, limit: 3, withCount: true },
    sort: "createdAt:desc",
    filters: {
      blog_category: {
        id: 13,
      },
    },
  });

  moment.locale('vi');

  if (loading) return <Spinner />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const sortedSlides = newsData?.data
    .map((item) => ({
      date: new Date(item.attributes.createdAt),
      img: item.attributes.thumbnail?.data
        ? config.API_URL + item.attributes.thumbnail.data.attributes.url
        : 'https://fit.neu.edu.vn/admin/uploads/Logo_FIT_fb23bcef29.png',
      title: item.attributes.title,
      description: item.attributes.description,
      slug: item.attributes.slug,
      pin: item.attributes.pin,
    }))
    .sort((a, b) => (a.pin === b.pin ? 0 : a.pin ? -1 : 1));

  const sortedNews = newsData?.data.sort((a, b) =>
    a.attributes.pin === b.attributes.pin ? 0 : a.attributes.pin ? -1 : 1
  );

  const news = newsData?.data;

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 position-relative" style={{ zIndex: 1 }}>
          <div
            className="col-lg-6 pt-4 flex-column wow fadeInLeft"
            style={{ minHeight: "100%" }}
            data-wow-delay="0.2s"
          >
            <div
              id="newsCarousel"
              className="carousel slide carousel-fade h-100"
              data-bs-ride="carousel"
            >
              <div
                className="carousel-inner h-100 position-relative"
                style={{ zIndex: 1 }}
              >
                {sortedSlides.map((slide, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      src={slide.img}
                      className="d-block w-100 h-100"
                      alt={slide.title}
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="position-absolute text-white p-2 rounded-0"
                      style={{
                        top: "0px",
                        right: "0px",
                        zIndex: "10",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        overflow: "visible",
                      }}
                    >
                      <h1 className="display-6 text-white m-0 text-center fw-bold">
                        {slide.date.getDate()}
                      </h1>
                      <h4 className="text-white text-center m-0">
                        Thg{slide.date.getMonth() + 1}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6 d-flex flex-column">
            <h4 className=" text-uppercase fs-3 text-primary">
              Tin tức &amp; Sự kiện
            </h4>
            <div className="row mt-1 g-4">
              {sortedNews.map((item, index) => (
                <div className="col-12 wow fadeInRight blog" key={index}>
                  <div className="d-flex">
                    <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center thumbnail-container">
                      <img
                        className="blog-thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={
                          item.attributes.thumbnail?.data
                            ? config.API_URL + item.attributes.thumbnail.data.attributes.url
                            : 'https://fit.neu.edu.vn/admin/uploads/Logo_FIT_fb23bcef29.png'
                        }
                        alt={item.attributes.title}
                      />
                    </div>
                    <div className="news-meta-info">
                      {item.attributes.pin && (
                        <span className="news-pin" style={{
                          position: 'absolute',
                          top: "90px",
                          left: "40px",
                          transform: "rotate(-45deg) skew(-10deg, 0)",
                        }}>
                          <FontAwesomeIcon icon={faThumbtack} color="black" size="2xl" />
                        </span>
                      )}
                    </div>
                    <div className="ps-3">
                      <h5>
                        <a
                          style={{ color: "#016dd3", textDecoration: "none" }}
                          href={`post/${item.attributes.slug}`}
                          className="news-title"
                        >
                          {item.attributes.title}
                        </a>
                      </h5>
                      <p className="blog-sub-title">
                        {item.attributes.description && (
                          item.attributes.description.length > 100
                            ? `${item.attributes.description.slice(0, 100)}...`
                            : item.attributes.description
                        )}
                      </p>
                      <p className="text-muted">
                        {moment(item.attributes.eventDate || item.attributes.createdAt).format("DD [tháng] MM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                href="/news/category/edtech-innovation-lab-phong-thi-nghiem-phat-trien-va-doi-moi-cong-nghe-giao-duc-fit-nct-neu"
                className="btn btn-primary py-3 px-5 wow fadeInRight rounded-0 bg-primary"
                data-wow-delay="0.4s"
              >
                Tin tức khác
                <i className="fa fa-arrow-right ms-3 me-3"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLab;
