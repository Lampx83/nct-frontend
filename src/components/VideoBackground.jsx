import React from 'react';
import '../css/videoBackground.css'; // Đảm bảo bạn có file CSS này

const VideoBackground = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="video-background">
        <source src="https://nct-frontend-liard.vercel.app/admin/uploads/1ae2e152_1d6bb0c6_81880541fa.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <div className="overlay-text">
            <p>Đón đầu công nghệ
                <span>Tạo dựng tương lai</span>
            </p>
            <h1>TRƯỜNG CÔNG NGHỆ - ĐẠI HỌC KINH TẾ QUỐC DÂN</h1>
        </div>
        <div className='scrolldown'>
            <div className="chevrons">
                <div className='chevrondown'></div>
                <div className='chevrondown'></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground; 