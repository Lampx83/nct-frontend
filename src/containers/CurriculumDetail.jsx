'use client';

import React, { useState, useRef, useTransition } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button, Modal, Select, QRCode as QRCodeComponent, Divider, Input, Space, message } from 'antd';
import { FaCopy, FaDownload, FaShare } from 'react-icons/fa';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TableCurriculum from '@/containers/TableCurriculum';
import 'antd/dist/reset.css';

const items = [
  {
    key: 'an-toan-thong-tin-7480202',
    icon: <SettingOutlined />,
    label: <Link href="/major/an-toan-thong-tin-7480202">An toàn thông tin</Link>,
  },
  {
    key: 'cong-nghe-thong-tin-7480201',
    icon: <SettingOutlined />,
    label: <Link href="/major/cong-nghe-thong-tin-7480201">Công nghệ thông tin</Link>,
  },
  {
    key: 'he-thong-thong-tin-7480104',
    icon: <SettingOutlined />,
    label: <Link href="/major/he-thong-thong-tin-7480104">Hệ thống thông tin</Link>,
  },
  {
    key: 'he-thong-thong-tin-quan-ly-7340405',
    icon: <SettingOutlined />,
    label: <Link href="/major/he-thong-thong-tin-quan-ly-7340405">Hệ thống thông tin quản lí</Link>,
  },
  {
    key: 'khoa-hoc-may-tinh-7480101',
    icon: <SettingOutlined />,
    label: <Link href="/major/khoa-hoc-may-tinh-7480101">Khoa học máy tính</Link>,
  },
  {
    key: 'thong-ke-kinh-te-7310107',
    icon: <SettingOutlined />,
    label: <Link href="/major/thong-ke-kinh-te-7310107">Thống kê kinh tế</Link>,
  },
  {
    key: 'dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02',
    icon: <SettingOutlined />,
    label: <Link href="/major/dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02">Định phí bảo hiểm & Quản trị rủi ro</Link>,
  },
  {
    key: 'phan-tich-du-lieu-kinh-te-EP03',
    icon: <SettingOutlined />,
    label: <Link href="/major/phan-tich-du-lieu-kinh-te-EP03">Phân tích dữ liệu kinh tế</Link>,
  },
  {
    key: 'khoa-hoc-du-lieu-EP15',
    icon: <SettingOutlined />,
    label: <Link href="/major/khoa-hoc-du-lieu-EP15">Khoa học dữ liệu</Link>,
  },
  {
    key: 'tri-tue-nhan-tao-EP16',
    icon: <SettingOutlined />,
    label: <Link href="/major/tri-tue-nhan-tao-EP16">Trí tuệ nhân tạo</Link>,
  },
  {
    key: 'ky-thuat-phan-mem-EP17',
    icon: <SettingOutlined />,
    label: <Link href="/major/ky-thuat-phan-mem-EP17">Kỹ thuật phần mềm</Link>,
  },

  
];

const MenuComponent = () => {
  return (
    <Menu
      mode="vertical"
      style={{
        width: '350px',
        position: 'fixed',
        top: '90px',
        left: 0,
        height: '100vh',
        padding: '15px',
        overflowY: 'auto',
        zIndex: 1000,
        background: '#fff',
        borderRight: '1px solid #ddd',
        fontSize: '16px'
      }}
      items={items}
    />
  );
};

export default function CurriculumDetail({ major }) {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startPending] = useTransition();
  const tableRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || major?.versions[0]?.year || "N/A"
  );
  const [messageApi, contextHolder] = message.useMessage();
  const year = searchParams.get("year") || major?.versions[0]?.year;

  const handleYearChange = (value) => {
    setSelectedYear(value);
    startPending(() => {
      router.push(`?year=${value}`);
    });
  };

  const currVersion = major?.versions?.find(
    (version) => version.year === selectedYear
  );

  return (
    <div className='container' style={{ display: 'flex' }}>
      <MenuComponent />
      <div className="container mt-5" style={{ marginLeft: '270px', width: '100%' }}>
        {contextHolder}
        <h1 className="text-center" style={{ color: " #780614", marginTop: "5%", fontSize: "2.4rem", fontWeight: "600" }}>
          {currVersion?.name?.replace(/K\d{2}/, "")?.trim() || major.title} - {major.admissionCode}
        </h1>
        <div className="my-4 description" dangerouslySetInnerHTML={{ __html: major?.description || "" }}></div>
        <hr style={{ borderColor: "var(--text-primary-blue)" }} />
        <div className="d-flex justify-content-end align-items-center gap-2 mb-4">
          <div className="d-flex justify-content-end align-items-center gap-2">
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              options={major.versions.map((version) => ({
                label: version.year,
                value: version.year,
              }))}
              loading={isPending}
            />
            </div>
            <Button type="primary" style={{background: "#a31b1b"}} icon={<FaShare />} onClick={() => setIsModalOpen(true)}>
              Chia sẻ
            </Button>
            <Modal title="Chia sẻ" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} footer={null} style={{ minWidth: "40%" }}>
              <div className="d-flex align-items-center flex-column flex-md-row">
                <QRCodeComponent value={`https://courses.neu.edu.vn${pathname}?${searchParams.toString()}`} size={180} style={{ minWidth: "180px" }} />
                <Divider style={{ borderColor: "gray" }} className="my-3" />
                <div className="w-100 d-flex flex-column gap-2 align-items-center">
                  <Space.Compact style={{ width: "100%" }}>
                    <Input defaultValue={`https://courses.neu.edu.vn${pathname}`} />
                    <Button type="primary" onClick={() => navigator.clipboard.writeText(`https://courses.neu.edu.vn${pathname}`)}>
                      <FaCopy />
                    </Button>
                  </Space.Compact>
                </div>
              </div>
            </Modal>
          </div>
          <TableCurriculum ref={tableRef} curriculum={currVersion?.curriculum || major.versions[0].curriculum} loading={isPending} />
        </div>
      </div>
      );
}
