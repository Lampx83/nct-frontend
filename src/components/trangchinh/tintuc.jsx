"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";

export function News() {
  const [selectedTopic, setSelectedTopic] = useState("Tất Cả");
  const [newsItems, setNewsItems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Danh sách slug cần loại bỏ
  const excludedSlugs = ["su-kien-da-dien-ra", "su-kien-sap-dien-ra", "su-kien-noi-bat"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://nct-frontend-liard.vercel.app/admin/api/blog-categories?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const result = await response.json();

        // Lọc bỏ các category có slug không mong muốn
        const validCategories = result.data.filter(
          (category) => !excludedSlugs.includes(category.attributes.slug)
        );

        // Lấy danh sách topic từ các category hợp lệ
        const fetchedTopics = validCategories.map((category) => category.attributes.title);
        setTopics(["Tất Cả", ...fetchedTopics]);

        // Xây dựng danh sách bài viết
        const mappedNews = validCategories.flatMap((category) =>
          category.attributes.blogs.data.map((blog) => ({
            id: blog.id,
            category: category.attributes.title,
            title: blog.attributes.title,
            image: extractFirstImage(blog.attributes.content) || "https://picsum.photos/400/500",
            url: `/post/${blog.attributes.slug}`,
          }))
        );

        setAllNews(mappedNews);

        // "Tất Cả" chứa tất cả bài viết từ category hợp lệ
        setNewsItems(mappedNews.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Cập nhật newsItems khi selectedTopic thay đổi
  useEffect(() => {
    if (allNews.length > 0) {
      if (selectedTopic === "Tất Cả") {
        setNewsItems(allNews.slice(0, 5)); // Lấy tối đa 5 bài viết
      } else {
        const filteredNews = allNews.filter((item) => item.category === selectedTopic);
        setNewsItems(filteredNews.slice(0, 5));
      }
    }
  }, [selectedTopic, allNews]);

  // Hàm trích xuất ảnh đầu tiên từ content HTML
  const extractFirstImage = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        {newsItems[0] && (
          <div className="left-column">
            <Link href={newsItems[0].url}>
              <div className="img-container">
                <img
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  className="main-news-image rounded"
                />
              </div>
              <div className="main-news-text">
                <span className="category">{newsItems[0].category}</span>
                <h2>{newsItems[0].title}</h2>
                {/* <span className="divider">—</span> */}
              </div>
            </Link>
          </div>
        )}
        {/* Phần bên phải (50%) - 4 bài post nhỏ theo 2x2 */}
        <div className="right-column">
          <div className="grid-2x2">
            {newsItems.slice(1, 5).map((item) => (
              <Link key={item.id} href={item.url} className="grid-item">
                <div className="img-container">
                  <img src={item.image} alt={item.title} className="grid-image" />
                </div>
                <div className="grid-text">
                  <span className="category">{item.category}</span>
                  <h3>{item.title}</h3>
                  {/* <span className="divider">—</span> */}
                </div>
              </Link>
            ))}
          </div>
          <div className="more-news text-end fs-5 my-0 py-0">
            <Link href="/tin-tuc" className="text-primary" style={{ fontFamily: "Barlow, sans-serif"}}>Xem Thêm</Link>
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
          padding: 8px 25px;
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
          height: 150px; /* Kích thước cố định cho hình nhỏ, tỷ lệ 4:3 */
          object-fit: cover; /* Giữ tỷ lệ và cắt phần dư */
          border-radius: 4px;
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
          padding-bottom: 0;
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

          .left-column,
          .right-column {
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
