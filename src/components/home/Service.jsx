import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Import CSS cho Splide
import '../../css/Service.css';

function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://nct-frontend-liard.vercel.app/admin/api/services?populate=*');
        const data = await response.json();
        setServices(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Mẫu dữ liệu dự phòng nếu API không hoạt động
  const fallbackServices = [
    {
      id: 1,
      attributes: {
        title: "Chương trình giáo dục chất lượng cao",
        description: "Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.",
        image: {
          data: {
            attributes: {
              url: "https://nct.neu.edu.vn/wp-content/uploads/2024/05/220814_ISFA_NEU08-1.png"
            }
          }
        }
      }
    },
    {
      id: 2,
      attributes: {
        title: "Giảng viên giàu kinh nghiệm",
        description: "Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.",
        image: {
          data: {
            attributes: {
              url: "https://nct.neu.edu.vn/wp-content/uploads/2024/05/220814_ISFA_NEU0811.png"
            }
          }
        }
      }
    },
    {
      id: 3,
      attributes: {
        title: "Chất lượng giáo dục đảm bảo chuẩn quốc tế",
        description: "Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.",
        image: {
          data: {
            attributes: {
              url: "https://nct.neu.edu.vn/wp-content/uploads/2024/05/220814_ISFA_NEU0812.png"
            }
          }
        }
      }
    },
    {
        id: 4,
        attributes: {
          title: "Đối tác đào tạo trong top 1000 thế giới",
          description: "Chúng tôi cam kết cung cấp một nền giáo dục chất lượng cao, đáp ứng nhu cầu thực tiễn và xu hướng phát triển toàn cầu.",
          image: {
            data: {
              attributes: {
                url: "https://nct.neu.edu.vn/wp-content/uploads/2024/05/4833ce6317447ce428ba973bd7531318.jpg"
              }
            }
          }
        }
      }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  // Hàm chia mảng thành các nhóm nhỏ hơn
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  // Xác định số lượng cards trên mỗi slide dựa vào kích thước màn hình
  const getCardsPerSlide = () => {
    if (windowWidth >= 768 && windowWidth < 992) return 2;
    if (windowWidth >= 576 && windowWidth < 768) return 2;
    if (windowWidth < 576) return 1;
    return 3;
  };

  const renderNormalView = () => (
    <div className="row g-4">
      {displayServices.map((service, index) => (
        <div key={service.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );

  const renderSplideView = () => {
    const cardsPerSlide = getCardsPerSlide();

    return (
      <Splide options={{
        rewind: true,
        type: "loop",
        perPage: 3,
        gap: 20,
        arrows: true,
        pagination: false,
        breakpoints: {
          768: {
            perPage: 2,
          },
          576: {
            perPage: 1,
          },
        },
      }}>
        {displayServices.map((service) => (
          <SplideSlide key={service.id}>
            <ServiceCard service={service} />
          </SplideSlide>
        ))}
      </Splide>
    );
  };

  // Component cho mỗi card
  const ServiceCard = ({ service }) => {
    const imageUrl = service.attributes.image?.data?.attributes?.url;
    const fullImageUrl = imageUrl ? 
      (imageUrl.startsWith('/') && !imageUrl.startsWith('//') ? 
        `https://nct-frontend-liard.vercel.app/admin${imageUrl}` : imageUrl) 
      : '';

    return (
      <div className="service-card">
        <div className="service-image">
          <img 
            src={fullImageUrl || '/images/default-service.jpg'} 
            alt={service.attributes.title} 
            className="img-fluid"
          />
        </div>
        <div className="service-header">
          <h4>{service.attributes.title}</h4>
        </div>
        <div className="service-content">
          <p>{service.attributes.description}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="service-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="utm-trajan text-white">TẠI SAO NÊN CHỌN TRƯỜNG CÔNG NGHỆ</h2>
        </div>
        {windowWidth >= 1200 ? renderNormalView() : renderSplideView()}
      </div>
    </section>
  );
}

export default Service;