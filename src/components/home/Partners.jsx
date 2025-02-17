import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Partners() {
  return (
    <div className="container-fluid pt-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container partners">
        <div className="text-center">
          <h6 className="text-uppercase">
            <i className="fa fa-handshake fa-2x text-primary"></i>
          </h6>
          <h1 className="mb-4 fs-1 text-primary">- Danh sách đối tác -</h1>
        </div>
        <Splide
          options={{
            rewind: true,
            type: "loop",
            perPage: 6,
            gap: 20,
            arrows: false,
            pagination: false,
          }}
        >
          <SplideSlide>
            <img src="/images/partner-1.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-2.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-3.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-4.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-5.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-6.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-7.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-8.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-9.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-10.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-11.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-12.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-13.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-14.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-15.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-16.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="images/partner-17.png" />
          </SplideSlide>
        </Splide>
      </div>

      <style>{`
        .partners img {
          width: 100%;
          padding: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default Partners;
