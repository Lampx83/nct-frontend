"use client"
import React, { useState, useEffect } from "react";
import moment from "moment";
import config from "../../utils/config";
import Spinner from "../../containers/Spinner";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import { processYouTubeEmbeds } from "../../utils/embedYoutube";
import Link from "next/link";

const styles = `
  #post-content img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  .previous-news img {
    object-fit: cover;
    width: 100%;
    height: 150px; 
  }
  .previous-news .card-title {
    font-size: 1rem;
    line-height: 1.2;
    height: 3.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .previous-news .card-text {
    font-size: 0.8rem;
  }
  #post-content {
    font-size: 1.1rem;  
    font-weight: 500;  
    line-height: 1.6;   
  }

  #post-content p {
    margin-bottom: 1.2em; 
  }

  #post-content strong, 
  #post-content b {
    font-weight: 600;  
  }
`;

const NewsDetails = ({ newsData, previousNews, categories }) => {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams();

  // useEffect(() => {
  //   // Fetch current news by slug
  //   fetch(`${config.API_URL}/api/blogs/slug/${slug}?populate=*`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const processedContent = processYouTubeEmbeds(
  //         res.data.attributes.content
  //       );
  //       setNewsData({ ...res.data.attributes, content: processedContent });
  //       document.title = `${res.data.attributes.title}`;
  //       setSeoData(res.data.attributes.seo);

  //       // Fetch recent news in the same category
  //       const categorySlug = res.data.attributes.blog_category.data.attributes.slug;
  //       fetch(`${config.API_URL}/api/blogs?populate=*&filters[blog_category][slug]=${categorySlug}&pagination[start]=0&pagination[limit]=4&sort=createdAt:desc`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           // Lọc ra tin tức đang xem
  //           const filteredNews = res.data.filter(news => news.attributes.slug !== slug);
  //           setPreviousNews(filteredNews);
  //         })
  //         .catch((err) => {
  //           setError("Failed to fetch recent news in the same category");
  //         });
  //     })
  //     .catch((err) => {
  //       setError("Failed to fetch news");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   // Fetch all categories with post counts
  //   fetch(`${config.API_URL}/api/blog-categories?populate=blogs`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setCategories(res.data);
  //     })
  //     .catch((err) => {
  //       setError("Failed to fetch categories");
  //     });
  // }, []);

  // Thêm hàm xử lý nội dung để chuyển oembed thành iframe
  // const processContent = (content) => {
  //   if (!content) return '';

  //   // Tạo một DOM parser
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, 'text/html');

  //   // Tìm tất cả thẻ oembed
  //   const oembeds = doc.getElementsByTagName('oembed');

  //   // Chuyển đổi NodeList thành Array để dễ xử lý
  //   Array.from(oembeds).forEach(oembed => {
  //     const youtubeUrl = oembed.getAttribute('url');
  //     if (youtubeUrl && youtubeUrl.includes('youtube.com/watch?v=')) {
  //       // Lấy video ID từ URL
  //       const videoId = youtubeUrl.split('v=')[1].split('&')[0];

  //       // Tạo iframe element
  //       const iframe = doc.createElement('iframe');
  //       iframe.src = `https://www.youtube.com/embed/${videoId}`;
  //       iframe.width = '100%';
  //       iframe.height = '500';
  //       iframe.frameBorder = '0';
  //       iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  //       iframe.allowFullscreen = true;

  //       // Thay thế oembed bằng iframe
  //       oembed.parentNode.replaceChild(iframe, oembed);
  //     }
  //   });

  //   return doc.body.innerHTML;
  // };

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <style>{styles}</style>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${config.API_URL + newsData?.thumbnail?.data.attributes.url
            })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "50vh",
          backgroundPositionY: "center",
        }}
      >
        <div
          className="mask d-flex align-items-end"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", height: "100%" }}
        >
          <div className="d-flex align-items-end h-100">
            <div className="title-news m-5">
              <h1 className="px-5 text-white">{newsData.title}</h1>
              <span className="text-body-secondary text-white fs-5" style={{ padding: "3rem 1.5rem 3rem 3rem" }}>
                <i className="fa-regular fa-clock text-light"></i>
                <span className="text-light" style={{ paddingLeft: "10px" }}>
                  {moment(newsData.createdAt).format(
                    "DD [tháng] MM YYYY, HH:mm"
                  )}
                </span>
              </span>
              <span className="text-body-secondary text-white fs-5">
                <Link
                  href={`/news/category/${newsData.blog_category.data.attributes.slug}`}
                  className="btn btn-primary"
                >
                  {newsData.blog_category.data.attributes.title}
                </Link>
              </span>
              <p className="text-body-secondary text-light fs-5 px-5">
                <Link
                  href={`/news/author/${slugify(
                    `${newsData?.createdBy?.data?.attributes?.firstname} ${newsData?.createdBy?.data?.attributes?.lastname} ${newsData?.createdBy?.data?.id}`,
                    {
                      lower: true,
                      locale: "vi",
                    }
                  )}`}
                  style={{ color: "white" }}
                >
                  {`${newsData?.createdBy?.data?.attributes?.firstname || ""} ${newsData?.createdBy?.data?.attributes?.lastname || ""
                    }`}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="sidebar-page dt-section">
        <div className="container my-5">
          <div className="row s-25">
            <div className="col-lg-9 col-12 pr-lg-5" id="post-content">
              <div dangerouslySetInnerHTML={{ __html: newsData.content }}></div>
            </div>

            <div className="sidebar-block col-lg-3 col-12">
              <div className="previous-news mb-5">
                <h2>Tin cùng chuyên mục</h2>
                <hr className="my-4" />
                <div className="container mt-3">
                  <div className="row" id="previous-news">
                    {previousNews?.map((news, index) => (
                      <div
                        key={index}
                        className="card border-0 mb-3 px-2 col-lg-12 col-md-3"
                      >
                        <div className="ratio ratio-16x9">
                          <a href={`/post/${news.attributes.slug}`}>
                            <img
                              className="card-img-top img-fluid rounded-0"
                              src={
                                config.API_URL +
                                news?.attributes?.thumbnail?.data.attributes
                                  .formats?.thumbnail.url
                              }
                              alt={news.attributes.title}
                            />
                          </a>
                        </div>
                        <div className="card-body px-0">
                          <a href={`/post/${news.attributes.slug}`}>
                            <h6 className="card-title">
                              {news.attributes.title}
                            </h6>
                          </a>
                          <p className="card-text">
                            <small className="text-muted">
                              {moment(news.attributes.createdAt).format(
                                "DD [tháng] MM YYYY, HH:mm"
                              )}
                            </small>
                            <br />
                            <small>
                              <Link
                                href={`/news/author/${slugify(
                                  `${news?.attributes?.createdBy?.data?.attributes?.firstname} ${news?.attributes?.createdBy?.data?.attributes?.lastname} ${news?.attributes?.createdBy?.data?.id}`,
                                  {
                                    lower: true,
                                    locale: "vi",
                                  }
                                )}`}
                              >
                                {`${news?.attributes?.createdBy?.data?.attributes
                                  ?.firstname || ""
                                  } ${news?.attributes?.createdBy?.data?.attributes
                                    ?.lastname || ""
                                  }`}
                              </Link>
                            </small>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="categories">
                <h2 className="fs-1">Phân loại</h2>
                <hr className="my-4" />
                {categories.map((category, index) => (
                  <h6 key={index}>
                    <Link href={`/news/category/${category.attributes.slug}`}>
                      {category.attributes.title}
                    </Link>{" "}
                    ({category.attributes.blogs.data.length})
                  </h6>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;
