"use client";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect, useTransition } from 'react';
import 'antd/dist/reset.css';
import { Collapse } from 'antd';

const API_URL = "https://nct-frontend-liard.vercel.app/admin";
const items1 = [
  {
    key: 'an-toan-thong-tin-7480202',
    label: <Link href="/tuyen-sinh/an-toan-thong-tin-7480202">An toàn thông tin</Link>,
  },
  {
    key: 'cong-nghe-thong-tin-7480201',
    label: <Link href="/tuyen-sinh/cong-nghe-thong-tin-7480201">Công nghệ thông tin</Link>,
  },
  {
    key: 'he-thong-thong-tin-7480104',
    label: <Link href="/tuyen-sinh/he-thong-thong-tin-7480104">Hệ thống thông tin</Link>,
  },
  {
    key: 'he-thong-thong-tin-quan-ly-7340405',
    label: <Link href="/tuyen-sinh/he-thong-thong-tin-quan-ly-7340405">Hệ thống thông tin quản lí</Link>,
  },
  {
    key: 'khoa-hoc-may-tinh-7480101',
    label: <Link href="/tuyen-sinh/khoa-hoc-may-tinh-7480101">Khoa học máy tính</Link>,
  },
  {
    key: 'thong-ke-kinh-te-7310107',
    label: <Link href="/tuyen-sinh/thong-ke-kinh-te-7310107">Thống kê kinh tế</Link>,
  },
  {
    key: 'toan-kinh-te-7310108',
    label: <Link href="/tuyen-sinh/toan-kinh-te-7310108">Toán kinh tế</Link>,
  },
  {
    key: 'dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02',
    label: <Link href="/tuyen-sinh/dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02">Định phí bảo hiểm & Quản trị rủi ro</Link>,
  },
  {
    key: 'phan-tich-du-lieu-kinh-te-EP03',
    label: <Link href="/tuyen-sinh/phan-tich-du-lieu-kinh-te-EP03">Phân tích dữ liệu kinh tế</Link>,
  },
  {
    key: 'khoa-hoc-du-lieu-EP15',
    label: <Link href="/tuyen-sinh/khoa-hoc-du-lieu-EP15">Khoa học dữ liệu</Link>,
  },
  {
    key: 'tri-tue-nhan-tao-EP16',
    label: <Link href="/tuyen-sinh/tri-tue-nhan-tao-EP16">Trí tuệ nhân tạo</Link>,
  },
  {
    key: 'ky-thuat-phan-mem-EP17',
    label: <Link href="/tuyen-sinh/ky-thuat-phan-mem-EP17">Kỹ thuật phần mềm</Link>,
  },



];

const Tuyensinh = ({ newsData, thumbnail }) => {
  const [activeKey, setActiveKey] = useState(['1']);
  console.log(newsData)

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.width >= 992;
      setActiveKey(isDesktop ? ['1'] : []);
    };

    handleResize(); // Thiết lập giá trị ban đầu

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const items = [
    {
      key: "1",
      label: (
        <span style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "Roboto, sans-serif", }}>
          Các chương trình đào tạo
        </span>
      ),
      children: (
        <div style={{ padding: "8px 16px" }}>
          {items1.map((item) => (
            <div key={item.key}>
              <p >{item.label}</p>
              <hr />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-3"  >
          <div className="mt-5 p-3">
            <Collapse items={items} defaultActiveKey={activeKey}
              expandIconPosition="end"
              style={{
                fontFamily: "Roboto, sans-serif",
                color: "rgb(119, 119, 119)",
                letterSpacing: "0.6px",
              }} />
          </div>
        </div>
        <div className="col-sm-9" >
          <div className=" mt-5 d-none d-lg-block">
            <div style={{ textAlign: "center" }}>
              <img
                src={`${API_URL}${thumbnail.data.attributes.formats.large.url}`}
                alt="Banner Tin tức"
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="container mt-4">
            <h2 className=" d-none d-lg-block">Tin tuyển sinh</h2>
            <div className="d-flex flex-column gap-4">
              {newsData?.map((news, index) => (
                <div key={index} className="card shadow-sm border-0 ">
                  <div className="row g-0 align-items-center p-3">
                    <div className="col-md-5">
                      <Link href={`/post/${news.attributes.slug}`}>
                        <img
                          src={`${API_URL}${news.attributes.thumbnail.data.attributes.url}`}
                          alt={news.attributes.title}
                          className="img-fluid rounded"
                          style={{ objectFit: "cover", height: "250px", maxHeight: "250px", width: "100%" }}
                        />
                      </Link>
                    </div>

                    <div className="col-md-7 p-3">
                      <Link href={`/post/${news.attributes.slug}`} className="text-decoration-none">
                        <h5 className="mb-2">{news.attributes.title}</h5>
                      </Link>
                      {news.attributes.description && (
                        <p className="text-muted mb-2">
                          {news.attributes.description.length > 100
                            ? news.attributes.description.substring(0, 80) + " [...]"
                            : news.attributes.description}
                        </p>
                      )}
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="/images/LogoNCT.png"
                            alt="Editor Icon"
                            width={40}
                            height={40}
                            className="rounded-circle"
                          />
                          <span className="ms-2 text-muted">
                            <div type="secondary">
                              <span className="ms-2">{news.attributes.createdBy.data.attributes.firstname}</span>
                              <span className="ms-1">{news.attributes.createdBy.data.attributes.lastname}</span>

                            </div>
                          </span>
                        </div>
                        <span className="text-muted">
                          {moment(news.attributes.eventDate || news.attributes.createdAt).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuyensinh;
