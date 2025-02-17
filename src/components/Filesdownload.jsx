import React from "react";

const FileDownload = ({ fileUrl, fileName }) => {
  const downloadFile = () => {
    if (fileUrl) {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName || "default_filename.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert("Không có file để tải về!");
    }
  };

  return (
    <button onClick={downloadFile} className="btn btn-primary">
      <i className="fa fa-download"></i>
    </button>
  );
};

export default FileDownload;
