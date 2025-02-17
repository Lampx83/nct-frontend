import React, { useEffect, useState } from "react";

const MembersLab = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch data từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fit.neu.edu.vn/admin/api/edtech-lab-members?limit=60"
        );
        const result = await response.json();

        // Xử lý dữ liệu: nhóm, xáo trộn và đưa các sinh viên thiếu thông tin xuống cuối
        const processedData = processData(result.results);
        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Hàm xử lý dữ liệu
  const processData = (members) => {
    const groups = {};
    const incompleteData = []; // Lưu các dòng thiếu thông tin

    members.forEach((member) => {
      const groupName =
        member["Group "]?.multi_select?.map((g) => g.name).join(", ") || "N/A";
      const hasCompleteInfo =
        member["Họ tên"]?.rich_text?.[0]?.plain_text &&
        member["Lớp"]?.select?.name;

      if (!hasCompleteInfo) {
        incompleteData.push(member);
      } else {
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(member);
      }
    });

    // Shuffle các nhóm
    const shuffledGroups = Object.values(groups).sort(() => Math.random() - 0.5);

    // Gộp nhóm lại và thêm các dòng thiếu thông tin cuối cùng
    return [...shuffledGroups.flat(), ...incompleteData];
  };

  // Tính toán phân trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Tổng số trang
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Chuyển trang
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <h3 className="text-center mb-3">Thành Viên Edtech Innovation Lab
      </h3>

      {/* Bảng dữ liệu */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              STT
            </th>
            <th className="text-center" scope="col">
              HỌ VÀ TÊN
            </th>
            <th className="text-center" scope="col">
              LỚP SINH VIÊN
            </th>
            <th className="text-center" scope="col">
              NHÓM NGHIÊN CỨU
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((member, index) => (
            <tr key={index}>
              <td className="text-center">{indexOfFirstRow + index + 1}</td>
              <td>{member["Họ tên"]?.rich_text?.[0]?.plain_text || "-"}</td>
              <td className="text-center">
                {member["Lớp"]?.select?.name || "-"}
              </td>
              <td className="text-center">
                {member["Group "]?.multi_select
                  ?.map((group) => group.name)
                  .join(", ") || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Thông báo khi không có dữ liệu */}
      {data.length === 0 && (
        <div className="text-center mt-4">
          <p className="text-muted">Không có dữ liệu.</p>
        </div>
      )}

      {/* Phân trang */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <span className="px-3">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MembersLab;
