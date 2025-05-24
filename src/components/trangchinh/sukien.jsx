"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import config from "@/utils/config";

// Import styles for Swiper
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export function Events() {
  const basURL = config.API_URL;
  const [selectedFilter, setSelectedFilter] = useState("Sắp Diễn Ra");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${basURL}/api/blog-categories?populate=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const result = await response.json();

        const eventSlugs = ["su-kien-da-dien-ra", "su-kien-sap-dien-ra", "su-kien-noi-bat"];
        const validCategories = result.data.filter((category) =>
          eventSlugs.includes(category.attributes.slug)
        );

        const mappedEvents = validCategories.flatMap((category) =>
          category.attributes.blogs.data.map((blog) => {
            const date = new Date(blog.attributes.publishedAt);
            const formattedDate = date.toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "long",
            });

            return {
              id: blog.id,
              date: formattedDate,
              category: category.attributes.title,
              title: blog.attributes.title,
              time: "N/A",
              description: blog.attributes.description || "No description available",
              image: "https://nct.neu.edu.vn/admin/uploads/z6628226458849_788d856e3d4736922c91c046da7fb384_57b2e4305f.jpg" || "https://picsum.photos/300/200",
              status: mapSlugToStatus(category.attributes.slug),
              url: `/post/${blog.attributes.slug}`,
            };
          })
        );

        setEvents(mappedEvents);

        // Kiểm tra xem có sự kiện "Sắp Diễn Ra" hay không
        const hasUpcomingEvents = mappedEvents.some((event) => event.status === "upcoming");
        if (!hasUpcomingEvents) {
          setSelectedFilter("Nổi Bật"); // Nếu không có sự kiện sắp diễn ra, chuyển sang "Nổi Bật"
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const mapSlugToStatus = (slug) => {
    switch (slug) {
      case "su-kien-sap-dien-ra":
        return "upcoming";
      case "su-kien-noi-bat":
        return "popular";
      case "su-kien-da-dien-ra":
        return "last";
      default:
        return "upcoming";
    }
  };

  const extractFirstImage = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  const filteredEvents = events.filter((event) => {
    if (selectedFilter === "Sắp Diễn Ra") return event.status === "upcoming";
    if (selectedFilter === "Nổi Bật") return event.status === "popular";
    if (selectedFilter === "Đã Diễn Ra") return event.status === "last";
    return true;
  });

  const filters = ["Sắp Diễn Ra", "Nổi Bật", "Đã Diễn Ra"];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <header className="events-header">
        <h2 className="fw-bold pb-2 mb-2">SỰ KIỆN</h2>
        <div className="events-filter-button" style={{ fontFamily: "Barlow, sans-serif" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={selectedFilter === filter ? "active" : ""}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="overflow-hidden">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          className="events-swiper"
          breakpoints={{
            1200: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            0: { slidesPerView: 1 },
          }}
        >
          {filteredEvents.map((event) => (
            <SwiperSlide key={event.id} style={{ fontFamily: "Barlow, sans-serif" }}>
              <Link href={event.url} className="event-card">
                <div className="event-image-container">
                  <img src={event.image} alt={event.title} className="event-image rounded" />
                  <span className="event-date">{event.date}</span>
                </div>
                <div className="event-details">
                  <span className="event-category">{event.category}</span>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="more-news text-end fs-5 my-0 py-0">
        <Link href="/tin-tuc" style={{ fontFamily: "Barlow, sans-serif" }} className="text-primary">
          Xem Thêm
        </Link>
      </div>

      {/* CSS giữ nguyên */}
      <style jsx>{`
        .events-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Barlow, sans-serif;
          background-color: #fff;
        }

        .events-header {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
        }

        .events-header h1 {
          color: #000;
          font-size: 24px;
          font-weight: bold;
        }

        .events-filter-button {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .events-filter-button button {
          padding: 5px 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }

        .events-filter-button button.active {
          background-color: #8b0000;
          border-color: #8b0000;
          color: #fff;
        }

        .events-filter-button button:hover:not(.active) {
          background-color: #f5f5f5;
          border-color: #999;
        }

        .events-swiper {
          width: 100%;
        }

        .event-card {
          text-decoration: none;
          color: inherit;
          width: 100%;
          max-width: 300px;
          min-width: 250px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-flex;
          flex-shrink: 0;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .event-image-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: inline-block;
        }

        .event-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.5s ease-in-out;
        }

        .event-image:hover {
          transform: scale(1.2);
        }

        .event-date {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 14px;
          color: #fff;
          background-color: #343a40;
          padding: 5px 10px;
          border-radius: 4px;
        }

        .event-details {
          padding: 15px;
          color: #666;
        }

        .event-category {
          display: block;
          font-size: 12px;
          color: #8b0000;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .event-title {
          font-size: 18px;
          color: #000;
          margin: 0 0 10px 0;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Số dòng muốn hiển thị */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-description {
          font-size: 14px;
          color: #666;
          margin: 0 0 10px 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Số dòng muốn hiển thị */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .more-events a {
          display: inline-block;
          padding: 10px 30px;
          background-color: #8b0000;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .more-events a:hover {
          background-color: #700000;
        }

        @media (max-width: 1200px) {
          .events-header h1 {
            font-size: 22px;
          }

          .events-swiper {
            width: 100%;
          }

          .swiper-slide {
            width: 25% !important;
          }

          .event-card {
            max-width: 300px;
            min-width: 250px;
          }

          .event-image {
            height: 200px;
          }
        }

        @media (max-width: 1024px) {
          .events-header h1 {
            font-size: 20px;
          }

          .events-swiper {
            width: 100%;
          }

          .swiper-slide {
            width: 33.33% !important;
          }

          .event-card {
            max-width: 280px;
            min-width: 220px;
          }

          .event-image {
            height: 180px;
          }
        }

        @media (max-width: 768px) {
          .events-header h1 {
            font-size: 18px;
          }

          .events-filter-button {
            flex-direction: column;
            gap: 10px;
          }

          .events-filter-button button {
            width: 100%;
          }

          .events-swiper {
            width: 100%;
          }

          .swiper-slide {
            width: 100% !important;
          }

          .event-card {
            max-width: 300px;
            min-width: 250px;
          }

          .event-image {
            height: 150px;
          }

          .more-events a {
            padding: 8px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}