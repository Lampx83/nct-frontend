// InfoBlock.js
'use client';
import React from 'react';

export default function InfoBlock({ node, isActive, refProp }) {
  const blocks = node.attributes.imageBlocks?.slice(0, 2) || [];
  return (
    <div
      ref={refProp}
      className="mb-4 p-3 border-top"
      style={{
        scrollMarginTop: 120,
        background: isActive ? '#fffbe7' : '#fff',
        transition: 'background 0.6s',
        borderRadius: 12,
      }}
    >
      {/* Chèn link Google Fonts chỉ ở đây */}
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />

      <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>{node.attributes.name}</h5>
      {blocks.map((block, idx) => (
        <div className={`row mb-2 align-items-stretch${idx === 1 ? " flex-row-reverse" : ""}`} key={idx}>
          <div className="col-md-6 d-flex align-items-stretch">
            <div
              style={{
                width: "100%",
                height: 320,
                background: "#f8f8f8",
                borderRadius: 10,
                overflow: "hidden",
                display: "flex",
                alignItems: "center"
              }}
            >
              {block?.image?.data && (
                <img
                  src={getImageUrl(block)}
                  alt={`Ảnh ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              )}
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div
              style={{
                textAlign: 'justify',
                fontSize: 16,
                fontFamily: 'Roboto, Arial, sans-serif !important',
                color: '#1a1a1a'
              }}
              dangerouslySetInnerHTML={{ __html: block?.description || "" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function getImageUrl(block) {
  const imageData = block?.image?.data?.attributes;
  if (!imageData) return null;
  let url = imageData.formats?.medium?.url || imageData.url;
  if (url && !url.startsWith('http')) url = "https://nct.neu.edu.vn/admin" + url;
  return url;
}
