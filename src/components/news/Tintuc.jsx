"use client"
import Link from "next/link";
import moment from "moment";
import { useState } from "react";

const Hit = ({ hit }) => (
    <div className="hit-item">
        <Link href={`/post/${hit.slug}`} className="hit-link">
            <div className="hit-title">{hit.title}</div>
            <small className="hit-date">
                {moment(hit.createdAt).format("DD [tháng] MM YYYY, HH:mm")}
            </small>
        </Link>
    </div>
);
const API_URL = "https://nct-frontend-liard.vercel.app";


const Tintuc = ({
    newsData,
    totalPages,
    slug,
}) => {
    console.log("Dữ liệu nhận được trong Tintuc:", { newsData, totalPages });
    const [loading, setLoading] = useState(false);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    return (
        <div>
            <div
                className="cover"
                style={{
                    backgroundImage: `url(/images/background-${randomNumber}.png)`,
                    height: "40vh",
                    maxHeight: "400px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="mask d-flex align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.2)", height: "100%" }}
                >
                    <div className="container text-center text-white">
                        <h2 className="display-3 text-light">Tin tức</h2>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="container my-5">
                    <div className="row">
                        {newsData?.map((news, index) => (
                            <div key={index} className="col-md-4 mb-4"> {/* Mỗi tin tức chiếm 1/3 hàng */}
                                <div className="card border-0 rounded shadow-sm h-100">
                                    {/* Hình ảnh */}
                                    <Link href={`/post/${news.attributes.slug}`}>
                                        <img
                                            src={news.attributes.thumbnail?.data?.attributes?.url
                                                ? `https://nct-frontend-liard.vercel.app${news.attributes.thumbnail.data.attributes.url}`
                                                : "/images/background-3.png"} // Ảnh mặc định nếu API không có
                                            className="img-fluid card-img-top"
                                            alt={news.attributes.title}
                                            style={{ height: "180px", objectFit: "cover",borderRadius: "5px" }}
                                        />
                                    </Link>

                                    {/* Nội dung tin tức */}
                                    <div className="card-body">
                                        <Link href={`/post/${news.attributes.slug}`}>
                                            <h5 className="card-title">{news.attributes.title}</h5>
                                        </Link>
                                        {news.attributes.description && (
                                            <p className="card-text"> {news.attributes.description.length > 100
                                                ? news.attributes.description.substring(0, 95) + " [...]"
                                                : news.attributes.description}</p>
                                        )}
                                        <p className="card-text">
                                            <small className="text-muted">
                                                {moment(news.attributes.eventDate || news.attributes.createdAt).format("DD [tháng] MM YYYY, HH:mm")}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>

    )
}
export default Tintuc;