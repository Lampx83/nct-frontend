"use client";
import React, { useEffect, useState } from "react";
// import $ from "jquery"
// import "jquery-ui/ui/widgets/accordion";
import "../css/major.css";
import { useParams } from "react-router-dom";

export default function Major({ majorData, slug }) {
  const [activeTab, setActiveTab] = useState("K66");

  // Function to handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="container mt-5">
      <h1>{majorData?.attributes.title}</h1>
      <p id="admissionCode" className="mt-3">
        <strong>Mã tuyển sinh: {majorData?.attributes.admissionCode}</strong>
      </p>

      <div id="accordion">
        <h3 className="bg-primary" style={{ fontSize: "1.2rem" }}>
          Chương trình đào tạo
        </h3>
        <div className="ui-accordion-content">
          <div className="tab border border-secondary">
            <button
              className={`tablinks ${
                activeTab === "K66" ? "active" : ""
              }`}
              onClick={() => handleTabChange("K66")}
            >
              K66
            </button>
            {(slug === "cong-nghe-thong-tin" ||
              slug === "khoa-hoc-may-tinh") && (
              <>
                <button
                  className={`tablinks ${activeTab === "K63" ? "active" : ""}`}
                  onClick={() => handleTabChange("K63")}
                >
                  K63
                </button>
                <button
                  className={`tablinks ${activeTab === "K61" ? "active" : ""}`}
                  onClick={() => handleTabChange("K61")}
                >
                  K61
                </button>
              </>
            )}
          </div>

          <div
            id="K66"
            className="tabcontent"
            style={{ display: activeTab === "K66" ? "block" : "none" }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: majorData?.attributes.syllabus66,
              }}
            ></div>
          </div>
          {(slug === "cong-nghe-thong-tin" || slug === "khoa-hoc-may-tinh") && (
            <>
              <div
                id="K63"
                className="tabcontent"
                style={{ display: activeTab === "K63" ? "block" : "none" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: majorData?.attributes.syllabus63,
                  }}
                ></div>
              </div>
              <div
                id="K61"
                className="tabcontent"
                style={{ display: activeTab === "K61" ? "block" : "none" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: majorData?.attributes.syllabus61,
                  }}
                ></div>
              </div>
            </>
          )}
        </div>
        <h3 className="bg-primary" style={{ fontSize: "1.2rem" }}>
          Mô tả
        </h3>
        <div
          className="ui-accordion-content"
          dangerouslySetInnerHTML={{
            __html: majorData?.attributes.introduction,
          }}
        ></div>

        <h3 className="bg-primary" style={{ fontSize: "1.2rem" }}>
          Chuẩn đầu ra
        </h3>
        <div
          className="ui-accordion-content"
          dangerouslySetInnerHTML={{
            __html: majorData?.attributes.graduateOutcomes,
          }}
        ></div>

        <h3 className="bg-primary" style={{ fontSize: "1.2rem" }}>
          Cơ hội nghề nghiệp
        </h3>
        <div
          className="ui-accordion-content"
          dangerouslySetInnerHTML={{
            __html: majorData?.attributes.careerOpportunities,
          }}
        ></div>
      </div>
    </div>
  );
}
