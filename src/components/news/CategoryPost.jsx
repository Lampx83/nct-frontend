import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import config from "../../utils/config";
import Spinner from '../../containers/Spinner';
import Link from 'next/link';
import newsThumbnail from '../../imgs/news-thumbnail.jpg';
import _ from "lodash";
import { InstantSearch, SearchBox, Configure } from "react-instantsearch-dom";
import { useNewsPage } from '../../utils/useNewsPage';

const CategoryPost = ({ searchClient }) => {
  const { slug } = useParams();  // Get category slug from the URL
  const {
    page,
    totalPages,
    recentNews,
    categories,
    handlePageChange,
    handleSearchSubmit,
    loading,
    error,
    categoryTitle
  } = useNewsPage(slug)

  useEffect(() => {
    document.title = `${categoryTitle || 'Category'} | Khoa Công nghệ thông tin`;
  }, [categoryTitle]);

  if (loading) return <Spinner />
  if (error) return <div>Error loading data: {error.message || 'Unknown error occurred'}</div>

  return (
    <div>
      <section className="banner" style={{ backgroundImage: `url(${newsThumbnail})`, height: '350px' }}>
        <div className="mask d-flex align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.2)', height: '100%' }}>
          <div className="container text-center text-white">
            <h2 className="display-3 text-light">Tin tức</h2>
            <div className="d-flex justify-content-center align-items-center">
              <div className="breadcrumb-item">
                <a style={{ textDecoration: "underline", color: '#cccfd3' }} href="/">Trang chủ</a>
              </div>
              <div className="mx-2" style={{ color: '#cccfd3' }}>/</div>
              <div className="breadcrumb-item" style={{ color: '#cccfd3' }} aria-current="page">Tin tức</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sidebar-page container my-5">
        <div className="row s-25">
          <div className="col-lg-8 col-12">
            <h2 className='fs-1'>{categoryTitle}</h2>
            <hr className="my-4" />
            <InstantSearch searchClient={searchClient} indexName="blog">
              <Configure hitsPerPage={5} />
              <SearchBox onSubmit={handleSearchSubmit} />
            </InstantSearch>
            {recentNews.length === 0 ? (
              <p>No news available for this category</p>
            ) : (
              recentNews.map((news, index) => (
                <div key={index} className="card mt-5 mb-5 border-0 rounded wow fadeInUp news-item">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <Link href={`/post/${news.attributes.slug}`}>
                        <img src={`${config.API_URL + news.attributes?.thumbnail?.data?.attributes?.url}`} className="img-fluid h-100 w-100 card-img-horizontal" alt={news.attributes.title} />
                      </Link>
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                      <div className="card-body">
                        <Link href={`/post/${news.attributes.slug}`}><h5 className="card-title">{news.attributes.title}</h5></Link>
                        <p className="card-text">{news.attributes.description}</p>
                        <p className="card-text"><small className="text-muted">{moment(news.attributes.eventDate || news.attributes.createdAt).format(
                          "DD [tháng] MM YYYY, HH:mm"
                        )}</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

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
                  <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
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
          </div>

          <div className="col-lg-4 col-12">
            <div className="categories mb-5">
              <h2 className='fs-1'>Phân loại</h2>
              <hr className="my-4" />
              {categories.map((category, index) => (
                <h6 key={index}> <Link href={`/news/category/${category.attributes.slug}`}>
                  {category.attributes.title}
                </Link> ({category.attributes.blogs.data.length})</h6>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPost;