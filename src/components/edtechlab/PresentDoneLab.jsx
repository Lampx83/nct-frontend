import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PresentDoneLab = () => {
  const [presentations, setPresentations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fit.neu.edu.vn/admin/api/edtech-lab-seminars?limit=100");
        const data = response.data.results
          .filter((item) => item.Done.checkbox)
          .map((item, index) => ({
            stt: index + 1,
            topic: item["Tên chủ đề"].title[0].plain_text,
            presenter: item["Người trình bày"].rich_text.map((text) => text.plain_text).join(", "),
            date: item["Thời gian"].date.start,
          }));
        setPresentations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(presentations.length / itemsPerPage);
  const currentData = presentations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center mb-4">Chủ Đề Đã Trình Bày</h2>
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
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle" scope="col" style={{ whiteSpace: "nowrap" }}>STT</th>
            <th className="text-center align-middle" scope="col" style={{ whiteSpace: "nowrap" }}>Tên Bài Trình Bày</th>
            <th className="text-center align-middle" scope="col" style={{ whiteSpace: "nowrap" }}>Người Trình Bày</th>
            <th className="text-center align-middle" scope="col" style={{ whiteSpace: "nowrap" }}>Ngày Trình Bày</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.stt}>
              <th className="text-center align-middle" scope="row">{item.stt}</th>
              <td className="align-middle">{item.topic}</td>
              <td className="align-middle">{item.presenter}</td>
              <td className="text-center align-middle">{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresentDoneLab;