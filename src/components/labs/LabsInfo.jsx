"use client";
import React from "react";

const LabsInfo = ({ lab }) => {
  if (!lab) return <div className="mt-5 pt-5">Not found</div>;

  const name = lab.attributes.name;
  const description = lab.attributes.description;
  const aim = lab.attributes.aim;
  const researchAreas = lab.attributes.researchTopics;
  const tier = lab.attributes.seminars;
  const activities = lab.attributes.activities;

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

        <div className="row mt-3 pt-2 mb-2">
          <div className="col-12">
            <div style={{ fontSize: "18px" }}>
              <div className="custom-table" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Mục Tiêu Và Sứ Mệnh
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="custom-table" dangerouslySetInnerHTML={{ __html: aim }} />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Lĩnh Vực Nghiên Cứu
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="custom-table" dangerouslySetInnerHTML={{ __html: researchAreas }} />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Tạp Chí Và Hội Thảo Mục Tiêu
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="custom-table" dangerouslySetInnerHTML={{ __html: tier }} />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Hoạt Động Nghiên Cứu
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="custom-table" dangerouslySetInnerHTML={{ __html: activities }} />
              </div>
            </div>
          </div>
        </div>

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
