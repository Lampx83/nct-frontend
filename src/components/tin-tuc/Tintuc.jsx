"use client";
import Link from "next/link";
import moment from "moment";
import { Card, Row, Col, Typography } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;
const API_URL = "https://nct-frontend-liard.vercel.app/admin";
const Tintuc = ({ newsData }) => {
    const router = useRouter();
    console.log(newsData)
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                    <img
                        src="/images/newsbanner.jpg" 
                        alt="Banner Tin tức"
                        style={{ width: "100%", maxHeight: "500px", objectFit: "cover"}}
                    />
                </div>
            <div className="container" style={{ marginTop: "50px" }}>
                <h2>Tin tức</h2>
                <Row gutter={[16, 16]}>
                    {newsData?.map((news, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                cover={
                                    <Link href={`/post/${news.attributes.slug}`}>
                                        <img
                                            src={`${API_URL}${news.attributes.thumbnail.data.attributes.url}`}
                                            alt={news.attributes.title}
                                            style={{ height: "180px", objectFit: "cover", borderRadius: "8px 8px 0 0", width: "100%" }}
                                        />
                                    </Link>
                                }
                            >
                                <Link href={`/post/${news.attributes.slug}`}>
                                    <Title level={5}>{news.attributes.title}</Title>
                                </Link>
                                {news.attributes.description && (
                                    <Paragraph>
                                        {news.attributes.description.length > 100
                                            ? news.attributes.description.substring(0, 95) + " [...]"
                                            : news.attributes.description}
                                    </Paragraph>
                                )}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <img
                                            src="/images/LogoNCT.png"
                                            alt="Editor Icon"
                                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                        />
                                        <Text type="secondary">Editor NCT</Text>
                                    </div>
                                    <Text type="secondary">
                                        {moment(news.attributes.eventDate || news.attributes.createdAt).format("DD/MM/YYYY")}
                                    </Text>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Tintuc;
