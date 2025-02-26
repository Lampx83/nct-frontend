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
    <div className="w-100 min-vh-100 position-relative overflow-hidden">
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
        <source src="https://download-video-ak.vimeocdn.com/v3-1/playback/e016d47c-7993-4989-affd-ebfaa6187753/1ae2e152-1d6bb0c6?__token__=st=1740547323~exp=1740561723~acl=%2Fv3-1%2Fplayback%2Fe016d47c-7993-4989-affd-ebfaa6187753%2F1ae2e152-1d6bb0c6%2A~hmac=80cb0d0cd93c9eba52498ebde7ea2b7e7ef4ead0c1999be6e7df7815710eb001&r=dXMtd2VzdDE%3D" type="video/mp4" />
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