'use client';

import React, { useState, useRef, useTransition, useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Select, Spin, Collapse, message } from 'antd';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import TableCurriculum from '@/containers/TableCurriculum';
import 'antd/dist/reset.css';
import moment from "moment";
import Link from "next/link";
import config from '@/utils/config';

const API_URL = config.API_URL;

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
    label: <Link href="/tuyen-sinh/dinh-phi-bao-hiem-and-quan-tri-rui-ro-EP02">Định phí bảo hiểm & Quản trị rủi ro (Actuary) <span className="fa fa-star"style={{color: "#F5E65D"}}></span></Link>,
  },
  {
    key: 'phan-tich-du-lieu-kinh-te-EP03',
    label: <Link href="/tuyen-sinh/phan-tich-du-lieu-kinh-te-EP03">Phân tích dữ liệu kinh tế (DSED) <span className="fa fa-star" style={{color: "#F5E65D"}}></span></Link>,
  },
  {
    key: 'khoa-hoc-du-lieu-EP15',
    label: <Link href="/tuyen-sinh/khoa-hoc-du-lieu-EP15">Khoa học dữ liệu <span className="fa fa-star" style={{color: "#F5E65D"}}></span></Link>,
  },
  {
    key: 'tri-tue-nhan-tao-EP16',
    label: <Link href="/tuyen-sinh/tri-tue-nhan-tao-EP16">Trí tuệ nhân tạo <span className="fa fa-star"style={{color: "#F5E65D"}}></span></Link>,
  },
  {
    key: 'ky-thuat-phan-mem-EP17',
    label: <Link href="/tuyen-sinh/ky-thuat-phan-mem-EP17">Kỹ thuật phần mềm <span className="fa fa-star"style={{color: "#F5E65D"}}></span></Link>,
  },
];

export default function CurriculumDetail({ major, newsData }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startPending] = useTransition();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get('year') || major?.versions[0]?.year || 'N/A'
  );
  const [activeKey, setActiveKey] = useState(['1']);
  const [messageApi, contextHolder] = message.useMessage();
  const tableRef = useRef(null);
  const prevPathname = useRef(pathname);

  // Tắt pageLoading khi path thay đổi
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setPageLoading(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // Tắt loading lần đầu
  useEffect(() => {
    setLoading(false);
  }, []);

  // Xử lý chọn chuyên ngành khác
  const handleMenuClick = (url) => {
    setPageLoading(true);
    router.push(url);
  };

  // Xử lý thay đổi năm
  const handleYearChange = (value) => {
    setLoading(true);
    setSelectedYear(value);
    startPending(() => {
      router.push(`?year=${value}`);
      setTimeout(() => setLoading(false), 500);
    });
  };

  const currVersion = major?.versions?.find((v) => v.year === selectedYear);

  // Collapse menu tự mở theo desktop/mobile
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 992;
      setActiveKey(isDesktop ? ['1'] : []);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const items = [
    {
      key: '1',
      label: (
        <span style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
          Các chương trình đào tạo
        </span>
      ),
      children: (
        <div style={{ padding: '8px 16px' }}>
          {items1.map((item) => (
            <div key={item.key} style={{ marginBottom: 8 }}>
              <p style={{ margin: 0 }}>{item.label}</p>
              <hr />
            </div>
          ))}
        </div>
      ),
    },
  ];

  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <Spin size="large" tip="Đang tải trang..." />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {contextHolder}
      <div className="row">
        <div className="col-sm-3">
          <div className="mt-5">
            <Collapse
              items={items}
              defaultActiveKey={activeKey}
              expandIconPosition="end"
              style={{
                fontFamily: 'Roboto, sans-serif',
                color: 'rgb(119, 119, 119)',
                letterSpacing: '0.6px',
              }}
            />
          </div>
        </div>
        <div className="col-sm-9">
          <div className="container mt-5">
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
                <div
                  className="my-4 description"
                  style={{ textAlign: 'justify' }}
                  dangerouslySetInnerHTML={{ __html: major?.description || '' }}
                ></div>
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
                </div>
                <TableCurriculum
                  ref={tableRef}
                  curriculum={currVersion?.curriculum || major.versions[0].curriculum}
                />
              </>
            )}
          </div>
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
  );
}
