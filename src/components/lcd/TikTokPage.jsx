import React, { useEffect } from "react";

const TikTokEmbed = ({ videoId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!videoId) return <p>No video ID provided</p>;

  // Inline styles
  const containerStyle = {
    maxWidth: "100%",
    overflow: "hidden",
    margin: "0 auto",
  };

  const embedStyle = {
    maxWidth: "100%",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@lcdkcntt.nct.neu/video/${videoId}`}
        data-video-id={videoId}
        style={embedStyle}
      >
        <section>Loading TikTok...</section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbed;