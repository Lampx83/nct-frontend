import React, { useRef } from 'react';
import '../../css/flipcards.css';

import s3 from './imgs/s3.jpg';
import hoithao from './imgs/hoithao.jpg';
import chess from './imgs/chess.jpg';
import karate from './imgs/karate.jpg';
import Image from "next/image";

const achievementsData = [
  {
    event: 'Karate',
    image: karate,
    achievements: [
      { title: 'Huy chương bạc', count: 3 },
      { title: 'Huy chương đồng', count: 2 },
    ],
  },
  {
    event: 'Neu League S3 - Football',
    image: s3,
    achievements: [
      { title: 'Giải Phong cách', count: 1, description: 'Đội Tuyển bóng đá của Viện' },
    ],
  },
  {
    event: 'Hội thao sinh viên 2023',
    image: hoithao,
    achievements: [
      { title: 'Giải Nhất', count: 1, description: 'Thể thao điện tử nữ' },
      { title: 'Giải Nhất', count: 1, description: 'Cướp cờ' },
      { title: 'Giải Nhì', count: 1, description: 'Chạy tiếp sức nam' },
      { title: 'Giải Tập thể xuất sắc nhất', count: 1 },
    ],
  },
  {
    event: 'Giải Cờ vua - Cờ tướng 2023',
    image: chess,
    achievements: [
      { title: 'Huy chương vàng', count: 1 },
      { title: 'Huy chương bạc', count: 5 },
    ],
  }
];

const renderMedals = (title, count) => {
  let emoji;
  switch (title) {
    case 'Huy chương vàng':
      emoji = '🥇';
      break;
    case 'Huy chương bạc':
      emoji = '🥈';
      break;
    case 'Huy chương đồng':
      emoji = '🥉';
      break;
    default:
      return count;
  }
  return emoji.repeat(count);
};

function LCDAchievement() {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 900;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Thành tích Nổi bật</h2>
      <div className="position-relative">
        {achievementsData.length >= 5 && (
          <button
            className="arrow-btn position-absolute start-0 top-50 translate-middle-y"
            onClick={() => handleScroll('left')}
          >
            &larr;
          </button>
        )}
        <div
          ref={scrollRef}
          className="d-flex overflow-x-auto gap-4"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', height: 'auto', overflow: 'visible' }}>
          {achievementsData.map((achievement, index) => (
            <div
              key={index}
              className="flip-card"
              style={{
                minWidth: '300px',
                scrollSnapAlign: 'center',
              }}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Image
                    src={achievement.image}
                    alt={achievement.event}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div className="flip-card-back p-3">
                  <h5>{achievement.event}</h5>
                  <ul className="list-unstyled mt-3">
                    {achievement.achievements.map((item, i) => (
                      <li key={i}>
                        <strong>{item.title}</strong>: {renderMedals(item.title, item.count)}
                        {item.description && <p className="text-muted small">{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {achievementsData.length >= 5 && (
          <button
            className="arrow-btn position-absolute end-0 top-50 translate-middle-y"
            onClick={() => handleScroll('right')}
          >
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
}

export default LCDAchievement;