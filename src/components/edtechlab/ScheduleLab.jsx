import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ScheduleLab = () => {
  const [schedule, setSchedule] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fit.neu.edu.vn/admin/api/edtech-lab-seminars?limit=100");
        const data = response.data.results
          .filter((item) => !item.Done.checkbox)
          .map((item) => ({
            topic: item["Tên chủ đề"].title[0].plain_text,
            summary: item["Nghiên cứu này hướng tới"].rich_text.map((text) => text.plain_text).join(" "),
            presenter: item["Người trình bày"].rich_text.map((text) => text.plain_text).join(", "),
            time: item["Thời gian"].date.start,
          }))
          .sort((a, b) => new Date(a.time) - new Date(b.time));
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (e, type) => {
    if (type === 'start') {
      setFilterStartDate(e.target.value);
    } else if (type === 'end') {
      setFilterEndDate(e.target.value);
    }
  };

  const filteredSchedule = schedule.filter((item) => {
    const itemDate = new Date(item.time);
    const startDate = filterStartDate ? new Date(filterStartDate) : null;
    const endDate = filterEndDate ? new Date(filterEndDate) : null;
    return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
  });

  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);
  const currentData = filteredSchedule.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lịch Sinh Hoạt Edtech Lab</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={handleFilterToggle}>
          {showFilter ? 'Ẩn Bộ Lọc' : 'Hiện Bộ Lọc'}
        </button>
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
      {showFilter && (
        <div className="mb-3">
          <label className="form-label">Ngày Bắt Đầu:</label>
          <input
            type="date"
            className="form-control"
            value={filterStartDate}
            onChange={(e) => handleFilterChange(e, 'start')}
          />
          <label className="form-label mt-2">Ngày Kết Thúc:</label>
          <input
            type="date"
            className="form-control"
            value={filterEndDate}
            onChange={(e) => handleFilterChange(e, 'end')}
          />
        </div>
      )}
      <div className="row">
        {currentData.map((item, index) => (
          <div key={index} className="col-12 col-md-6 mb-3">
            <div
              className="list-group-item border border-secondary rounded-3 p-3 hover-border equal-height"
              style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
            >
              <h6 className="text-truncate" title={item.topic} style={{ whiteSpace: "pre-wrap" }}>
                {item.topic}
              </h6>
              <p className="mb-1">Người Trình bày: {item.presenter}</p>
              <p className="mb-1">Tóm tắt: {item.summary}</p>
              <p className="mb-0">Thời gian: {new Date(item.time).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
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

export default ScheduleLab;