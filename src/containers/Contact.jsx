"use client";
import React, { useState, useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = "Liên hệ | Khoa Công nghệ thông tin";
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitContent = {
      data: {
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    };

    fetch("https://fit.neu.edu.vn/admin/api/contact-infors", {
      method: "POST",
      body: JSON.stringify(submitContent),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert("Error: " + res.error.message);
        } else {
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      });
  };

  const [infoContact, setInfoContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fit.neu.edu.vn/admin/api/contact-page"
        );
        const json = await response.json();
        setInfoContact(json.data.attributes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !infoContact) {
    return <></>;
  }

  return (
    <div>
      <div className="container-xxl pt-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-5 text-primary">Liên hệ với Chúng tôi</h1>
          </div>
          <div className="row g-4">
            <div className="col-12">
              <div className="row align-items-stretch">
                <div className="col-md-4 hover-primary-light">
                  <div className="d-flex  flex-column justify-content-center p-4">
                    <h5 className="text-uppercase">Địa chỉ</h5>
                    <p className="m-0">
                      <i className="fa fa-envelope-open me-2"></i>
                      {infoContact.address}
                    </p>
                  </div>
                </div>
                <div className="col-md-4 hover-primary-light">
                  <div className="d-flex  flex-column justify-content-center p-4">
                    <h5 className="text-uppercase">Số điện thoại</h5>
                    <p className="m-0">
                      <i className="fa fa-envelope-open me-2"></i>
                      {infoContact.phone}
                    </p>
                  </div>
                </div>
                <div className="col-md-4 hover-primary-light">
                  <div className="d-flex flex-column justify-content-center p-4">
                    <h5 className="text-uppercase">Email</h5>
                    <p className="m-0">
                      <i className="fa fa-envelope-open me-2"></i>
                      {infoContact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.813938375038!2d105.84249919999999!3d21.0000942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac71752d8f79%3A0xd2ec575c01017afa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBLaW5oIFThur8gUXXhu5FjIETDom4gKE5FVSk!5e0!3m2!1svi!2s!4v1718936808795!5m2!1svi!2s"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="col-md-6">
              {isSuccess ? (
                <div className="text-center mt-3 blockquote bg-light px-1 py-4">
                  <i
                    className="fas fa-envelope fa-4x"
                    style={{ color: "#006dd3" }}
                  ></i>
                  <h2 className="mt-3">Đã gửi tin nhắn thành công! </h2>
                  <p>
                    Cảm ơn bạn đã quan tâm đến chúng tôi! Chúng tôi sẽ liên hệ
                    với bạn trong thời gian sớm nhất.
                  </p>
                  <h3>Xin cảm ơn!</h3>
                  <a href="/">
                    <button
                      type="button"
                      className="mt-3 btn btn-primary rounded-3 px-3 py-2"
                    >
                      Trờ về Trang chủ
                    </button>
                  </a>
                </div>
              ) : (
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <p className="mb-4" style={{ textAlign: "justify" }}>
                    Cảm ơn bạn đã quan tâm đến chúng tôi! Nếu bạn có bất kỳ câu
                    hỏi, góp ý hoặc cần hỗ trợ, xin vui lòng điền vào biểu mẫu
                    dưới đây. Nhấp vào nút "Gửi Tin Nhắn" để hoàn tất quá trình.
                    Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Xin
                    cảm ơn!
                  </p>
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          <label htmlFor="name">Họ và tên</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            required
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            pattern="[0-9]{1}[0-9]{9}"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          <label htmlFor="phone">Số điện thoại</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            required
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="email">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                          />
                          <label htmlFor="subject">Tiêu đề</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            required
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            name="message"
                            style={{ height: "100px" }}
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                          <label htmlFor="message">Nội dung</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Gửi Tin Nhắn
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
