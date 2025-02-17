import React, { useState, useEffect } from 'react';

function Video() {
  const [videoUrl, setVideoUrl] = useState('');

  const fetchVideo = async () => {
    try {
      const response = await fetch('https://fit.neu.edu.vn/admin/api/index-page?populate=*');
      const data = await response.json();
      setVideoUrl(data.data.attributes.videoThumbnail);
    } catch (error) {
      console.error("Lỗi khi tải video:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  // Hàm chuyển đổi URL YouTube thành embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  // Nếu không có URL video, không render gì cả
  if (!videoUrl) return null;

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-12">
            <div className="text-center">
              <i className="fa-solid fa-film fa-2x text-primary"></i>
              <h1 className="mb-5 fs-1 text-primary">- Video nổi bật -</h1>
            </div>
            <div className="position-relative">
              <iframe
                width="100%"
                height="600"
                src={getEmbedUrl(videoUrl)}
                title="FIT NEU Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;