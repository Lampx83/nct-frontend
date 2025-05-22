"use client";
import React from "react";

const LabsInfo = ({ lab }) => {
  if (!lab) return <div className="mt-5 pt-5">Not found</div>;

  const name = lab.attributes.name;
  const description = lab.attributes.description;
  const styles = `
  figure.table table {
  width: 100% !important;
  background-color: transparent !important;
  border: 1px solid #000 !important;
  border-collapse: collapse !important;
}

`;

  return (
    <div>
       <style>{styles}</style>
    <div className="container mt-5 pt-3" style={{ textAlign: "justify" }}>
      <h1 className="text-center mt-5">
        <b>{name}</b>
      </h1>

      {/* ✅ Bỏ mx-5 để không bị giới hạn chiều rộng */}
      <div className="row mt-3 pt-2 mb-2">
        <div className="col-12">
          <div style={{ fontSize: "18px" }}>
            <div className="custom-table" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>

      {/* ✅ CSS đảm bảo bảng chiếm full chiều rộng và cuộn ngang khi cần */}
      <style jsx>{`
        .custom-table {
          width: 100%;
          overflow-x: auto;
        }
        .custom-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .custom-table th,
        .custom-table td {
          padding: 8px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .custom-table table {
          table-layout: auto;
        }

        @media (max-width: 768px) {
          .custom-table table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default LabsInfo;
