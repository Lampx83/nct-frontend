// components/IntroInfo.js
import React, { useEffect,useState } from "react";
import 'aos/dist/aos.css';
import axios from 'axios';
import IntroductionImage from "./imgs/IntroductionImage.png";
import Image from 'next/image';

const IntroInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intro, setIntro] = useState([]);

  useEffect(() => {
      const fetchIntro = async () => {
          try {
              const response = await axios.get('https://fit.neu.edu.vn/admin/api/se-landing-page?populate=deep');
              const data = response.data.data.attributes;
              setIntro(data);
          } catch (err) {
              setError(err);
          } finally {
              setLoading(false);
          }
      };
      fetchIntro();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 pt-4" style={{ minHeight: '400px' }}>
            <div className="position-relative h-100 wow fadeIn" data-wow-delay="0.1s">
              <Image
                className="position-absolute img-fluid w-100 h-100 p-0 F"
                src={IntroductionImage}
                style={{
                  objectFit: 'cover',
                  backgroundColor: 'white',
                  margin: '0',
                  top: '0', right: "0",
                  borderBottomLeftRadius: "0"
                }}
                alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="mb-4 fw-bolder"><span className="color-custom2">Khoa Công nghệ Thông tin</span></h1>
            <div className="mb-4" style={{ textAlign: 'justify' }}>
            <div
                  dangerouslySetInnerHTML={{
                    __html: intro.introduction.content,
                  }}
                ></div>
            </div>
          </div>
        </div>
      </div>
   
        </>
    );
};

export default IntroInfo;
