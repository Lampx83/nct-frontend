"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import config from "@/utils/config";
import Link from "next/link";
import "../css/aboutus.css"

const AboutUs = ({ aboutUs }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

    return (
        <>
            {/* Banner */}
            <div style={{ position: "relative", textAlign: "center" }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                ></div>
                <img
                    src="/images/Topbanner.jpg"
                    alt="Banner Tin tức"
                    style={{
                        width: "100%",
                        maxHeight: "250px",
                        objectFit: "cover",
                    }}
                />
            </div>

            <div className="container">
                <h4 >
                    TRƯỜNG CÔNG NGHỆ – ĐẠI HỌC KINH TẾ QUỐC DÂN
                </h4>
                <h3 className="text-dark">LỜI CHÀO MỪNG</h3>
                <div className="box">
                    <div className="image">
                        <img src={`${config.API_URL}${aboutUs.attributes.thumbnail.data.attributes.url}`} />
                    </div>
                    <div className="content">
                        <div dangerouslySetInnerHTML={{ __html: aboutUs.attributes.content }}></div>
                    </div>
                </div>
            </div>

            {/* Hiệu ứng quay */}
            <div className="container">
                <div className="row bg-primary text-white py-5">
                    <div className="col-md-9 mx-auto text-center">
                        <h2 className="text-white fw-bold py-1">TIÊN PHONG – ĐỘT PHÁ – SÁNG TẠO</h2>
                        <p className="fs-7">
                            Trường Công nghệ – một thành viên của Trường Đại học Kinh tế Quốc dân, nơi khai phóng tiềm năng công nghệ và sáng tạo.<br />
                            Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.
                        </p>
                    </div>
                </div>

                {/* Section có hiệu ứng quay */}
                <motion.div
                    ref={ref}
                    className="row bg-white py-5"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ transformOrigin: "center" }}
                >
                    <div className="col-md-8 mx-auto text-center py-4">
                        <h4 className="text-primary fw-bold">
                            TRƯỜNG CÔNG NGHỆ – TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN
                        </h4>
                        <h1 className="text-dark fw-bold" style={{ fontSize: "60px" }}>
                            KHÁM PHÁ NCT
                        </h1>

                        <div className="mt-4 d-flex justify-content-center">
                            <Link href="/tuyen-sinh" target="_blank">
                                <div className="bg-primary border-2 text-white fw-bold px-3 py-2 mx-2">
                                    THÔNG TIN TUYỂN SINH
                                </div>
                            </Link>
                            <Link href="https://360.neu.edu.vn/" target="_blank">
                                <div className="bg-primary border-2 text-white fw-bold px-3 py-2 mx-2">
                                    VIRTUAL TOUR
                                </div>
                            </Link>
                            <Link href="#">
                                <div className="bg-primary text-white fw-bold px-3 py-2 mx-2">
                                    CHƯƠNG TRÌNH HỌC
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AboutUs;
