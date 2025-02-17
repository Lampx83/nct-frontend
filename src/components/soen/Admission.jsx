import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaAlignJustify, FaList } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function Admission() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [admissions, setAdmissions] = useState([]);

    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const response = await axios.get('https://fit.neu.edu.vn/admin/api/se-landing-page?populate=deep');
                const admissionMethods = response.data.data.attributes.admissionMethodBlock;
                setAdmissions(admissionMethods);

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
        fetchAdmissionData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-12 col-md-6">
                    <h1>{admissions.title}</h1>
                </div>
            </div>
            {admissions.methods.map((admission, index) => (
                <div key={index} data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}>
                    <div className="row mb-4">
                        {index%2== 1 ? (
                            <>
                                <div
                                    className="col-12 col-md-6 d-flex align-items-center justify-content-end p-3"
                                    style={{ border: "3px solid #246499", borderRadius: "10px", gap: "1rem" }}
                                >
                                    <div className="admissioncontent text-end" style={{ lineHeight: "0.5" }}>
                                        <p><b>{admission.title}</b></p>
                                        <p>({admission.target})</p>
                                        <p>{admission.criterias}</p>
                                    </div>
                                    <div className="iconcontent">
                                        <FaList style={{ fontSize: "50px" }} />
                                    </div>
                                </div>


                                <div className="col-12 col-md-6"></div>
                            </>
                        ) : (
                            // Các trường hợp khác
                            <>
                                <div className="col-12 col-md-6"></div>
                                <div className="col-12 col-md-6 d-flex align-items-center p-3" style={{ border: "3px solid #246499", borderRadius: "10px", gap: "1rem" }}>
                                    <div className="iconcontent">
                                        {index === 0 ? <FaAlignLeft style={{ fontSize: "50px" }} /> : <FaAlignJustify style={{ fontSize: "50px" }} />}
                                    </div>
                                    <div className="admissioncontent" style={{ lineHeight: "0.5" }}>
                                        <p><b>{admission.title}</b></p>
                                        <p>{admission.target}</p>
                                        <p>{admission.criterias}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}

        </div>
    );
}

export default Admission;
