'use client';

import React, { useState, useRef, useTransition, useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Menu, Button, Modal, Select, QRCode as QRCodeComponent, Divider, Input, Space, message, Spin } from 'antd';
import { FaCopy, FaShare } from 'react-icons/fa';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TableCurriculum from '@/containers/TableCurriculum';
import 'antd/dist/reset.css';
import { Collapse } from 'antd';


const items1 = [
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


export default function CurriculumDetail({ major }) {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startPending] = useTransition();
  const tableRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get('year') || major?.versions[0]?.year || 'N/A'
  );
  const [messageApi, contextHolder] = message.useMessage();
     const [activeKey, setActiveKey] = useState(['1']);
  

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleYearChange = (value) => {
    setLoading(true); // Bắt đầu loading
    setSelectedYear(value);
    startPending(() => {
      router.push(`?year=${value}`);
      setTimeout(() => setLoading(false), 500); // Giả lập thời gian tải dữ liệu
    });
  };

  const handleMenuSelect = (key) => {
    setLoading(true); // Bắt đầu loading khi chọn menu
    setTimeout(() => setLoading(false), 700); // Giả lập thời gian tải dữ liệu
  };

  const currVersion = major?.versions?.find((version) => version.year === selectedYear);
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
          <div className="mt-5" style={{ width: "fit-content", margin: "auto" }}>
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
          <div className="container mt-5">
            {contextHolder}
            {loading ? (
              <div className="d-flex justify-content-center align-items-center vh-100 w-100">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <h1
                  className="text-center"
                  style={{ color: '#780614', marginTop: '5%', fontSize: '2.4rem', fontWeight: '600' }}
                >
                  {currVersion?.name?.replace(/K\d{2}/, '')?.trim() || major.title} - {major.admissionCode}
                </h1>
                <div className="my-4 description"
                  style={{ textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: major?.description || '' }}></div>
                <hr style={{ borderColor: 'var(--text-primary-blue)' }} />
                <div className="d-flex justify-content-end align-items-center gap-2 mb-4">
                  <Select
                    value={selectedYear}
                    onChange={handleYearChange}
                    options={major.versions.map((version) => ({
                      label: version.year,
                      value: version.year,
                    }))}
                    loading={isPending}
                  />
                  {/* <Button
                    type="primary"
                    style={{ background: '#a31b1b' }}
                    icon={<FaShare />}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Chia sẻ
                  </Button>
                  <Modal
                    title="Chia sẻ"
                    open={isModalOpen}
                    onOk={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    style={{ minWidth: '40%' }}
                  >
                    <div className="d-flex align-items-center flex-column flex-md-row">
                      <QRCodeComponent
                        value={`https://courses.neu.edu.vn${pathname}?${searchParams.toString()}`}
                        size={180}
                        style={{ minWidth: '180px' }}
                      />
                      <Divider style={{ borderColor: 'gray' }} className="my-3" />
                      <div className="w-100 d-flex flex-column gap-2 align-items-center">
                        <Space.Compact style={{ width: '100%' }}>
                          <Input defaultValue={`https://courses.neu.edu.vn${pathname}`} />
                          <Button
                            type="primary"
                            onClick={() => navigator.clipboard.writeText(`https://courses.neu.edu.vn${pathname}`)}
                          >
                            <FaCopy />
                          </Button>
                        </Space.Compact>
                      </div>
                    </div>
                  </Modal> */}
                </div>
                <TableCurriculum ref={tableRef} curriculum={currVersion?.curriculum || major.versions[0].curriculum} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
