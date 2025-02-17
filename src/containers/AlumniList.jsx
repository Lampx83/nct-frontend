"use client"
import React, { useState, useEffect } from "react";

const AlumniTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://fit.neu.edu.vn/admin/api/alumni-lists?limit=150")
      .then((res) => res.json())
      .then((res) => {
        console.log(res); // Log the response to inspect its structure
        setData(res.results);
        setFilteredData(res.results);
        setLoading(false);
      })
      .catch((e) => {
        window.location.href = "404.html";
      });
  }, []);
  

  // Logic tìm kiếm
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = data.filter((item) =>
      item.ho?.rich_text?.[0]?.text?.content?.toLowerCase().includes(searchValue) ||
      item.ten?.rich_text?.[0]?.text?.content?.toLowerCase().includes(searchValue) ||
      item.maSV?.rich_text?.[0]?.text?.content?.toLowerCase().includes(searchValue) ||
      item.noiSinh?.rich_text?.[0]?.text?.content?.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };
  
  const renderTable = (page = 1) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = filteredData.slice(start, end);
  
    return displayData.map((item, index) => (
      <tr key={index} className="text-center align-middle">
        <td className="text-center align-middle">{start + index + 1}</td>
        <td>{item.ho?.rich_text?.[0]?.text?.content} {item.ten?.rich_text?.[0]?.text?.content}</td>
        <td className="text-center align-middle">{item.maSV?.rich_text?.[0]?.text?.content}</td>
        <td className="text-center align-middle">{item.soVaoSo?.rich_text?.[0]?.text?.content}</td>
        <td className="text-center align-middle">{item.khoa?.rich_text?.[0]?.text?.content}</td>
        <td className="text-center align-middle">{item.namTotNghiep?.rich_text?.[0]?.text?.content}</td>
        <td className="text-center align-middle">{item.nganhDaoTao?.rich_text?.[0]?.text?.content}</td>
        <td className="text-center align-middle">{item.noiSinh?.rich_text?.[0]?.text?.content}</td>
      </tr>
    ));
  };
  
  // Render loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Tính toán số trang
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3" style={{color: "#0054a2", fontWeight: "650"}}>DANH SÁCH CỰU SINH VIÊN KHOA CÔNG NGHỆ THÔNG TIN</h2>
      <input
        className="form-control my-3"
        id="myInput"
        type="text"
        placeholder="Search.."
        style={{ width: '50%', margin: 'auto' }}
        value={searchTerm}
        onChange={handleSearch}
      />

      <table className="table table-striped table-bordered table-hover table-sm" style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr className="text-center align-middle" style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', border: '1px solid black' }}>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>STT</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Họ Và Tên</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Mã Sinh Viên</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Mã Lớp</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Khóa</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Năm Tốt Nghiệp</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Ngành Đào Tạo</th>
            <th style={{fontWeight: "bold", textAlign:"center", border: '1px solid black'}}>Nơi Sinh</th>
          </tr>
        </thead>
        <tbody>{renderTable(currentPage)}</tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination justify-content-center" id="pagination">
        {/* Nút trước */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
        </li>
        {/* Số trang */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          </li>
        ))}
        {/* Nút sau */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </div>
  );
};

export default AlumniTable;
