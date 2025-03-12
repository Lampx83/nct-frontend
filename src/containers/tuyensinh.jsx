"use client";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useRef, useTransition } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button, Modal, Select, QRCode as QRCodeComponent, Divider, Input, Space, message } from 'antd';

import 'antd/dist/reset.css';


const API_URL = "https://nct-frontend-liard.vercel.app/admin";
const items = [
    {
      key: 'an-toan-thong-tin-7480202',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/an-toan-thong-tin-7480202">An toàn thông tin</Link>,
    },
    {
      key: 'cong-nghe-thong-tin-7480201',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/cong-nghe-thong-tin-7480201">Công nghệ thông tin</Link>,
    },
    {
      key: 'he-thong-thong-tin-7480104',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/he-thong-thong-tin-7480104">Hệ thống thông tin</Link>,
    },
    {
      key: 'he-thong-thong-tin-quan-ly-7340405',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/he-thong-thong-tin-quan-ly-7340405">Hệ thống thông tin quản lí</Link>,
    },
    {
      key: 'khoa-hoc-may-tinh-7480101',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/khoa-hoc-may-tinh-7480101">Khoa học máy tính</Link>,
    },
    {
      key: 'thong-ke-kinh-te-7310107',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/thong-ke-kinh-te-7310107">Thống kê kinh tế</Link>,
    },
    {
      key: 'dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02">Định phí bảo hiểm & Quản trị rủi ro</Link>,
    },
    {
      key: 'phan-tich-du-lieu-kinh-te-EP03',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/phan-tich-du-lieu-kinh-te-EP03">Phân tích dữ liệu kinh tế</Link>,
    },
    {
      key: 'khoa-hoc-du-lieu-EP15',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/khoa-hoc-du-lieu-EP15">Khoa học dữ liệu</Link>,
    },
    {
      key: 'tri-tue-nhan-tao-EP16',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/tri-tue-nhan-tao-EP16">Trí tuệ nhân tạo</Link>,
    },
    {
      key: 'ky-thuat-phan-mem-EP17',
      icon: <SettingOutlined />,
      label: <Link href="/tuyen-sinh/ky-thuat-phan-mem-EP17">Kỹ thuật phần mềm</Link>,
    },
  
    
  ];
  
  const MenuComponent = () => {
    return (
      <Menu
        mode="vertical"
        style={{
          width: '23%',
          position: 'fixed',
          top: '80px',
          left: 0,
          maxHeight: 'calc(100vh - 90px - 100px)',
          padding: '15px',
          overflowY: 'auto',
          zIndex: 1000,
          fontSize: '16px'
        }}
        items={items}
      />
    );
  };
const Tuyensinh = ({ newsData }) => {
    const router = useRouter();
    return (
        <div className="container" style={{ display: 'flex', marginTop: '50px' }}>
        <MenuComponent />
        <div className="container mt-5" style={{ marginLeft: '20%', width: '100%' }}>
        <h2>Tuyển sinh Đại học</h2>
            <div className="text-center px-4">
                <Image
                    src="/images/NCT_Banner_sinhvien.jpg"
                    alt="Banner Tin tức"
                    width={1200}
                    height={500}
                    className="img-fluid"
                    style={{ objectFit: "cover", maxHeight: "500px" }}
                />
            </div>

        
            <div className="container mt-3">
                <h2>Tuyển sinh Đại học</h2>
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
                                            style={{ objectFit: "cover",  height: "250px", maxHeight: "250px",  width: "100%" }}
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
                                            <span className="ms-2 text-muted">Editor NCT</span>
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
    );
};

export default Tuyensinh;
