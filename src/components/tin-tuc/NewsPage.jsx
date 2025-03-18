"use client";
import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import config from "../../utils/config";
import Spinner from "../../containers/Spinner";
import Link from "next/link";
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
} from "react-instantsearch-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "@/css/newsPage.css";
import slugify from "slugify";
import { useRouter } from "next/navigation";

const Hit = ({ hit }) => (
  <div className="hit-item">
    <Link href={`/post/${hit.slug}`} className="hit-link">
      <div className="hit-title">{hit.title}</div>
      <small className="hit-date">
        {moment(hit.createdAt).format("DD [tháng] MM YYYY, HH:mm")}
      </small>
    </Link>
  </div>
);

const NewsPage = ({
  categoryTitle,
  authorName,
  categories,
  recentNews,
  totalPages,
  page,
  slug,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage > 0 && newPage <= totalPages) {
      if (authorName) router.push(`/news/author/${slug}?page=${newPage}`);
      else if (categoryTitle) {
        router.push(`/news/category/${slug}?page=${newPage}`);
      } else {
        router.push(`/news?page=${newPage}`);
      }
    }
  };
  useEffect(() => {
    document.title = `${
      categoryTitle ||
      (authorName ? `Đăng tải bởi ${authorName}` : null) ||
      "Tin tức"
    } | Khoa Công nghệ thông tin`;
  }, [categoryTitle, authorName]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setLoading(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setLoading(false);
    }, 3000);

    // Cleanup the timer when the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Memoize the debouncedQuery to prevent unnecessary re-fetches
  const stableQuery = useMemo(() => debouncedQuery, [debouncedQuery]);

  // if (initialLoading) return <Spinner />;
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  return (
    <div>
      <div
        className="cover"
        style={{
          backgroundImage: `url(/images/background-${randomNumber}.png)`,
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
            <h2 className="display-3 text-light">
              {authorName
                ? authorName
                : categoryTitle
                ? categoryTitle
                : "Tin tức"}
            </h2>
            {slug && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="breadcrumb-item">
                  <a
                    style={{ textDecoration: "underline", color: "#cccfd3" }}
                    href="/"
                  >
                    Trang chủ
                  </a>
                </div>
                <div className="mx-2" style={{ color: "#cccfd3" }}>
                  /
                </div>
                <div
                  className="breadcrumb-item"
                  style={{ color: "#cccfd3" }}
                  aria-current="page"
                >
                  <a
                    style={{ textDecoration: "underline", color: "#cccfd3" }}
                    href="/news"
                  >
                    Tin tức
                  </a>
                </div>
                <>
                  <div className="mx-2" style={{ color: "#cccfd3" }}>
                    /
                  </div>
                  <div
                    className="breadcrumb-item"
                    style={{ color: "#cccfd3" }}
                    aria-current="page"
                  >
                    {authorName
                      ? authorName
                      : categoryTitle
                      ? categoryTitle
                      : "Tin tức"}
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="sidebar-page container my-5">
        <div className="row s-25">
          <div className="col-lg-8 col-12">
            <h2 className="fs-1">
              {categoryTitle ||
                (authorName ? `Người đăng: ${authorName}` : null) ||
                "Tin mới cập nhật"}
            </h2>
            <hr className="my-4" />
            {/* <InstantSearch searchClient={searchClient(slug)} indexName='blog'>
              <Configure hitsPerPage={5} />
              <div className="search-container">
                <SearchBox
                  onSubmit={handleSearchSubmit}
                  onChange={handleInputChange}
                  query={stableQuery} // Use memoized query
                />

                {loading ? (
                  <div className="loading-modal">Loading results...</div>
                ) : (
                  stableQuery && (
                    <div className="hits-modal">
                      <Hits hitComponent={Hit} />
                    </div>
                  )
                )}
              </div>
            </InstantSearch> */}

            {recentNews?.length === 0 ? (
              <p>Chưa có tin tức thuộc phân loại này.</p>
            ) : (
              <>
                {recentNews?.map((news, index) => (
                  <div
                    key={index}
                    className="card mt-5 mb-5 border-0 rounded wow fadeInUp news-item"
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <Link href={`/post/${news.attributes.slug}`}>
                          <img
                            src={`${
                              config.API_URL +
                              news.attributes.thumbnail.data.attributes.url
                            }`}
                            className="img-fluid h-100 w-100 card-img-horizontal"
                            alt={news.attributes.title}
                          />
                        </Link>
                        {news.attributes.pin && (
                          <span
                            className="news-pin"
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              transform: "rotate(-45deg) skew(-10deg, 0)",
                              zIndex: 1,
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faThumbtack}
                              color="black"
                              size="lg"
                            />
                          </span>
                        )}
                      </div>
                      <div className="col-md-8 d-flex align-items-center">
                        <div className="card-body">
                          <Link href={`/post/${news.attributes.slug}`}>
                            <h5 className="card-title">
                              {news.attributes.title}
                            </h5>
                          </Link>
                          {news.attributes.description && (
                            <p className="card-text">
                              {news.attributes.description}
                            </p>
                          )}

                          <p className="card-text">
                            <small className="text-muted">
                              {moment(
                                news.attributes.eventDate ||
                                  news.attributes.createdAt
                              ).format("DD [tháng] MM YYYY, HH:mm")}
                            </small>
                            <br />
                            <small className="text-muted">
                              <Link
                                href={`/news/author/${slugify(
                                  `${news?.attributes?.createdBy?.data?.attributes?.firstname} ${news?.attributes?.createdBy?.data?.attributes?.lastname} ${news?.attributes?.createdBy?.data?.id}`,
                                  { lower: true, locale: "vi" }
                                )}`}
                              >
                                {`${
                                  news?.attributes?.createdBy?.data?.attributes
                                    ?.firstname || ""
                                } ${
                                  news?.attributes?.createdBy?.data?.attributes
                                    ?.lastname || ""
                                }`}
                              </Link>
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {totalPages > 1 && (
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      {page > 1 && (
                        <li className="page-item">
                          <button
                            className="page-link"
                            aria-label="Previous"
                            onClick={() => handlePageChange(page - 1)}
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            page === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      {page < totalPages && (
                        <li className="page-item">
                          <button
                            className="page-link"
                            aria-label="Next"
                            onClick={() => handlePageChange(page + 1)}
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>

          <div className="col-lg-4 col-12">
            <div className="categories mb-5">
              <h2 className="fs-1">Phân loại</h2>
              <hr className="my-4" />
              {categories?.map((category, index) => (
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
      </section>
    </div>
  );
};

export default NewsPage;
