// components/ClientsSection.jsx
'use client';

const ClientsSection = () => {
  // Danh sách 6 logo từ URL bên ngoài (Flaticon làm ví dụ)
  const clients = [
    "https://cdn-icons-png.flaticon.com/512/732/732217.png", // Google
    "https://cdn-icons-png.flaticon.com/512/732/732213.png", // Facebook
    "https://cdn-icons-png.flaticon.com/512/732/732221.png", // Twitter
    "https://cdn-icons-png.flaticon.com/512/732/732225.png", // YouTube
    "https://cdn-icons-png.flaticon.com/512/732/732229.png", // LinkedIn
    "https://cdn-icons-png.flaticon.com/512/732/732233.png", // Instagram
  ];

  return (
    <section id="clients" className="clients section">
      <style jsx>{`
        .clients {
          color: #333;
          background-color: #fff;
          padding: 30px 0;
          overflow: hidden;
        }
        .clients .container {
          margin: 0 auto;
          padding: 0 15px;
        }
        .clients .clients-wrap {
          border-top: 1px solid rgba(51, 51, 51, 0.15);
          border-left: 1px solid rgba(51, 51, 51, 0.15);
          display: flex;
          flex-wrap: wrap;
        }
        .clients .client-logo {
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(51, 51, 51, 0.15);
          border-bottom: 1px solid rgba(51, 51, 51, 0.15);
          overflow: hidden;
          flex: 0 0 33.33%; /* 3 cột mỗi hàng */
          max-width: 33.33%;
          height: 150px; /* Tăng chiều cao để logo rõ hơn */
        }
        .clients .client-logo img {
          padding: 30px; /* Tăng padding để khoảng cách rộng hơn */
          max-width: 45%; /* Tăng max-width để logo lớn và rõ hơn */
          transition: transform 0.3s ease;
        }
        .clients .client-logo:hover img {
          transform: scale(1.1);
        }
        @media (max-width: 991px) {
          .clients .client-logo {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        @media (max-width: 640px) {
          .clients .client-logo {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .clients .client-logo img {
            padding: 20px;
            max-width: 70%;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="text-center fw-bold mb-3">CÁC KHOA VIỆN TRỰC THUỘC</h2>
        <div className="clients-wrap">
          {clients.map((logo, index) => (
            <div key={index} className="client-logo">
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                style={{ maxWidth: '90%', padding: '30px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;