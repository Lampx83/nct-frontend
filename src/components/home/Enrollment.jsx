import React from "react";

function Enrollment() {
  return (
    <div className="container-xxl service">
      <div className="ps-3 pe-3">
        <div className="text-center wow fadeInDown" data-wow-delay="0.1s">
          <h6 className=" text-uppercase fs-6 text-primary">
            Dự kiến tuyển sinh
          </h6>
          <h1 className="mb-5 text-primary">- Năm 2025 -</h1>
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
                <h4 className="m-0 text-primary">Kỹ thuật phần mềm</h4>
              </button>
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 wow fadeInLeft rounded-0"
                data-wow-delay="0.2s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-2"
                type="button"
              >
                <i className="fa fa-database fa-2x me-3"></i>
                <h4 className="m-0 text-primary">Công nghệ thông tin</h4>
              </button>
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 wow fadeInLeft rounded-0"
                data-wow-delay="0.3s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-3"
                type="button"
              >
                <i className="fa fa-computer fa-2x me-3"></i>
                <h4 className="m-0 text-primary">Khoa học máy tính</h4>
              </button>
              <button
                className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0 wow fadeInLeft rounded-0"
                data-wow-delay="0.4s"
                data-bs-toggle="pill"
                data-bs-target="#tab-pane-4"
                type="button"
              >
                <i className="fa fa-server fa-2x me-3"></i>
                <h4 className="m-0 text-primary">An toàn thông tin</h4>
              </button>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="tab-content w-100">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <div className="row g-4">
                  <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="h-100">
                      <img
                        className="img-fluid w-100 h-100"
                        src="images/carousel-bg-1.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-6 wow fadeInRight d-flex flex-column"
                    data-wow-delay="0.1s"
                  >
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">EP17</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="mb-3 fs-3 text-primary">Chỉ tiêu:</h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">45</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Khởi
                      nghiệp các dự án phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Thiết kế,
                      lập trình, kiểm thử, triển khai phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Quản lý
                      dự án phần mềm từ lập kế hoạch đến triển khai
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Thiết kế
                      và phát triển game trên nhiều nền tảng
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Đào tạo
                      và tư vấn về giải pháp phát triển phần mềm
                    </p>
                    <a
                      href="major/ky-thuat-phan-mem"
                      className="btn btn-primary py-3 px-5 mt-3 rounded-0"
                    >
                      Xem thêm<i className="fa fa-arrow-right ms-3"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-pane-2">
                <div className="row g-4">
                  <div className="col-md-6" style={{ minHeight: "350px" }}>
                    <div className="h-100">
                      <img
                        className="img-fluid w-100 h-100"
                        src="images/carousel-bg-2.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column">
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">7480201</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Chỉ tiêu:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">90</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Quản lý
                      dự án công nghệ thông tin
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Quản trị
                      và vận hành hệ thống công nghệ thông
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Phân
                      tích, xử lý dữ liệu
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Xây dựng
                      và triển khai dự án phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Nghiên
                      cứu và chuyển giao công nghệ
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Phân tích
                      và thiết kế hệ thống thông tin
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
                        src="images/carousel-bg-3.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column">
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">7480101</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Chỉ tiêu:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">45</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Nghiên
                      cứu chuyên sâu về Khoa học máy tính
                    </p>

                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Lập
                      trình, phát triển, gia công các dự án phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Xây dựng
                      các hệ thống phân tích dữ liệu
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Nghiên
                      cứu chuyển giao công nghệ và vận hành hệ thống phần mềm
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Tư vấn
                      giải pháp, thiết kế hệ thống thông tin và hệ thống phần
                      mềm
                    </p>

                    <a
                      href="major/khoa-hoc-may-tinh-7480101"
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
                        src="images/carousel-bg-4.jpg"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column">
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Mã tuyển sinh:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">7480202</h5>
                    </div>
                    <div className="d-flex">
                      <h5 className="fw-bold mb-3 fs-3 text-primary">
                        Chỉ tiêu:
                      </h5>
                      <h5 className="mb-3 text-dark fs-3 ms-1">45</h5>
                    </div>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Bảo vệ hệ
                      thống thông tin và mạng máy tính
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Chuyên
                      thiết lập và duy trì sự an toàn cho hạ tầng mạng
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Tư vấn,
                      đánh giá và quản lý rủi ro an toàn thông tin
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Chuyên
                      gia quản trị hệ thống công nghệ thông tin
                    </p>
                    <p>
                      <i className="fa fa-check me-3 text-primary"></i>Nghiên
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
