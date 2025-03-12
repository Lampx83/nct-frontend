"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import styles for Swiper
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export function Events() {
  const [selectedFilter, setSelectedFilter] = useState("Sắp Diễn Ra"); // Mặc định lọc "Sắp diễn ra"
  const [events, setEvents] = useState([]); // State để lưu danh sách sự kiện

  // Dữ liệu sự kiện mẫu (giả lập)
  const initialEvents = [
    {
      id: 1,
      date: "FEB 25",
      category: "LECTURE/PRESENTATION/TALK",
      title: "The Hand Behind Unmanned",
      time: "12:00 PM PT",
      description: "Explore the innovative technology driving unmanned systems in today's world.",
      image: "https://picsum.photos/300/200?random=1", // Hình ảnh placeholder (kích thước 300x200, tỷ lệ 3:2)
      status: "upcoming", // Trạng thái: upcoming, Nổi Bật, Đã Diễn Ra
      url: "/events/hand-unmanned",
    },
    {
      id: 2,
      date: "FEB 25",
      category: "LECTURE/PRESENTATION/TALK",
      title: "Food for Thought: Agave Fibers from Plant to Pad",
      time: "05:30 PM PT",
      description: "Learn how agave plants are transformed into sustainable fibers for modern use.",
      image: "https://picsum.photos/300/200?random=2", // Hình ảnh placeholder
      status: "upcoming", // Trạng thái: upcoming
      url: "/events/food-thought",
    },
    {
      id: 3,
      date: "FEB 25",
      category: "OTHER",
      title: "Stargazing Night",
      time: "07:30 PM PT",
      description: "Join us for an evening under the stars, exploring constellations and celestial wonders.",
      image: "https://picsum.photos/300/200?random=3", // Hình ảnh placeholder
      status: "popular", // Trạng thái: Nổi Bật
      url: "/events/stargazing",
    },
    {
      id: 4,
      date: "FEB 26",
      category: "EXHIBITION",
      title: "Branner Library Monthly Book & Map Exhibit - Naturally Hazardous: Sea Level Rise",
      time: "10:00 AM PT",
      description: "Discover the impact of sea level rise through rare books and maps at Branner Library.",
      image: "https://picsum.photos/300/200?random=4", // Hình ảnh placeholder
      status: "upcoming", // Trạng thái: upcoming
      url: "/events/branner-exhibit",
    },
    {
      id: 5,
      date: "JAN 15",
      category: "LECTURE/PRESENTATION/TALK",
      title: "Art History Symposium",
      time: "02:00 PM PT",
      description: "A deep dive into the evolution of art history over the centuries.",
      image: "https://picsum.photos/300/200?random=5", // Hình ảnh placeholder
      status: "popular", // Trạng thái: Đã Diễn Ra
      url: "/events/art-history",
    },
    {
      id: 6,
      date: "FEB 25",
      category: "LECTURE/PRESENTATION/TALK",
      title: "Food for Thought: Agave Fibers from Plant to Pad",
      time: "05:30 PM PT",
      description: "Learn how agave plants are transformed into sustainable fibers for modern use.",
      image: "https://picsum.photos/300/200?random=2", // Hình ảnh placeholder
      status: "upcoming", // Trạng thái: upcoming
      url: "/events/food-thought",
    },
    {
      id: 7,
      date: "FEB 25",
      category: "LECTURE/PRESENTATION/TALK",
      title: "Food for Thought: Agave Fibers from Plant to Pad",
      time: "05:30 PM PT",
      description: "Learn how agave plants are transformed into sustainable fibers for modern use.",
      image: "https://picsum.photos/300/200?random=2", // Hình ảnh placeholder
      status: "last", // Trạng thái: upcoming
      url: "/events/food-thought",
    },
    {
      id: 8,
      date: "FEB 25",
      category: "LECTURE/PRESENTATION/TALK",
      title: "Food for Thought: Agave Fibers from Plant to Pad",
      time: "05:30 PM PT",
      description: "Learn how agave plants are transformed into sustainable fibers for modern use.",
      image: "https://picsum.photos/300/200?random=2", // Hình ảnh placeholder
      status: "upcoming", // Trạng thái: upcoming
      url: "/events/food-thought",
    },
  ];

  // Sử dụng useEffect để thiết lập dữ liệu ban đầu
  useEffect(() => {
    setEvents(initialEvents);
  }, []);

  // Lọc sự kiện dựa trên selectedFilter
  const filteredEvents = events.filter((event) => {
    if (selectedFilter === "Sắp Diễn Ra") return event.status === "upcoming";
    if (selectedFilter === "Nổi Bật") return event.status === "popular";
    if (selectedFilter === "Đã Diễn Ra") return event.status === "last";
    return true; // Mặc định hiển thị tất cả nếu không lọc
  });

  const filters = ["Sắp Diễn Ra", "Nổi Bật", "Đã Diễn Ra"];

  return (
    <div className="container">
      <header className="events-header">
        <h2 className="fw-bold">SỰ KIỆN</h2>
        {/* <h2 className="text-center fw-bold mb-3">CÁC KHOA VIỆN TRỰC THUỘC</h2> */}
        <div className="events-filter-button" style={{ fontFamily: "Barlow, sans-serif"}}>
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
          slidesPerView={4} // Hiển thị 4 sự kiện trên 1 hàng
          spaceBetween={20} // Khoảng cách giữa các slide
          autoplay={{
            delay: 3000, // Tự động trượt sau 3 giây
            disableOnInteraction: false, // Tiếp tục trượt ngay cả khi người dùng tương tác
          }}
          navigation={false} // Tắt nút điều hướng nếu không cần
          modules={[Autoplay, Navigation]}
          className="events-swiper"
          breakpoints={{
            // Đảm bảo hiển thị 4 slide trên desktop
            1200: {
              slidesPerView: 4,
            },
            // 3 slide trên tablet
            768: {
              slidesPerView: 3,
            },
            // 1 slide trên mobile
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {filteredEvents.map((event) => (
            <SwiperSlide key={event.id} style={{ fontFamily: "Barlow, sans-serif"}}>
              <Link href={event.url} className="event-card">
                <div className="event-image-container">
                  <img src={event.image} alt={event.title} className="event-image rounded" />
                  <span className="event-date">{event.date}</span>
                </div>
                <div className="event-details">
                  <span className="event-category">{event.category}</span>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <span className="event-time">{event.time}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="more-news text-end fs-5 my-0 py-0">
        <Link href="/more-news" style={{ fontFamily: "Barlow, sans-serif"}}>Xem Thêm</Link>
      </div>

      {/* CSS trực tiếp với styled-jsx */}
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
          background-color: #8b0000; /* Màu đỏ đậm giống hình */
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
          width: 100%; /* Swiper tự động điều chỉnh width của slide */
          max-width: 300px; /* Giới hạn tối đa để không quá rộng */
          min-width: 250px; /* Đảm bảo kích thước tối thiểu đồng đều */
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-flex; /* Đảm bảo card giữ chiều rộng cố định */
          flex-shrink: 0; /* Ngăn card co lại khi trượt */
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
          height: 200px; /* Kích thước cố định cho hình ảnh, tỷ lệ 3:2 */
          object-fit: cover; /* Giữ tỷ lệ và cắt phần dư */
          transition: transform 0.5s ease-in-out; /* Hiệu ứng zoom */
        }

        .event-image:hover {
          transform: scale(1.2); /* Hiệu ứng zoom bằng cách làm sáng, không thay đổi kích thước */
        }

        .event-date {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 14px;
          color: #fff;
          background-color: #343a40; /* Màu xám đậm cho hộp ngày */
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
          color: #8b0000; /* Màu đỏ giống hình */
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .event-title {
          font-size: 18px;
          color: #000;
          margin: 0 0 10px 0;
          font-weight: 600;
        }

        .event-description {
          font-size: 14px;
          color: #666;
          margin: 0 0 10px 0;
          line-height: 1.5;
        }

        .event-time {
          display: block;
          font-size: 14px;
          color: #000;
          margin-top: 5px;
        }

        .more-events a {
          display: inline-block;
          padding: 10px 30px;
          background-color: #8b0000; /* Màu đỏ giống hình */
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .more-events a:hover {
          background-color: #700000; /* Màu đỏ đậm hơn khi hover */
        }

        @media (max-width: 1200px) {
          .events-header h1 {
            font-size: 22px;
          }

          .events-swiper {
            width: 100%;
          }

          .swiper-slide {
            width: 25% !important; /* Đảm bảo hiển thị 4 slide trên 1 hàng trên desktop (1200px trở lên) */
          }

          .event-card {
            max-width: 300px;
            min-width: 250px;
          }

          .event-image {
            height: 200px; /* Giữ nguyên kích thước trên desktop */
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
            width: 33.33% !important; /* 3 slide trên 1 hàng trên tablet */
          }

          .event-card {
            max-width: 280px;
            min-width: 220px;
          }

          .event-image {
            height: 180px; /* Giảm kích thước trên tablet */
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
            width: 100% !important; /* 1 slide trên 1 hàng trên mobile */
          }

          .event-card {
            max-width: 300px;
            min-width: 250px;
          }

          .event-image {
            height: 150px; /* Giảm kích thước trên mobile */
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