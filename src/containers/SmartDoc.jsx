"use client"
import React, { useState } from "react";
import "../css/codelab.css";
import config from "@/config";

const SmartDoc = ({ uploadDone, user }) => {
  document.title = "SmartDoc | Khoa Công nghệ thông tin";
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false); // State để theo dõi khi đang kéo file vào
  const [googleDocID, setGoogleDocID] = useState(""); // State để lưu Google Doc ID

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    uploadFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    uploadFile(droppedFile);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const uploadFile = async (file) => {
    setUploading(true);

    try {
      let formData = new FormData();
      formData.append("files", file);
      if (user) formData.append("email", user.email);
      const response = await fetch(
        `${config.API_BASE_URL}/uploadMultipleFiles`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.text();
        if (user)
          window.open(
            "/doc/" + user.email + "/" + responseData,
            "_blank"
          );
        else window.open("/doc/" + responseData, "_blank");
        uploadDone();
      } else {
        console.error(
          "Request failed with status:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Request failed:", error.message);
    } finally {
      setUploading(false);
    }
  };

  // Hàm lấy Google Doc ID từ URL
  const getGoogleDocID = (url) => {
    const regex = /\/d\/([a-zA-Z0-9-_]{44})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  };

  // Hàm xử lý khi người dùng nhập URL Google Docs
  const handleGoogleDocChange = (event) => {
    const url = event.target.value;
    const docID = getGoogleDocID(url);
    if (docID.length === 44) {
      setGoogleDocID(docID); // Cập nhật Google Doc ID
      if (user)
        window.open(
          "/doc/" + user.email + "/" + docID,
          "_blank"
        );
      else window.open("/doc/" + docID, "_blank");
    }
  };
  return (
    <div className="container">
      <h2 className="text-center mt-5">SMARTDOC</h2>
      <div className="">
        <b>SmartDoc</b> là một ứng dụng giúp biến các tài liệu <strong>Word (.docx)</strong> hoặc <b>Google Docs</b> thành các
        định dạng phù hợp cho việc hiển thị trên Web. Các tính năng của SmartDoc:
      </div>
      <ol>
        <li>Hỗ trợ định dạng file MSWord (.docx) hoặc file Google Docs</li>
        <li> Tạo slide bài giảng hoặc sách giáo trình</li>
        <li>Tạo phòng học thông minh hỗ trợ giảng dạy, học tập</li>
      </ol>
      <div className="row drag-area-parent">
        <h4>File Word (.docx)</h4>
        <div
          className={`drag-area ${uploading ? "uploading" : ""} ${dragActive ? "active" : ""
            }`} // Thêm class "active" khi drag
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onDragEnter={() => setDragActive(true)} // Thêm class khi file được kéo vào
          onDragLeave={() => setDragActive(false)} // Xóa class khi file bị kéo ra ngoài
        >
          <h4 className="text-center mb-4">
            {uploading ? "Vui lòng đợi" : "Kéo thả file docx vào đây"}
          </h4>
          {uploading ? (
            <div className="spinner-border text-primary" role="status">
              < span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <p className="text-center">hoặc</p>
              <button
                className="btn btn-primary btn-block"
                onClick={handleButtonClick}
                disabled={uploading}
              >
                Chọn file
              </button>
              <input
                id="fileInput"
                type="file"
                hidden
                onChange={handleFileChange}
                disabled={uploading}
              />
            </>
          )}
        </div>
      </div >
      <div className="row mt-3">
        <h4>File Google Docs</h4>
        <label for="googledoc" className="form-label">
          Đường dẫn tới file Google Docs
        </label>
        <input
          type="text"
          className="form-control"
          id="googledoc"
          onChange={handleGoogleDocChange}
        />
        {googleDocID && (
          <p className="mt-2">
            Google Doc ID: <strong>{googleDocID}</strong>
          </p>
        )}
      </div>
    </div >
  );
};

export default SmartDoc;
