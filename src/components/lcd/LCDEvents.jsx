import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import chaoTan from "./imgs/ct.jpg";
import ctay from "./imgs/ctay_khoa_cuoi.webp";
import taphuan from "./imgs/taphuan.jpg";
import techamaze from "./imgs/techamaze.jpg";
import bongda from "./imgs/bongda.jpg";


const notableAchievements2 = [
  {
    title: "Chào Tân Sinh viên",
    description:
      "Chương trình đầu tiên mà tân sinh viên sẽ được tham dự đó chính là Chuỗi sự kiện chào tân sinh viên. Với nhiều hoạt động mới mẻ và sôi động nhưng cũng đầy ý nghĩa, sẽ giúp cho các sinh viên có cơ hội làm quen, gắn kết và tạo nên những dấu ấn đầu tiên trong hành trình thanh xuân.",
    image: chaoTan,
  },
  {
    title: "Chia tay Sinh viên Khoá cuối",
    description:
      "Chia tay sinh viên khóa cuối là lời tri ân mang nhiều cung bậc cảm xúc dành riêng cho các sinh viên khóa cuối. Như một thước phim quay ngược thời gian, những năm tháng rực rỡ cùng bao kỉ niệm và hoài bão dưới mái nhà Khoa Công nghệ thông tin sẽ được tái hiện chân thực tại chương trình.",
    image: ctay,
  },
  {
    title: "Tập huấn Nội bộ",
    description:
      "Một trong những quyền lợi khi trở thành các cán bộ lớp, cán bộ Đoàn, Cộng tác viên BCH LCĐ. Qua các hoạt động ý nghĩa, các cán bộ chủ chốt sẽ được nâng cao bản lĩnh lãnh đạo, rèn luyện phẩm chất để trở thành người lãnh đạo ưu tú.",
    image: taphuan,
  },
  {
    title: "Talkshow và Workshop của Khoa CNTT",
    description:
      "Không chỉ là những hoạt động ngoại khóa và thể dục thể thao, những năm học vừa rồi còn chứng kiến sự trưởng thành trong các hoạt động chuyên môn, rèn luyện kỹ năng, hỗ trợ sinh viên của Liên chi đoàn Khoa Công nghệ thông tin. Cùng với nhu cầu ngày càng lớn về nguồn nhân lực chất lượng cao và tốc độ chuyển mình vô cùng chóng mặt của những công nghệ hiện đại, Khoa Công nghệ thông tin cùng với sự hợp tác của các công ty công nghệ đã thành công đem đến cho những khán giả những cuộc thi, talkshow và workshop vô cùng bổ ích , chất lượng.",
    image: techamaze,
  },
  {
    title: "Giải Bóng đá Truyền thống",
    description:
      "Để thỏa mãn niềm đam mê với bóng đá của các bạn sinh viên trong Khoa, Ban Lãnh đạo Khoa đã phê duyệt Kế hoạch tổ chức giải bóng đá truyền thống. Qua 3 mùa giải được tổ chức đầy thành công, hoạt động đã đẩy mạnh phong trào thể thao nói chung, bóng đá nói riêng trong Viện và tạo ra sân chơi bổ ích cho các bạn sinh viên có đam mê với trái bóng tròn.",
    image: bongda,
  },
];

const LCDEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const accordionRef = useRef(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (accordionRef.current) {
      setImageHeight(accordionRef.current.offsetHeight);
    }
  }, [activeIndex]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fs-1">Hoạt động Thường niên</h2>
      <div className="row">
        <div className="col-lg-6" ref={accordionRef}>
          <div className="accordion" id="eventsAccordion">
            {notableAchievements2.map((event, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className={`accordion-button fw-bold fs-5 ${activeIndex === index ? "bg-primary text-white" : ""}`}
                    type="button"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={activeIndex === index}
                    aria-controls={`collapse-${index}`}
                  >
                    {event.title}
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent="#eventsAccordion"
                >
                  <div className="accordion-body">
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="col-lg-6 d-flex align-items-center justify-content-center"
          style={{ height: imageHeight }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Image
              src={notableAchievements2[activeIndex].image}
              alt={notableAchievements2[activeIndex].title}
              className="img-fluid rounded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LCDEvents;