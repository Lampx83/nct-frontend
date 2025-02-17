import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../containers/Spinner";

function IntroLab() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get(
          "https://fit.neu.edu.vn/admin/api/edtech-lab?populate=deep"
        );
        const data = response.data.data.attributes.carousel;
        setCarouselItems(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Error loading carousel data.</p>;

  const strapiBaseURL = "https://fit.neu.edu.vn/admin"; // Base URL for Strapi

  return (
    <div
      id="carousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ maxHeight: "400px", height: "40vh" }}
    >
      <div className="carousel-indicators">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner" style={{ height: "100%" }}>
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{ height: "100%" }}
          >
            {/* Construct the full image URL by prepending the base URL */}
            <img
              className="w-100 carousel-img"
              src={`${strapiBaseURL}${item.background.data.attributes.url}`}
              alt={item.title}
            />
            <div className="carousel-caption d-flex align-items-center">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-start p-md-5">
                  <div className="col-10 col-lg-7 text-center text-lg-start">
                    <h5 className="fw-bold text-white text-uppercase mb-3 animated slideInDown">
                      {item.subTitle}
                    </h5>
                    <a href={item.url}>
                      <h1 className="display-3 fw-bold text-white mb-4 pb-3 animated slideInDown">
                        {item.title}
                      </h1>
                    </a>
                    {item.buttonText && (
                      <a
                        href={item.url}
                        className="btn btn-primary py-3 px-5 animated slideInDown rounded-0"
                      >
                        {item.buttonText}{" "}
                        <i className="fa fa-arrow-right ms-3"></i>
                      </a>
                    )}
                  </div>
                  {item.img?.data && (
                    <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                      <img
                        className="img-fluid"
                        src={`${strapiBaseURL}${item.img.data.attributes.url}`}
                        alt={item.title}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {carouselItems.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export default IntroLab;
