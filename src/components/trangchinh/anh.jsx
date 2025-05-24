"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import config from "@/utils/config";

// Dynamically import GLightbox and Isotope only on the client-side
const GLightbox = dynamic(() => import("glightbox").then((mod) => mod.default), { ssr: false });
const Isotope = dynamic(() => import("isotope-layout"), { ssr: false });

export function Portfolio() {
  const baseUrl = config.API_URL; // Base URL của API
  const [iso, setIso] = useState(null); // Isotope instance
  const [filterKey, setFilterKey] = useState("*"); // Mặc định là "Tất Cả"
  const [lightbox, setLightbox] = useState(null); // GLightbox instance
  const [portfolioItems, setPortfolioItems] = useState([]); // Danh sách ảnh từ API
  const [categories, setCategories] = useState([]); // Danh sách category từ API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize AOS, GLightbox, Isotope và fetch API on mount
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

    // Fetch data từ API
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/api/index-page?populate[imagesLibrary][populate]=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        const result = await response.json();

        // Ánh xạ dữ liệu từ imagesLibrary
        const images = result.data.attributes.imagesLibrary.flatMap((item) =>
          item.image.data.map((image) => ({
            id: `${item.id}-${image.id}`, // Đảm bảo ID là duy nhất
            category: item.category.toLowerCase().replace(/\s+/g, "-"),
            title: image.attributes.name.replace(/\.[^/.]+$/, ""),
            url: `${baseUrl}${image.attributes.url}`,
          }))
        );
        

        console.log("Số ảnh từ API:", result.data.attributes.imagesLibrary.length);
        console.log("Danh sách ảnh đã ánh xạ:", images);

        // Lấy danh sách category duy nhất từ imagesLibrary
        const uniqueCategories = [
          ...new Set(result.data.attributes.imagesLibrary.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
        setPortfolioItems(images);

        // Initialize Isotope sau khi ảnh được tải
        import("imagesloaded").then((imagesLoaded) => {
          const grid = document.querySelector(".isotope-container");
          if (grid) {
            imagesLoaded.default(grid, () => {
              import("isotope-layout").then((IsotopeModule) => {
                const isotope = new IsotopeModule.default(grid, {
                  itemSelector: ".portfolio-item",
                  layoutMode: "masonry",
                  sortBy: "original-order",
                  transitionDuration: "0.6s", // Thời gian hiệu ứng chuyển động
                });
                setIso(isotope);
                console.log("Số ảnh trong Isotope:", isotope.getItemElements().length);
              });
            });
          } else {
            console.error("Isotope grid not found!");
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();

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
      iso.arrange({ filter: filterKey === "*" ? "*" : `.filter-${filterKey}` });
      console.log("Số ảnh hiển thị sau lọc:", iso.getFilteredItemElements().length);
    }
  }, [filterKey, iso]);

  const handleFilterClick = (filter) => {
    setFilterKey(filter);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="portfolio" className="portfolio section mt-3">
      {/* Section Title */}
      <h2 className="mb-2 fw-bold fs-2 text-center">BỘ SƯU TẬP ẢNH</h2>
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
            style={{ fontFamily: "Barlow, sans-serif"}}
          >
            <li
              onClick={() => handleFilterClick("*")}
              className={filterKey === "*" ? "filter-active" : ""}
            >
              Tất Cả
            </li>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleFilterClick(category.toLowerCase().replace(/\s+/g, "-"))}
                className={
                  filterKey === category.toLowerCase().replace(/\s+/g, "-")
                    ? "filter-active"
                    : ""
                }
              >
                {category}
              </li>
            ))}
          </ul>
          {/* End Portfolio Filters */}

          {/* Portfolio Items */}
          <div
            className="row gy-4 isotope-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {portfolioItems.length > 0 ? (
              portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}`}
                >
                  <div className="portfolio-content">
                    <img src={item.url} className="img-fluid" alt={item.title} />
                    {/* <div className="portfolio-info">
                      <h4>{item.title}</h4>
                      <a
                        href={item.url}
                        title={item.title}
                        data-gallery={`portfolio-gallery-${item.category}`}
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <Link href="/details" title="More Details" className="details-link">
                        <i className="bi bi-link-45deg"></i>
                      </Link>
                    </div> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">Không có ảnh nào để hiển thị.</div>
            )}
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
          color: #780614; /* --accent-color */
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
          height: 300px; /* Kích thước cố định cho ảnh */
        }

        .portfolio .portfolio-content img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Đảm bảo ảnh vừa khung và giữ tỷ lệ */
          transition: transform 0.3s ease; /* Hiệu ứng zoom khi hover */
        }

        .portfolio .portfolio-content .portfolio-info {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          opacity: 0; /* Ẩn mặc định */
          transition: opacity 0.3s ease; /* Hiệu ứng fade khi hover */
        }

        .portfolio .portfolio-content:hover .portfolio-info {
          opacity: 1; /* Hiện khi hover */
        }

        .portfolio .portfolio-content .portfolio-info h4 {
          font-size: 14px;
          padding: 5px 10px;
          font-weight: 400;
          color: #ffffff;
          display: inline-block;
          background-color: #780614; /* --accent-color */
          margin-bottom: 10px;
        }

        .portfolio .portfolio-content .portfolio-info .preview-link,
        .portfolio .portfolio-content .portfolio-info .details-link {
          font-size: 26px;
          color: #fff;
          transition: 0.3s;
          margin: 0 10px;
        }

        .portfolio .portfolio-content .portfolio-info .preview-link:hover,
        .portfolio .portfolio-content .portfolio-info .details-link:hover {
          color: #ff4a17; /* --accent-color */
        }

        .portfolio .portfolio-content:hover img {
          transform: scale(1.1); /* Hiệu ứng zoom khi hover */
        }
      `}</style>
    </section>
  );
}