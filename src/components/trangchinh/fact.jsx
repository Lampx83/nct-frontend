// components/StatsSection.jsx
'use client';

const StatsSection = () => {
  return (
    <section id="stats" className="stats section dark-background my-5">
      <style jsx>{`
        .stats {
          position: relative;
          color: #fff;
          background-color: #060606;
          padding: 30px 0;
          overflow: hidden;
        }
        .stats img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }
        .stats:before {
          content: '';
          background: rgba(6, 6, 6, 0.8);
          position: absolute;
          inset: 0;
          z-index: 2;
        }
        .stats .container {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }
        .stats .subheading {
          text-align: center;
          margin-bottom: 40px;
        }
        .stats .subheading h3 {
          font-weight: 700;
          font-size: 36px;
          color: #fff;
          margin-bottom: 10px;
        }
        .stats .subheading p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
        .stats .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }
        .stats .col-lg-3,
        .stats .col-md-6 {
          position: relative;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
        }
        .stats .col-lg-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }
        .stats .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }
        .stats .stats-item {
          padding: 30px;
          width: 100%;
          text-align: center;
        }
        .stats .stats-item span {
          font-size: 48px;
          display: block;
          color: #fff;
          font-weight: 700;
          line-height: 1;
        }
        .stats .stats-item p {
          padding: 0;
          margin: 10px 0 0 0;
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Raleway', sans-serif;
        }
        @media (max-width: 991px) {
          .stats .col-lg-3 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        @media (max-width: 767px) {
          .stats .subheading h3 {
            font-size: 28px;
          }
          .stats .stats-item span {
            font-size: 36px;
          }
          .stats .stats-item p {
            font-size: 14px;
          }
          .stats .col-lg-3 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>

      {/* Thay Image bằng img để tránh lỗi cấu hình hostname */}
      <img
        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
        alt="Stats Background"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      <div className="container">
        {/* <div className="subheading">
          <h3>Những Thành Tựu Đã Đạt Được</h3>
          <p>Iusto et labore modi qui sapiente xpedita tempora et aut non ipsum consequatur illo.</p>
        </div> */}

        <div className="row gy-4">
          <div className="col-lg-3 col-md-3">
            <div className="stats-item">
              <span>232</span>
              <p>Giảng Viên</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="stats-item">
              <span>521</span>
              <p>Sinh Viên<nav></nav></p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="stats-item">
              <span>6</span>
              <p>Khoa</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="stats-item">
              <span>32</span>
              <p>Chương Trình Đào Tạo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;