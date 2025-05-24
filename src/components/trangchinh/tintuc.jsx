"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import config from "@/utils/config";

export function News() {
  const baseUrl = config.API_URL; // Base URL của API
  const [selectedTopic, setSelectedTopic] = useState("Tất Cả");
  const [newsItems, setNewsItems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const excludedSlugs = ["su-kien-da-dien-ra", "su-kien-sap-dien-ra", "su-kien-noi-bat"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/api/blog-categories?populate=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const result = await response.json();

        const validCategories = result.data.filter(
          (category) => !excludedSlugs.includes(category.attributes.slug)
        );

        const fetchedTopics = validCategories.map((category) => category.attributes.title);
        setTopics(["Tất Cả", ...fetchedTopics]);

        const mappedNews = validCategories.flatMap((category) =>
          category.attributes.blogs.data.map((blog) => ({
            id: blog.id,
            category: category.attributes.title,
            title: blog.attributes.title,
            image: extractFirstImage(blog.attributes.content) || "https://picsum.photos/400/500",
            url: `/post/${blog.attributes.slug}`,
            eventDate: blog.attributes.eventDate ,
            pin: blog.attributes.pin || false,
          }))
        );

        // Sắp xếp: pin trước, eventDate mới hơn lên trước
        mappedNews.sort((a, b) => {
          if (a.pin !== b.pin) return b.pin - a.pin; // true -> false
          return new Date(b.eventDate) - new Date(a.eventDate); // mới -> cũ
        });


        setAllNews(mappedNews);
        setNewsItems(mappedNews.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (allNews.length > 0) {
      if (selectedTopic === "Tất Cả") {
        setNewsItems(allNews.slice(0, 5));
      } else {
        const filteredNews = allNews.filter((item) => item.category === selectedTopic);
        setNewsItems(filteredNews.slice(0, 5));
      }
    }
  }, [selectedTopic, allNews]);

  const extractFirstImage = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const hasRightColumnItems = newsItems.length > 1;

  return (
    <div className="container mb-5">
      <header className="news-header">
        <h2 className="fw-bold text-center mb-0">TIN TỨC</h2>
        <div className="topics-dropdown">
          <div className="dropdown">
            <button
              className="btn btn-primary text-light dropdown-toggle topics-select"
              type="button"
              id="topicsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedTopic}
            </button>
            <ul className="dropdown-menu" aria-labelledby="topicsDropdown">
              {topics.map((topic) => (
                <li key={topic}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="row spacing-letter">
        {newsItems[0] && (
          <div className="col-md-6 d-flex flex-column">
            <Link href={newsItems[0].url} className="flex-grow-1">
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
              </div>
            </Link>
          </div>
        )}
        <div className="col-md-6 d-flex flex-column">
          <div className="right-column row flex-grow-1">
            {newsItems.slice(1, 5).map((item) => (
              <div className="col-6 mb-3" key={item.id}>
                <Link href={item.url} className="grid-item">
                  <div className="img-container">
                    <img src={item.image} alt={item.title} className="grid-image" />
                  </div>
                  <div className="grid-text">
                    <span className="category">{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {hasRightColumnItems && (
            <div className="text-end mt-auto">
              <Link href="/tin-tuc">
                <button className="btn btn-primary w-100">Tin tức khác →</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .spacing-letter {
          letter-spacing: 0;
        }

        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
        }

        .topics-dropdown {
          position: relative;
        }

        .topics-select {
          padding: 8px 25px;
          font-size: 14px;
          cursor: pointer;
        }

        .main-news-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
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
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
          transition: transform 0.5s ease-in-out;
        }

        .img-container:hover .grid-image,
        .img-container:hover .main-news-image {
          transform: scale(1.1);
        }

        .main-news-text {
          padding: 15px 0 0 0;
          color: #00205b;
        }

        .main-news-text .category {
          font-size: 12px;
          color: #a31920;
          text-transform: uppercase;
          display: block;
          margin-bottom: 5px;
          font-family: "Barlow", sans-serif;
        }

        .main-news-text h2 {
          font-size: 20px;
          margin: 0;
          line-height: 1.4;
          font-family: "Barlow", sans-serif;
        }

        .right-column {
          padding: 0;
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
          font-family: "Barlow", sans-serif;
        }

        .grid-text h3 {
          font-size: 16px;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .news-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .main-news-image {
            height: 300px;
          }

          .grid-image {
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}
