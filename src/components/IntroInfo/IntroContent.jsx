// components/IntroContent.js
import React from "react";

const IntroContent = ({ generalIntroduction, thumbnail }) => (
  <div className="container-xxl mt-5" >
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 pt-1" style={{ minHeight: '400px' }}>
          <div className="position-relative h-100 wow fadeIn">
            <img
              className="position-absolute img-fluid w-100 h-100 p-0 F"
              src={`https://fit.neu.edu.vn/admin${thumbnail}`}
              style={{
                objectFit: 'cover',
                backgroundColor: 'white',
                margin: '0',
                top: '0', right: "0",
                borderBottomLeftRadius: "0"
              }}
              alt="" />
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn">
          <h6 className="text-uppercase">Giới thiệu chung</h6>
          <h1 className="mb-4 fw-bolder"><span className="text-uppercase">Khoa Công nghệ thông tin</span></h1>
          <div className="mb-4" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: generalIntroduction }} />
        </div>
      </div>
    </div>
  </div>
);

export default IntroContent;
