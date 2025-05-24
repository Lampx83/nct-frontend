"use client";
import React from "react";
import Link from "next/link";
import moment from "moment";
import { Card, Row, Col, Typography } from "antd";
import config from "@/utils/config";

const { Title, Paragraph, Text } = Typography;

const API_URL = config.API_URL;

const LabsInfo = ({ lab, dataActive }) => {
  console.log(dataActive);
  if (!lab) return <div className="mt-5 pt-5">Not found</div>;
  console.log(lab);
  console.log(dataActive);
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
            <div className="text-dark" style={{ fontSize: "18px", fontFamily: "Roboto, sans-serif" }}>
              <div className="custom-table text-dark" dangerouslySetInnerHTML={{ __html: description }} />
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
                <div className="custom-table text-dark" dangerouslySetInnerHTML={{ __html: aim }} />
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
                <div className="custom-table text-dark" dangerouslySetInnerHTML={{ __html: researchAreas }} />
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
                <div className="custom-table text-dark" dangerouslySetInnerHTML={{ __html: tier }} />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Hoạt Động
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                {dataActive?.length === 0 ? (
                <div className="custom-table text-dark" dangerouslySetInnerHTML={{ __html: activities }} />
                ) : (
                  <Row gutter={[16, 16]}>
                    {dataActive?.map((news, index) => (
                      <Col key={index} xs={24} sm={12} md={8}>
                        <Card
                          hoverable
                          className="h-100"
                          cover={
                            <Link href={`/post/${news.attributes.slug}`}>
                              <img
                                src={`${API_URL}${news.attributes.thumbnail.data.attributes.url}`}
                                alt={news.attributes.title}
                                style={{ height: "180px", objectFit: "cover", borderRadius: "8px 8px 0 0", width: "100%" }}
                              />
                            </Link>
                          }
                        >
                          <Link href={`/post/${news.attributes.slug}`}>
                            <Title level={5}>{news.attributes.title}</Title>
                          </Link>
                          {news.attributes.description && (
                            <Paragraph>
                              {news.attributes.description.length > 100
                                ? news.attributes.description.substring(0, 95) + " [...]"
                                : news.attributes.description}
                            </Paragraph>
                          )}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <img
                                src="/images/LogoNCT.png"
                                alt="Editor Icon"
                                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                              />
                              <Text type="secondary">
                                <span className="ms-2">{news.attributes.createdBy.data.attributes.firstname}</span>
                                <span className="ms-1">{news.attributes.createdBy.data.attributes.lastname}</span>
                              </Text>
                            </div>
                            <Text type="secondary">
                              {moment(news.attributes.eventDate || news.attributes.createdAt).format("DD/MM/YYYY")}
                            </Text>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}

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
