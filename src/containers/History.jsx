import "../css/overview.css"


const API_URL = "https://nct.neu.edu.vn/admin";
const History = ({ dataHistory }) => {
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
                    <h1>Lịch sử phát triển</h1>
                </div>
            </div>
            <div className="main">
                {dataHistory?.map((data, index) => {
                    const imageUrl = data?.image?.data?.attributes?.url
                        ? `${API_URL}${data.image.data.attributes.url}`
                        : "https://fsf.neu.edu.vn/wp-content/uploads/2024/09/06082024-leader-breadcrumb.png";

                    return (
                        <div className="item" key={index}>
                            <div className="text" dangerouslySetInnerHTML={{ __html: data.text }} />
                            <div className="image">
                                <img src={imageUrl} alt="" />
                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default History;