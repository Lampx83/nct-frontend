import React, { useState, useEffect } from "react";
import axios from "axios";

const ListDisplay = ({ data }) => (
  <div className="row">
    {data.map((item) => (
      <div key={item.id} className="col-12 col-md-6 mb-3">
        <div
          className="list-group-item border border-secondary rounded-3 p-3 hover-border equal-height"
          style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
        >
          <h6 className="text-truncate" title={item.title} style={{ whiteSpace: "pre-wrap" }}>
            {item.title}
          </h6>
          <p className="mb-1">Tác giả: {item.authors}</p>
          <p className="mb-1">{item.journal}</p>
          <p className="mb-0">Năm: {item.year}</p>
        </div>
      </div>
    ))}
  </div>
);

const OutputLab = () => {
  const [publications, setPublications] = useState([]);
  const [techProducts, setTechProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("publications");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory === "publications") {
        try {
          const response = await axios.get("https://fit.neu.edu.vn/admin/api/lecturer-researches?limit=100");
          const data = response.data.results
            .filter((item) => item.Status.status.name === "Done")
            .map((item) => {
              const authors = [
                item["F Author"]?.select?.name,
                ...item["O Authors"]?.multi_select?.map((author) => author.name),
                item["C Author"]?.select?.name,
              ].filter(Boolean);

              // Remove duplicate author names
              const uniqueAuthors = [...new Set(authors)];

              return {
                id: item.id,
                title: item.Name.title[0].plain_text,
                authors: uniqueAuthors.join(", "),
                journal: item.Type?.select?.name,
                year: new Date(item.Date?.date?.start).getFullYear(),
              };
            });
          setPublications(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedCategory]);

  const data = selectedCategory === "publications" ? publications : techProducts;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Công Trình Nghiên Cứu Và Chuyển Giao</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="btn-group" role="group" aria-label="Output type selector">
          {[
            { label: "Publications", value: "publications" },
            { label: "Technology Products", value: "techProducts" },
          ].map((btn) => (
            <button
              key={btn.value}
              type="button"
              className={`btn ${selectedCategory === btn.value ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                setSelectedCategory(btn.value);
                setCurrentPage(1);
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Trước
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                {currentPage}/{totalPages}
              </span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Sau
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hiển thị danh sách */}
      <ListDisplay data={currentData} />

      {/* CSS nội tuyến */}
      <style>{`
        .hover-border {
          border-color: #dee2e6; /* Màu viền mặc định */
        }
        .hover-border:hover {
          border-color: #0d6efd; /* Màu viền khi hover */
          box-shadow: 0 0 10px rgba(13, 110, 253, 0.5); /* Thêm hiệu ứng bóng */
        }
        .equal-height {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default OutputLab;