"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import GLightbox and Isotope only on the client-side
const GLightbox = dynamic(() => import("glightbox").then((mod) => mod.default), { ssr: false });
const Isotope = dynamic(() => import("isotope-layout"), { ssr: false });

export function Portfolio() {
  const [iso, setIso] = useState(null); // Isotope instance
  const [filterKey, setFilterKey] = useState("*");
  const [lightbox, setLightbox] = useState(null); // GLightbox instance

  // Initialize AOS, GLightbox, and Isotope on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load and initialize AOS
    import("aos").then((AOS) => {
      AOS.default.init();
    });

    // Initialize GLightbox
    const glightbox = new GLightbox({
      selector: ".glightbox",
    });
    setLightbox(glightbox);

    // Initialize Isotope after images are loaded
    import("imagesloaded").then((imagesLoaded) => {
      const grid = document.querySelector(".isotope-container");
      if (grid) {
        console.log("Grid found:", grid); // Debug: Kiểm tra grid
        imagesLoaded.default(grid, () => {
          console.log("Images loaded"); // Debug: Ảnh đã tải xong
          import("isotope-layout").then((IsotopeModule) => {
            const isotope = new IsotopeModule.default(grid, {
              itemSelector: ".portfolio-item",
              layoutMode: "masonry",
              sortBy: "original-order",
            });
            console.log("Isotope initialized:", isotope); // Debug: Kiểm tra instance
            setIso(isotope);
          });
        });
      } else {
        console.error("Grid not found!"); // Debug: Nếu không tìm thấy grid
      }
    });

    // Cleanup
    return () => {
      if (lightbox && typeof lightbox.destroy === "function") {
        lightbox.destroy();
      }
      if (iso && typeof iso.destroy === "function") {
        iso.destroy();
      }
    };
  }, []);

  // Handle filter change
  useEffect(() => {
    if (iso && typeof iso.arrange === "function") {
      console.log("Filtering with:", filterKey); // Debug: Kiểm tra filterKey
      iso.arrange({ filter: filterKey === "*" ? "*" : `.filter-${filterKey}` });
    } else {
      console.warn("Isotope not ready or invalid:", iso); // Debug: Nếu iso không hợp lệ
    }
  }, [filterKey, iso]);

  const handleFilterClick = (filter) => {
    console.log("Filter clicked:", filter); // Debug: Kiểm tra nút bấm
    setFilterKey(filter);
  };

  return (
    <section id="portfolio" className="portfolio section mt-3">
      {/* Section Title */}
        <h2 className="mb-2 fw-bold fs-2 text-center">Bộ Sưu Tập Ảnh</h2>
      {/* End Section Title */}

      <div className="container">
        <div
          className="isotope-layout"
          data-default-filter="*"
          data-layout="masonry"
          data-sort="original-order"
        >
          {/* Portfolio Filters */}
          <ul
            className="portfolio-filters isotope-filters"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <li
              onClick={() => handleFilterClick("*")}
              className={filterKey === "*" ? "filter-active" : ""}
            >
              Tất Cả
            </li>
            <li
              onClick={() => handleFilterClick("app")}
              className={filterKey === "app" ? "filter-active" : ""}
            >
              Sinh Viên
            </li>
            <li
              onClick={() => handleFilterClick("product")}
              className={filterKey === "product" ? "filter-active" : ""}
            >
              Giảng Viên
            </li>
            <li
              onClick={() => handleFilterClick("branding")}
              className={filterKey === "branding" ? "filter-active" : ""}
            >
              Nghiên Cứu
            </li>
            <li
              onClick={() => handleFilterClick("books")}
              className={filterKey === "books" ? "filter-active" : ""}
            >
              Sự Kiện
            </li>
          </ul>
          {/* End Portfolio Filters */}

          {/* Portfolio Items */}
          <div
            className="row gy-4 isotope-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <img
                  src="https://picsum.photos/400/300?random=1"
                  className="img-fluid"
                  alt="App 1"
                />
                <div className="portfolio-info">
                  <h4>App 1</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a
                    href="https://picsum.photos/400/300?random=1"
                    title="App 1"
                    data-gallery="portfolio-gallery-app"
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link href="/details" title="More Details" className="details-link">
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* End Portfolio Item */}

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <img
                  src="https://picsum.photos/400/300?random=2"
                  className="img-fluid"
                  alt="Product 1"
                />
                <div className="portfolio-info">
                  <h4>Product 1</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a
                    href="https://picsum.photos/400/300?random=2"
                    title="Product 1"
                    data-gallery="portfolio-gallery-product"
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link href="/details" title="More Details" className="details-link">
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* End Portfolio Item */}

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <img
                  src="https://picsum.photos/400/300?random=3"
                  className="img-fluid"
                  alt="Branding 1"
                />
                <div className="portfolio-info">
                  <h4>Branding 1</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a
                    href="https://picsum.photos/400/300?random=3"
                    title="Branding 1"
                    data-gallery="portfolio-gallery-branding"
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link href="/details" title="More Details" className="details-link">
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* End Portfolio Item */}

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <img
                  src="https://picsum.photos/400/300?random=4"
                  className="img-fluid"
                  alt="Books 1"
                />
                <div className="portfolio-info">
                  <h4>Books 1</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a
                    href="https://picsum.photos/400/300?random=4"
                    title="Books 1"
                    data-gallery="portfolio-gallery-book"
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link href="/details" title="More Details" className="details-link">
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* End Portfolio Item */}

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <img
                  src="https://picsum.photos/400/300?random=5"
                  className="img-fluid"
                  alt="App 2"
                />
                <div className="portfolio-info">
                  <h4>App 2</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a
                    href="https://picsum.photos/400/300?random=5"
                    title="App 2"
                    data-gallery="portfolio-gallery-app"
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link href="/details" title="More Details" className="details-link">
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* End Portfolio Item */}
          </div>
          {/* End Portfolio Container */}
        </div>
      </div>

      {/* CSS trực tiếp */}
      <style jsx>{`
        .portfolio .portfolio-filters {
          padding: 0;
          margin: 0 auto 20px auto;
          list-style: none;
          text-align: center;
        }

        .portfolio .portfolio-filters li {
          cursor: pointer;
          display: inline-block;
          padding: 0;
          font-size: 18px;
          font-weight: 500;
          margin: 0 10px;
          line-height: 1;
          margin-bottom: 5px;
          transition: all 0.3s ease-in-out;
        }

        .portfolio .portfolio-filters li:hover,
        .portfolio .portfolio-filters li.filter-active {
          color: #ff4a17; /* --accent-color */
        }

        .portfolio .portfolio-filters li:first-child {
          margin-left: 0;
        }

        .portfolio .portfolio-filters li:last-child {
          margin-right: 0;
        }

        @media (max-width: 575px) {
          .portfolio .portfolio-filters li {
            font-size: 14px;
            margin: 0 5px;
          }
        }

        .portfolio .portfolio-content {
          position: relative;
          overflow: hidden;
        }

        .portfolio .portfolio-content img {
          transition: 0.3s;
        }

        .portfolio .portfolio-content .portfolio-info {
          opacity: 0;
          position: absolute;
          inset: 0;
          z-index: 3;
          transition: all ease-in-out 0.3s;
          background: rgba(0, 0, 0, 0.6);
          padding: 15px;
        }

        .portfolio .portfolio-content .portfolio-info h4 {
          font-size: 14px;
          padding: 5px 10px;
          font-weight: 400;
          color: #ffffff;
          display: inline-block;
          background-color: #ff4a17; /* --accent-color */
        }

        .portfolio .portfolio-content .portfolio-info p {
          position: absolute;
          bottom: 10px;
          text-align: center;
          display: inline-block;
          left: 0;
          right: 0;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .portfolio .portfolio-content .portfolio-info .preview-link,
        .portfolio .portfolio-content .portfolio-info .details-link {
          position: absolute;
          left: calc(50% - 40px);
          font-size: 26px;
          top: calc(50% - 14px);
          color: #fff;
          transition: 0.3s;
          line-height: 1.2;
        }

        .portfolio .portfolio-content .portfolio-info .preview-link:hover,
        .portfolio .portfolio-content .portfolio-info .details-link:hover {
          color: #ff4a17; /* --accent-color */
        }

        .portfolio .portfolio-content .portfolio-info .details-link {
          left: 50%;
          font-size: 34px;
          line-height: 0;
        }

        .portfolio .portfolio-content:hover .portfolio-info {
          opacity: 1;
        }

        .portfolio .portfolio-content:hover img {
          transform: scale(1.1);
        }

        /* Section Title */
        .section-title {
          position: relative;
        }

        .section-title h2 {
          font-size: 14px;
          font-weight: 500;
          padding: 0;
          line-height: 1px;
          margin: 0;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(68, 68, 68, 0.5); /* color-mix approximation */
          position: relative;
        }

        .section-title h2::after {
          content: "";
          width: 120px;
          height: 1px;
          display: inline-block;
          background: #ff4a17; /* --accent-color */
          margin: 4px 10px;
        }

        .section-title p {
          color: #273d4e; /* --heading-color */
          margin: 0;
          font-size: 36px;
          font-weight: 800;
          text-transform: uppercase;
          font-family: "Raleway", sans-serif;
        }

        @media (max-width: 768px) {
          .section-title p {
            font-size: 24px;
          }
        }

        /* Global Section */
        .section {
          color: #444444; /* --default-color */
          background-color: #ffffff; /* --background-color */
          scroll-margin-top: 90px;
          overflow: clip;
        }

        @media (max-width: 1199px) {
          .section {
            scroll-margin-top: 76px;
          }
        }
      `}</style>
    </section>
  );
}