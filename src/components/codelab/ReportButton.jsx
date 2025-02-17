import React from "react";

function ReportButton({ onClick1 }) {
       
  return (
    <a
    className="dropdown-item"
    data-toggle="modal"
    data-target="#reportModal"
    onClick={onClick1}
  >
    Báo cáo
  </a>
  );
}

export default ReportButton;
