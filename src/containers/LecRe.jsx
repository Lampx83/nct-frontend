import React, { useState, useEffect } from "react";
import Spinner from "../containers/Spinner";
const LecRe = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://fit.neu.edu.vn/admin/api/lecturer-researches?limit=86&sortBy=Date&sortValue=descending"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setFilteredData(res.results);
        setLoading(false);
      })
      .catch((e) => {
        window.location.href = "404";
      });
    document.title =
      "Công trình nghiên cứu của Giảng viên| Khoa Công nghệ thông tin";
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = data.filter(
      (item) =>
        item.Name?.title[0]?.text?.content
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.Link?.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Type?.select?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.Language?.select?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.Language?.select?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item["F Author"]?.select?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item["O Authors"]?.multi_select
          .map((option) => option.name)
          .join(", ")
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.Status?.status?.name.includes(searchTerm)
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
        <td>{item.Name?.title[0]?.text?.content || " "}</td>
        {/* <td>{item.Link?.url || " "}</td> */}
        <td>{item.Type?.select?.name || " "}</td>
        <td>{item.Language?.select?.name || " "}</td>
        <td>{item["F Author"]?.select?.name || " "}</td>
        <td>
          {item["O Authors"]?.multi_select
            .map((option) => option.name)
            .join(", ") || " "}
        </td>
        <td>{item.Status?.status?.name || " "}</td>
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
        CÔNG TRÌNH NGHIÊN CỨU CỦA GIẢNG VIÊN
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
              <th>Name</th>
              {/* <th>Link</th> */}
              <th>Type</th>
              <th>Language</th>
              <th>F Author</th>
              <th>O Authors</th>
              <th>Status</th>
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
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
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

export default LecRe;
