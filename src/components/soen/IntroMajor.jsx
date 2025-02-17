import React, { useEffect, useState } from "react";
import Intro from "./imgs/Intro.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function IntroMajor() {
    const [IntroMajor, setIntroMajor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchIntroMajor = async () => {
        try {
          const response = await axios.get('https://fit.neu.edu.vn/admin/api/se-landing-page?populate=deep');
          const data = response.data.data.attributes;
          setIntroMajor(data);
          AOS.init({
            duration: 1200, // Thời gian hiệu ứng (ms)
            once: true, // Chỉ chạy hiệu ứng một lần khi scroll
        });

        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchIntroMajor();
    }, []);
  
    if (error) return <p>Error loading carousel data.</p>;
  
    const strapiBaseURL = 'https://fit.neu.edu.vn/admin';

    return (
        <>
            <div className="container">
                <div className="row my-4">
                    {/* Cột chứa hình ảnh */}
                    <div className="col-md-4">
                        <div data-aos="fade-right">
                            <img
                                src={Intro}
                                alt="intro_image"
                                className="img-fluid"
                                style={{ height: "250px", width: "300px" }}
                            />
                        </div>
                    </div>

                    <div className="col-md-8 d-flex flex-column justify-content-center">
                        <div data-aos="fade-left">
                        <div dangerouslySetInnerHTML={{ __html: IntroMajor.introduction }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IntroMajor;
