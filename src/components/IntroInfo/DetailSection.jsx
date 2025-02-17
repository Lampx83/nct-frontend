// components/DetailSection.js
import React from "react";

const DetailSection = ({ missions, functions, visions, additionalInfo }) => (
  <div className="container-xxl marginDetail">
    <div className="container">
      <div className="row g-4 mt-3">
        {missions && (
          <div
            className="col-md-12 col-lg-4 wow fadeInRight"
            data-wow-delay="0.1s"
          >
            <div className="d-flex px-4 pt-4 h-100 hover-primary-light">
              <div className="ps-3">
                <h3 className="mb-3 fw-bold">SỨ MỆNH</h3>
                <div
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: missions }}
                />
              </div>
            </div>
          </div>
        )}
        {functions && (
          <div
            className="col-md-12 col-lg-4 wow fadeInRight delay-2s"
            data-wow-delay="0.3s"
          >
            <div className="d-flex  px-4 pt-4 h-100 hover-primary-light">
              <div className="ps-3">
                <h3 className="mb-3 fw-bold">CHỨC NĂNG</h3>
                <div
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: functions }}
                />
              </div>
            </div>
          </div>
        )}
        {visions && (
          <div
            className="col-md-12 col-lg-4  wow fadeInRight"
            data-wow-delay="0.5s"
          >
            <div className="d-flex  px-4 pt-4 hover-primary-light">
              <div className="ps-3">
                <h3 className="mb-3 fw-bold color-custom">TẦM NHÌN</h3>
                <div
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: visions }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
     
      <div className="row g-4">
        <div className="col-lg-12 col-md-12 wow fadeInLeft" data-wow-delay="0.1s">
          <div className="d-flex">
            <div className="">
              <div
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: additionalInfo }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DetailSection;
