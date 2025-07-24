"use client";
import Link from "next/link";
import moment from "moment";
import { Card, Row, Col, Typography } from "antd";
import "../../css/tintuc.css"

const { Title, Paragraph, Text } = Typography;
const API_URL = "https://nct.neu.edu.vn/admin";
const Tintuc = ({ newsData, pagination, thumbnail }) => {
    const { page, pageCount } = pagination;

    return (
        <div>
            <div className="banner">
                <img
                    src={`${API_URL}${thumbnail.data.attributes.formats.large.url}`}
                    alt="Banner Tin tức"
                />
            </div>
            <div className="container">
                <div className=""></div>
                <h2>Tin tức</h2>
                <div className="blogs">
                    {newsData?.map((news, index) => (
                        <a href={`/post/${news.attributes.slug}`} key={news.id}>
                            <div className="inner">
                                <div className="image">
                                    <img
                                        src={
                                            `${API_URL}${news.attributes.thumbnail?.data?.attributes?.url}` ||
                                            `https://source.unsplash.com/random/400x300`
                                        } alt={news.attributes.title}
                                    />

                                </div>
                                <div className="content">
                                    <h3 className="line-truncate">{news.attributes.title}</h3>
                                    <p className="line-truncate">{news.attributes.description}</p>
                                    <div className="info">
                                        <div className="author">
                                            <div>
                                                <img src="/images/LogoNCT.png" alt="" />
                                            </div>
                                            <span className="ms-2">{news.attributes.createdBy.data.attributes.firstname}</span>
                                            <span className="ms-1">{news.attributes.createdBy.data.attributes.lastname}</span>
                                        </div>
                                        <div className="time">{moment(news.attributes.eventDate || news.attributes.createdAt).format("DD/MM/YYYY")}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                            <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                                <Link className="page-link" href={`/tin-tuc?page=${p}`}>
                                    {p}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Tintuc;
