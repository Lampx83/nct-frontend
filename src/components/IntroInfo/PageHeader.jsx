// components/PageHeader.js
import React from "react";
const randomNumber = Math.floor(Math.random() * 10) + 1;

const PageHeader = ({
  title = "Thông tin Khoa",
  backgroundImage = "",
}) => (
  <div
    className="cover"
    style={{
      backgroundImage: backgroundImage
        ? `url(${backgroundImage})`
        : `url(/images/background-${randomNumber}.png)`,
      height: "40vh",
      maxHeight: "400px",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div
      className="mask d-flex align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.2)", height: "100%" }}
    >
      <div className="container text-center text-white">
        <h2 className="display-3 text-light">{title}</h2>
      </div>
    </div>
  </div>
);

export default PageHeader;
