"use client";

import { useState } from "react";
import Link from "next/link";

export function News() {
  const [selectedTopic, setSelectedTopic] = useState("Featured");

  const newsItems = [
    {
      id: 1,
      category: "CAMPUS & COMMUNITY",
      title: "Matthew Grossman named head of University Communications at Penn",
      image: "https://picsum.photos/400/500?random=1", // Hình ảnh lớn (4:5)
      url: "/news/matthew-grossman",
    },
    {
      id: 2,
      category: "ANNOUNCEMENTS",
      title: "An update to the University community on recent executive orders",
      image: "https://picsum.photos/200/150?random=2", // Hình ảnh nhỏ (4:3)
      url: "/news/announcements",
    },
    {
      id: 3,
      category: "ARTS, HUMANITIES, & SOCIAL SCIENCES",
      title: "Corine Labridy leads an exploration of French Caribbean culture and literature",
      image: "https://picsum.photos/200/150?random=3", // Hình ảnh nhỏ (4:3)
      url: "/news/corine-labridy",
    },
    {
      id: 4,
      category: "SCIENCE & TECHNOLOGY",
      title: "Getting to the root of root canals",
      image: "https://picsum.photos/200/150?random=4", // Hình ảnh nhỏ (4:3)
      url: "/news/root-canals",
    },
    {
      id: 5,
      category: "ARTS, HUMANITIES, & SOCIAL SCIENCES",
      title: "From the Archives: Raymond and Sadie Alexander family home movies",
      image: "https://picsum.photos/200/150?random=5", // Hình ảnh nhỏ (4:3)
      url: "/news/alexander-movies",
    },
  ];

  const topics = [
    "Featured",
    "Arts, Humanities, & Social Sciences",
    "Campus & Community",
    "Education, Business, & Law",
    "Health Sciences",
    "Science & Technology",
  ];

  return (
    <div className="container">
      <header className="news-header">
        <h2 className="fw-bold fs-4">TIN TỨC</h2>
        <div className="topics-dropdown">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="topics-select"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="news-content">
        {/* Phần bên trái (50%) - 1 bài post lớn */}
        <div className="left-column">
          <Link href={newsItems[0].url} >
            <div className="img-container">
              <img src={newsItems[0].image} alt={newsItems[0].title} className="main-news-image rounded" />
            </div>
            <div className="main-news-text">
              <span className="category">{newsItems[0].category}</span>
              <h2>{newsItems[0].title}</h2>
              <span className="divider">—</span>
            </div>
          </Link>
        </div>

        {/* Phần bên phải (50%) - 4 bài post nhỏ theo 2x2 */}
        <div className="right-column border-bottom">
          <div className="grid-2x2">
            {newsItems.slice(1, 5).map((item) => (
              <Link key={item.id} href={item.url} className="grid-item">
                <div className="img-container">
                  <img src={item.image} alt={item.title} className="grid-image" />
                </div>
                <div className="grid-text">
                  <span className="category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="divider">—</span>
                </div>
              </Link>
            ))}
            <div></div>
            <div className="more-news text-end fs-5 fw-bolder my-0 py-0">
              <Link href="/more-news">Xem Thêm</Link>
            </div>
          </div>
        </div>
      </div>

      

      {/* CSS trực tiếp với styled-jsx */}
      <style jsx>{`
        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
        }

        .news-header h1 {
          color: #00205b;
          font-size: 24px;
          margin: 0;
        }

        .topics-dropdown {
          position: relative;
        }

        .topics-select {
          padding: 8px 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          background-color: #fff;
          cursor: pointer;
          appearance: none;
          background-image: url('data:image/svg+xml;utf8,<svg fill="%2300205b" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 8px center;
        }

        .news-content {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Chia tỷ lệ 50:50 */
          gap: 20px;
          margin-bottom: 20px;
        }

        .left-column {
          padding: 10px;

        }

        .left-column a {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .main-news-image {
          width: 100%;
          height: 500px; /* Kích thước cố định cho hình chính, tỷ lệ 4:5 */
          object-fit: cover; /* Giữ tỷ lệ và cắt phần dư */
          border-radius: 4px;
          transition: transform 0.5s ease-in-out;
        }
        .img-container {
          display: block;
          position: relative;
          overflow: hidden;
        }

        .grid-image {
          width: 100%;
          transition: transform 0.5s ease-in-out;
        }

        .img-container:hover .grid-image {
          transform: scale(1.1); /* Hiệu ứng zoom */
        }
        .img-container:hover .main-news-image {
          transform: scale(1.1); /* Hiệu ứng zoom */
        }
        .main-news-text {
          padding: 15px 0;
          color: #00205b;
        }

        .main-news-text .category {
          font-size: 12px;
          color: #a31920;
          text-transform: uppercase;
          display: block;
          margin-bottom: 5px;
        }

        .main-news-text h2 {
          font-size: 20px;
          margin: 0;
          line-height: 1.4;
        }

        .divider {
          color: #ccc;
          margin: 0 5px;
        }

        .right-column {
          padding: 10px;
        }

        .grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr; /* 2 cột */
          grid-template-rows: 1fr 1fr; /* 2 hàng */
          gap: 15px;
          height: 100%;
        }

        .grid-item {
          text-decoration: none;
          color: inherit;
          display: block;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .grid-image {
          width: 100%;
          height: 150px; /* Kích thước cố định cho hình nhỏ, tỷ lệ 4:3 */
          object-fit: cover; /* Giữ tỷ lệ và cắt phần dư */
          border-radius: 4px;
          transition: transform 0.5s ease-in-out;
        }
        .grid-image:hover {
          transform: scale(1.1);
        }

        .grid-text {
          padding: 10px 0;
          color: #00205b;
        }

        .grid-text .category {
          font-size: 12px;
          color: #a31920;
          text-transform: uppercase;
          display: block;
          margin-bottom: 5px;
        }

        .grid-text h3 {
          font-size: 16px;
          margin: 0;
          line-height: 1.4;
        }

        .more-news {
          margin-top: 20px;
          text-align: center;
        }

        .more-news a {
          color: #00205b;
          text-decoration: none;
          font-size: 14px;
        }

        .more-news a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .news-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .news-content {
            grid-template-columns: 1fr; /* Chuyển thành 1 cột trên mobile */
          }

          .left-column, .right-column {
            padding: 5px;
            overflow: hidden;
            display: inline-block;
          }

          .main-news-image {
            height: 300px; /* Giảm kích thước trên mobile */
          }

          .grid-image {
            height: 100px; /* Giảm kích thước trên mobile */
          }

          .grid-2x2 {
            grid-template-columns: 1fr; /* 1 cột trên mobile */
            grid-template-rows: auto; /* Tự động điều chỉnh hàng */
          }
        }
      `}</style>
    </div>
  );
}