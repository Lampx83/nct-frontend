'use client';
import React, { useState } from 'react';

export default function ChatIconButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.open('https://neutech.ai.vn/', '_blank');
  };

  return (
    <div
      className="position-fixed bottom-0 start-0 m-4"
      style={{ zIndex: 9999 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={handleClick}
        className="d-flex align-items-center border-0 bg-transparent p-0"
        style={{ cursor: 'pointer' }}
        title="Chat với chúng tôi"
      >
        {/* Nút icon tròn */}
        <div
          className="rounded-circle bg-white border border-primary shadow-sm"
          style={{
            width: '60px',
            height: '60px',
            borderWidth: '2px',
            flexShrink: 0,
          }}
        >
          <img
            src="https://nct.neu.edu.vn/admin/uploads/Chatbot_3032cc37e9.jpg"
            alt="Chat Icon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Tag hiện bên phải khi hover */}
        <div
          className={`ms-2 ${hovered ? 'opacity-100 translate-start-0' : 'opacity-0 translate-start-50'}`}
          style={{
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            background: '#fff',
            border: '1px solid #0d6efd',
            color: '#0d6efd',
            padding: '8px 12px',
            borderRadius: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            whiteSpace: 'nowrap',
          }}
        >
          Hãy chat với chúng tôi
        </div>
      </button>
    </div>
  );
}
