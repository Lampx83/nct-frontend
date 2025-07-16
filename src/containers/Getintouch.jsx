import "../css/contact.css"


const API_URL = "https://nct.neu.edu.vn/admin";
const Getintouch = ({ dataGetintouch }) => {
  console.log(dataGetintouch);
  return (

    <div>
      {/* Phần ảnh nền + tiêu đề */}
      <div className="main-image">
        <div>
          <img
            src=
            "https://fsf.neu.edu.vn/wp-content/uploads/2024/09/06082024-leader-breadcrumb.png"
            alt=""
          />
        </div>
        <div className="content">
          <h1>Liên hệ</h1>
        </div>
      </div>
      <div className="main">
        <div className="box">
          <div className="info">
            <h2>TRƯỜNG CÔNG NGHỆ</h2>
            <ul>
              <li dangerouslySetInnerHTML={{ __html: dataGetintouch.email }}></li>
              <li dangerouslySetInnerHTML={{ __html: dataGetintouch.address }}></li>
            </ul>
          </div>
          <div className="image">
            <img src="https://fsf.neu.edu.vn/wp-content/uploads/2024/10/neu_contact_bg.jpg" alt="" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Getintouch;