"use client";
import Link from "next/link";
import moment from "moment";
import { Card, Row, Col, Typography, Cascader } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text } = Typography;
const API_URL = "https://nct-frontend-liard.vercel.app/admin";

const options = [
    { value: "Chưa phân loại", label: "Chưa phân loại" },
    { value: "Sự kiện", label: "Sự kiện" },
];

const Tintuc = ({ newsData, totalPages, page }) => {
    const router = useRouter();

    const handlePageChange = (newPage) => {
        if (newPage !== page && newPage > 0 && newPage <= totalPages) {
            router.push(`/news?page=${newPage}`);
        }
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ margin: 0 }}>Tin tức</h1>
                <Cascader
                    options={options}
                    placeholder="Danh mục Sự kiện"
                    style={{
                        fontWeight: "bold",
                        minWidth: "200px",
                        borderRadius: "8px",
                        border: "1px solid black",
                        textAlign: "center",
                    }}
                />
            </div>

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
                            <Text type="secondary">
                                {moment(news.attributes.eventDate || news.attributes.createdAt).format("DD [tháng] MM YYYY, HH:mm")}
                            </Text>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Hiển thị phân trang */}
            {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button
                        disabled={page <= 1}
                        onClick={() => handlePageChange(page - 1)}
                        style={{ marginRight: "10px", padding: "8px 12px", border: "1px solid black", borderRadius: "5px" }}
                    >
                        &laquo; 
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            style={{
                                margin: "0 5px",
                                padding: "8px 12px",
                                border: "1px solid  #780614",
                                borderRadius: "5px",
                                backgroundColor: page === i + 1 ? " #780614" : "white",
                                color: page === i + 1 ? "white" : " #780614",
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={page >= totalPages}
                        onClick={() => handlePageChange(page + 1)}
                        style={{ marginLeft: "10px", padding: "8px 12px", border: "1px solid black", borderRadius: "5px" }}
                    >
                     &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tintuc;
