import { ShareAltOutlined, BranchesOutlined } from "@ant-design/icons";
import Student1 from "./imgs/Student1.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function Share() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shareStudent, setShareStudent] = useState([]);
    const [shareCompany, setShareComapny] = useState([]);

    useEffect(() => {
        const fetchShareData = async () => {
            try {
                const response = await axios.get('https://fit.neu.edu.vn/admin/api/se-landing-page?populate=deep');
                const data = response.data.data.attributes;
                setShareStudent(data.studentFeedbackBlock);
                setShareComapny(data.businessFeedbackBlock);
                // console.log(data);

                AOS.init({
                    duration: 1200,
                    once: true,
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchShareData();
    }, []);

    if (loading) return <p>Loading...</p>;
    const strapiBaseURL = 'https://fit.neu.edu.vn/admin';
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <div className="container">
                <div className="studentshare">
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">

                        <h1>Sinh viên Kỹ nghệ phần mềm</h1>
                        <h1>chia sẻ <ShareAltOutlined /></h1>
                    </div>
                    <div className="row">
                        {shareStudent.feedbacks.map((share, index) => (
                            <div className="col-md-6">
                                <div className="share" style={{ width: "100%", background: "#f3f4f6", marginBottom: "20px" }}>
                                    <br />
                                    <div className="info_student d-flex align-items-center gap-4" style={{ background: "#246499", color: "white", width: "90%", padding: "10px", margin: "0 auto" }}>
                                        <img src={`${strapiBaseURL}${share.avatar.data.attributes.formats.thumbnail.url}`}
                                         alt="Student_image" style={{ width: "90px", height: "90px", borderRadius: "50%" }} />
                                        <div>
                                            <p><b>{share.name}</b></p>
                                            <p>{share.info}</p>
                                        </div>
                                    </div>
                                    <div className="shareofstudent" style={{ padding: "20px 40px" }}>
                                    <p dangerouslySetInnerHTML={{ __html: share.content }} />
                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>


                <div className="companyshare" style={{ padding: "20px" }}>
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">
                        <h1 className="text-center">DOANH NGHIỆP CHIA SẺ <BranchesOutlined /></h1></div>
                    <br />
                    {shareCompany.feedbacks.map((share, index) => (
                        <div key={index} className="share d-flex p-4 gap-4" style={{ background: "#f3f4f6", marginBottom: "20px" }}>
                            <div className="info_company">
                                <img src={`${strapiBaseURL}${share.avatar.data.attributes.formats.thumbnail.url}`}
                                    alt="Company_image"
                                    style={{ width: "100px", height: "autoauto", borderRadius: "8px" }} />
                            </div>
                            <div className="share_company">
                                <p dangerouslySetInnerHTML={{ __html: share.content }} />

                            </div>
                        </div>
                    ))}


                </div>
            </div>

        </>
    );
}

export default Share;
