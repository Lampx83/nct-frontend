import React, { useState, useEffect } from 'react';

function SendForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
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
                message: formData.message
            }
        };

        fetch('https://fit.neu.edu.vn/admin/api/contact-infors', {
            method: 'POST',
            body: JSON.stringify(submitContent),
            headers: {
                'Content-Type': 'application/json'
            }
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
                console.error('Error:', error);
                alert("Có lỗi xảy ra, vui lòng thử lại sau.");
            });
    };

    const [infoContact, setInfoContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fit.neu.edu.vn/admin/api/contact-page");
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
        <div className="container">
            {isSuccess ? (
                <div className="text-center mt-3 blockquote bg-light px-1 py-4">
                    <i className="fas fa-envelope fa-4x" style={{ color: '#006dd3' }}></i>
                    <h2 className="mt-3">Đã gửi tin nhắn thành công! </h2>
                    <p>Cảm ơn bạn đã quan tâm đến chúng tôi! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                    <h3>Xin cảm ơn!</h3>
                    <a href="/">
                        <button type="button" className="mt-3 btn btn-primary rounded-3 px-3 py-2">Trở về Trang chủ</button>
                    </a>
                </div>
            ) : (
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                    <form id="contactForm"
                        style={{
                            maxWidth: '330px',
                            margin: '10px auto',
                            border: "1px solid #bdc1ca",
                            borderRadius: "10px",
                            textAlign: "center",
                            padding: "15px",
                            backgroundColor: "white",
                            fontSize: "14px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                        }}
                        onSubmit={handleSubmit}>
                        <p style={{ color: "#006bbd" }}><b>ĐĂNG KÍ NHẬN TƯ VẤN</b></p>
                        <div className="container ">

                            <input
                                required
                                type="text"
                                className="form-control mt-2"
                                id="name"
                                name="name"
                                placeholder="Họ và tên"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ height: '38px' }}
                            />

                            <input
                                required
                                type="tel"
                                className="form-control mt-2"
                                id="phone"
                                name="phone"
                                pattern="[0-9]{1}[0-9]{9}"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ height: '38px' }}
                            />

                            <input
                                required
                                type="email"
                                className="form-control mt-2"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ height: '38px' }}
                            />

                            <input
                                required
                                type="text"
                                className="form-control mt-2"
                                id="subject"
                                name="subject"
                                placeholder="Tiêu đề"
                                value={formData.subject}
                                onChange={handleChange}
                                style={{ height: '38px' }}
                            />

                            <input
                                required
                                className="form-control mt-2"
                                placeholder="Nội dung"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary w-100 mt-2" type="submit">Gửi Tin Nhắn</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SendForm;
