// components/FaqSection.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

const FaqSection = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      question: 'Non consectetur a erat nam at lectus urna duis?',
      answer: 'Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida.',
    },
    {
      question: 'Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?',
      answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi.',
    },
    {
      question: 'Dolor sit amet consectetur adipiscing elit pellentesque?',
      answer: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faq" className="faq section">
      <style jsx>{`
        .faq {
          color: #333;
          background-color: #fff;
          padding: 60px 0;
          overflow: hidden;
        }
        .faq .container-fluid {
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
        }
        .faq .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }
        .faq .col-lg-7,
        .faq .col-lg-5 {
          position: relative;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
        }
        .faq .col-lg-7 {
          flex: 0 0 58.33%;
          max-width: 58.33%;
        }
        .faq .col-lg-5 {
          flex: 0 0 41.67%;
          max-width: 41.67%;
        }
        .faq .content h3 {
          font-weight: 400;
          font-size: 34px;
          color: #222;
        }
        .faq .content h3 strong {
          font-weight: 700;
        }
        .faq .content p {
          color: rgba(51, 51, 51, 0.7);
          font-size: 16px;
        }
        .faq .faq-container {
          margin-top: 15px;
        }
        .faq .faq-item {
          background-color: #fff;
          position: relative;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease-in-out;
        }
        .faq .faq-item:last-child {
          margin-bottom: 0;
        }
        .faq .faq-item h3 {
          font-weight: 600;
          font-size: 17px;
          line-height: 24px;
          margin: 0 30px 0 32px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .faq .faq-item h3:hover {
          color: #007bff;
        }
        .faq .faq-item .faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease-in-out, opacity 0.3s ease-in-out;
          visibility: hidden;
          opacity: 0;
        }
        .faq .faq-item .faq-content p {
          margin-bottom: 0;
          overflow: hidden;
          font-size: 15px;
          color: #555;
        }
        .faq .faq-item .faq-icon {
          position: absolute;
          top: 22px;
          left: 20px;
          font-size: 22px;
          line-height: 0;
          transition: 0.3s;
          color: #007bff;
        }
        .faq .faq-item .faq-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 16px;
          line-height: 0;
          transition: transform 0.3s, color 0.3s;
          cursor: pointer;
        }
        .faq .faq-item .faq-toggle:hover {
          color: #007bff;
        }
        .faq .faq-item.faq-active h3 {
          color: #007bff;
        }
        .faq .faq-item.faq-active .faq-content {
          grid-template-rows: 1fr;
          visibility: visible;
          opacity: 1;
          padding-top: 10px;
        }
        .faq .faq-item.faq-active .faq-toggle {
          transform: rotate(90deg);
          color: #007bff;
        }
        .faq .order-2 {
          order: 2;
        }
        .faq .order-lg-1 {
          order: -1;
        }
        .faq .order-1 {
          order: 1;
        }
        .faq .order-lg-2 {
          order: 2;
        }
        .faq .d-flex {
          display: flex;
        }
        .faq .flex-column {
          flex-direction: column;
        }
        .faq .justify-content-center {
          justify-content: center;
        }
        .faq .px-xl-5 {
          padding-left: 3rem;
          padding-right: 3rem;
        }
        .faq .img-fluid {
          max-width: 100%;
          height: auto;
        }
        @media (max-width: 991px) {
          .faq .col-lg-7 {
            flex: 0 0 100%;
            max-width: 100%;
            order: 2;
          }
          .faq .col-lg-5 {
            flex: 0 0 100%;
            max-width: 100%;
            order: 1;
          }
        }
        @media (max-width: 768px) {
          .faq .content h3 {
            font-size: 28px;
          }
          .faq .faq-item h3 {
            font-size: 16px;
          }
          .faq .px-xl-5 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      <div className="container-fluid">
        <div className="row gy-4">
          <div className="col-lg-7 d-flex flex-column justify-content-center order-2 order-lg-1">
            <div className="content px-xl-5">
              <h3>
                <span>Frequently Asked </span>
                <strong>Questions</strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="faq-container px-xl-5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeFaq === index ? 'faq-active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <i className="faq-icon">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/189/189638.png"
                      alt="Question Icon"
                      width={22}
                      height={22}
                    />
                  </i>
                  <h3>{faq.question}</h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i className="faq-toggle">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
                      alt="Toggle Icon"
                      width={16}
                      height={16}
                    />
                  </i>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5 order-1 order-lg-2">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
              alt="FAQ Image"
              width={500}
              height={400}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;