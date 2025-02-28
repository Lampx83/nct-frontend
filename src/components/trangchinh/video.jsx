import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Video = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => setIsVideoLoaded(true))
        .catch((error) => console.error("Autoplay failed:", error));
    }
  }, []);

  return (
    <div className="w-100 min-vh-100 position-relative overflow-hidden container-fluid">
      <video
        ref={videoRef}
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        autoPlay
        loop
        muted
        playsInline
        controls
        style={{ display: isVideoLoaded ? 'block' : 'none' }}
      >
        <source src="https://player.vimeo.com/progressive_redirect/playback/946052449/rendition/720p/file.mp4?loc=external&signature=bc3b1b5435874b658b4e3d121e991cd96fd87c23b3a049294ac6de823c99ad5b" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isVideoLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"> 
        </div>
      )}
    </div>
  );
};

export default Video;