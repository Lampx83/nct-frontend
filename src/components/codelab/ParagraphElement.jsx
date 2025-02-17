import React, { useState, useEffect } from "react";
import config from "../../config";
import MathComponent from "./MathComponent";

const ParagraphElement = ({ element, index, chap }) => {
  const { textRun, inlineObjectElement, equation } = element;

  const [imageClass, setImageClass] = useState("image-content");

  useEffect(() => {
    if (inlineObjectElement) {
      const { inlineObjectId } = inlineObjectElement;
      const img = new Image();
      img.src = `${config.API_BASE_URL}/images/${inlineObjectId}`;

      img.onload = () => {
        if (img.width > 1.4 * img.height) {
          setImageClass("landscape"); // Ảnh ngang
        } else if (img.width < 0.8 * img.height) {
          setImageClass("portrait"); // Ảnh dọc
        } else {
          setImageClass("square"); // Ảnh vuông hoặc gần vuông
        }
      };
    }
  }, [inlineObjectElement]);

  if (inlineObjectElement) {
    const { inlineObjectId } = inlineObjectElement;
    return (
      <img
        key={index}
        src={`${config.API_BASE_URL}/images/${inlineObjectId}`}
        alt={`Image ${index}`}
        className={imageClass}
      />
    );
  }

  if (equation) {
    return <MathComponent content={equation} />;
  }

  if (!textRun) {
    return null; // Skip if textRun is undefined
  }

  const { textStyle } = textRun;
  const isBold = textStyle && textStyle.bold;
  const isItalic = textStyle && textStyle.italic;
  const content = textRun.content;

  if (content === undefined) {
    return null; // Skip if content is undefined
  }

  if (textStyle && textStyle.link) {
    const { url, underline } = textStyle.link;
    return (
      <a
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: underline ? "underline" : "none" }}
      >
        {content}
      </a>
    );
  }

  const isYouTubeLink = content.match(
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  const aspectRatio = 9 / 16;
  const calculatedHeight = `calc(100vw * ${aspectRatio})`;

  if (isYouTubeLink) {
    const videoId = isYouTubeLink[1];
    return (
      <div key={index} style={{ width: "100%", height: calculatedHeight }}>
        <iframe
          title={`YouTube Video ${index}`}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <>
      {isBold && isItalic ? (
        <strong>
          <em>{content}</em>
        </strong>
      ) : isBold ? (
        <strong>{content}</strong>
      ) : isItalic ? (
        <em>{content}</em>
      ) : (
        content
      )}
    </>
  );
};

export default ParagraphElement;
