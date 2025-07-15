import "../css/overview.css"



const Overview = ({ dataOverview }) => {
    console.log(dataOverview);
    return (

        <div>
            {/* Phần ảnh nền + tiêu đề */}
            <div className="main-image">
                <div>
                    <img
                        src={dataOverview[0]?.image?.data?.atrributes?.url
                            ? `${API_URL}${dataOverview[0]?.image?.data?.atrributes?.url}`
                            : "https://fsf.neu.edu.vn/wp-content/uploads/2024/09/06082024-leader-breadcrumb.png"}
                        alt=""
                    />
                </div>
                <div className="content">
                    <h1>Giới thiệu chung</h1>
                </div>
            </div>

            {dataOverview?.map((data, index) => (
                index % 2 === 0 ? (
                    <div key={index}>oke</div>
                ) : (
                    <div key={index}>not</div>
                )
            ))}




            {/* <div className="text" dangerouslySetInnerHTML={{ __html: dataOverview[0].text }} /> */}

            {/* <img
                            src={dataOverview[0]?.image?.data?.atrributes?.url
                                ? `${API_URL}${dataOverview[1]?.image?.data?.atrributes?.url}`
                                : "https://fsf.neu.edu.vn/wp-content/uploads/2024/09/06082024-leader-breadcrumb.png"}
                            alt=""
                        /> */}



        </div>
    );
};

export default Overview;