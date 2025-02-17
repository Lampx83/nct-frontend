"use client"
import React, { useState, useEffect } from "react";
import Spinner from "../containers/Spinner";
import FileDownload from "../components/Filesdownload"; 
const GraToList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://fit.neu.edu.vn/admin/api/theses?limit=300")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setData(res.results);
        setFilteredData(res.results);
        setLoading(false);
      })
      .catch((e) => {
        window.location.href = "404";
      });
    document.title =
      "Chuyên đề/Khoá luận tốt nghiệp | Khoa Công nghệ thông tin";
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = data.filter(
      (item) =>
        item.tenChuyenDe?.title[0]?.text?.content
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.hoTenSV?.rich_text[0]?.text?.content
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.GVHD?.rich_text[0]?.text?.content
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.nam?.rich_text[0]?.text?.content.includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const renderTable = (page = 1) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = filteredData.slice(start, end);

    return displayData.map((item, index) => (
      <tr key={index}>
        <td className="text-center align-middle">{start + index + 1}</td>
        <td>{item.tenChuyenDe?.title[0]?.text?.content || "N/A"}</td>
        <td>{item.hoTenSV?.rich_text[0]?.text?.content || "N/A"}</td>
        <td>{item.GVHD?.rich_text[0]?.text?.content || "N/A"}</td>
        <td>{item.nam?.rich_text[0]?.text?.content || "N/A"}</td>
        <td className = "text-center align-middle">
          {item.Filesbaocao?.files[0]?.file?.url ? (
            <FileDownload
              fileUrl={item.Filesbaocao?.files[0]?.file?.url}
              fileName={item.Filesbaocao?.files[0]?.name}
            />
          ) : ("")}
        </td>
        <td className = "text-center align-middle">
          {item.SourceCode?.files[0]?.file?.url ? (
            <FileDownload 
              fileUrl={item.SourceCode?.files[0]?.file?.url}
              fileName={item.SourceCode?.files[0]?.name}
            />
          ) : ("")}
        </td>

      </tr>
    ));
  };

  if (loading) {
    return <Spinner />;
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container">
      <h2
        className="text-center mt-5 mb-3"
        style={{ color: "#0054a2", fontWeight: "650" }}
      >
        DANH SÁCH THỰC TẬP CHUYÊN ĐỀ/KHOÁ LUẬN TỐT NGHIỆP
      </h2>
      <input
        className="form-control my-3"
        id="myInput"
        type="text"
        placeholder="Search..."
        style={{ width: "80%", maxWidth: "500px", margin: "auto" }}
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="table-responsive">
        <table
          className="table table-striped table-bordered table-hover table-sm"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr
              className="text-center align-middle"
              style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}
            >
              <th>STT</th>
              <th>Tên chuyên đề</th>
              <th>Họ và tên SV</th>
              <th>GVHD</th>
              <th>Năm</th>
              <th>File báo cáo</th>
              <th>Source code</th>
            </tr>
          </thead>
          <tbody>{renderTable(currentPage)}</tbody>
        </table>
      </div>

      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default GraToList;
