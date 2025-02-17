import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Enrollment() {
  const [activeTab, setActiveTab] = useState('London'); // Tab mặc định
  const [majorData, setMajorData] = useState(null);

  useEffect(() => {
    fetch(`https://fit.neu.edu.vn/admin/api/majors/8`)
      .then((res) => res.json())
      .then((res) => {
        setMajorData(res.data);
      })
      .catch(() => {
        window.location.href = "404";
      })
      .finally(() => {
        const loader = document.querySelector("#spinner");
        if (loader) {
          loader.classList.remove("show");
        }
      });
  }, []);

  const handleTabClick = (cityName) => {
    setActiveTab(cityName);
  };

  return (
    <div className="container-xxl service py-5">
      <div className="container">
        <div className="text-center wow fadeInDown" data-wow-delay="0.1s">
          <h6 className=" text-uppercase fs-6 text-primary">Tuyển sinh</h6>
          <h1 className="mb-5 text-secondary">- Năm 2025 -</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="nav w-100 nav-pills me-4">
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 active wow fadeInLeft rounded-0"
                data-wow-delay="0.1s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-1"
                type="button"
              >
                <i className="fa fa-laptop-code fa-2x me-3"></i>
                <h4 className="m-0 text-secondary">Kỹ thuật phần mềm</h4>
              </button>
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 wow fadeInLeft rounded-0"
                data-wow-delay="0.2s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-2"
                type="button"
              >
                <i className="fa fa-database fa-2x me-3"></i>
                <h4 className="m-0 text-secondary">Công nghệ thông tin</h4>
              </button>
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 wow fadeInLeft rounded-0"
                data-wow-delay="0.3s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-3"
                type="button"
              >
                <i className="fa fa-computer fa-2x me-3"></i>
                <h4 className="m-0 text-secondary">Khoa học máy tính</h4>
              </button>
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0 wow fadeInLeft rounded-0"
                data-wow-delay="0.4s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-4"
                type="button"
              >
                <i className="fa fa-server fa-2x me-3"></i>
                <h4 className="m-0 text-secondary">An toàn thông tin</h4>
              </button>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="tab-content w-100">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <div className="tab d-flex p-3">
                  <button
                    className={`tablinks ${activeTab === 'London' ? 'active' : ''}`}
                    onClick={() => handleTabClick('London')}
                  >
                    Giới thiệu
                  </button>
                  <button
                    className={`tablinks ${activeTab === 'Paris' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Paris')}
                  > Chương trình đào tạo
                  </button>
                  <button
                    className={`tablinks ${activeTab === 'Tokyo' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Tokyo')}
                  >
                    Cơ hội việc làm
                  </button>
                </div>

                {/* Tab Content */}<div id="container"
                style={{
                  width: "100%",
                  aspectRatio: "3/2",
                  margin: "auto",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  scrollSnapType: "y mandatory",
                }}>
                <div id="London" className="tabcontent" style={{ display: activeTab === 'London' ? 'block' : 'none' }}>
                  <p id="admissionCode">
                    <strong>Mã tuyển sinh: {majorData?.attributes.admissionCode}</strong>
                  </p>
                  <p id="enrollmentTarget">
                    <strong>Chỉ tiêu: {majorData?.attributes.enrollmentTarget}</strong>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: majorData?.attributes.introduction,
                    }}
                  ></div>
                </div>
                <div id="Paris" className="tabcontent" style={{ display: activeTab === 'Paris' ? 'block' : 'none' }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: majorData?.attributes.syllabus66,
                    }}
                  ></div>
                </div>
                <div id="Tokyo" className="tabcontent" style={{ display: activeTab === 'Tokyo' ? 'block' : 'none' }}>
                  <h3 style={{ fontSize: "1.2rem" }}>Chuẩn đầu ra</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: majorData?.attributes.graduateOutcomes,
                    }}
                  ></div>
                </div>
              </div>
              </div>
              <div className="tab-pane fade" id="tab-pane-2">
                <div className="row g-4">
                  <div className="col-md-6" style={{ minHeight: "350px" }}>
                    <div className="h-100">
                      <img
                        className="img-fluid w-100 h-100"
                        src="img/carousel-bg-2.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-secondary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">7480201</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-secondary">
                        Chỉ tiêu:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">180</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Quản lý
                      dự án công nghệ thông tin trong các tổ chức, doanh nghiệp
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Quản
                      trị và vận hành hệ thống công nghệ thông tin trong các tổ
                      chức
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Phân
                      tích, xử lý dữ liệu tại các doanh nghiệp và tổ chức
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Xây
                      dựng và triển khai dự án phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Nghiên
                      cứu và chuyển giao công nghệ
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Phân
                      tích và thiết kế hệ thống thông tin
                    </p>
                    <a
                      href="major/cong-nghe-thong-tin"
                      className="btn btn-primary py-3 px-5 mt-3 rounded-0"
                    >
                      Xem thêm<i className="fa fa-arrow-right ms-3"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-pane-3">
                <div className="row g-4">
                  <div className="col-md-6" style={{ minHeight: "350px" }}>
                    <div className="h-100">
                      <img
                        className="img-fluid w-100 h-100"
                        src="img/carousel-bg-3.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-secondary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">7480101</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-secondary">
                        Chỉ tiêu:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">60</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Nghiên
                      cứu chuyên sâu về Khoa học máy tính
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Nghiên
                      cứu chuyên sâu về Khoa học máy tính
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Lập
                      trình, phát triển, gia công các dự án phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Xây
                      dựng các hệ thống phân tích dữ liệu
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Nghiên
                      cứu chuyển giao công nghệ và vận hành hệ thống phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Tư vấn
                      giải pháp, thiết kế hệ thống thông tin và hệ thống phần
                      mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Giảng
                      viên, cán bộ nghiên cứu tại các trường cao đẳng, đại học
                    </p>
                    <a
                      href="major/khoa-hoc-may-tinh"
                      className="btn btn-primary py-3 px-5 mt-3 rounded-0"
                    >
                      Xem thêm<i className="fa fa-arrow-right ms-3"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-pane-4">
                <div className="row g-4">
                  <div className="col-md-6" style={{ minHeight: "350px" }}>
                    <div className="h-100">
                      <img
                        className="img-fluid w-100 h-100"
                        src="img/carousel-bg-4.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-secondary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">7480202</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-secondary">
                        Chỉ tiêu:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">60</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Bảo vệ
                      hệ thống thông tin và mạng máy tính
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Chuyên
                      thiết lập và duy trì sự an toàn cho hạ tầng mạng
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Tư vấn,
                      đánh giá và quản lý rủi ro an toàn thông tin
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Chuyên
                      gia quản trị hệ thống công nghệ thông tin
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-secondary"></i>Nghiên
                      cứu giải pháp an toàn thông tin cho các tổ chức, doanh
                      nghiệp
                    </p>
                    <a
                      href="major/an-toan-thong-tin"
                      className="btn btn-primary py-3 px-5 mt-3 rounded-0"
                    >
                      Xem thêm<i className="fa fa-arrow-right ms-3"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Enrollment;
