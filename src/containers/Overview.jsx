import "../css/overview.css"

export default function Overview() {
    return (
        <>
            <div>
                {/* Phần ảnh nền + tiêu đề */}
                <div className="main-image">
                    <div>
                        <img
                            src="https://fsf.neu.edu.vn/wp-content/uploads/2024/09/06082024-leader-breadcrumb.png"
                            alt=""
                        />
                    </div>
                    <div className="content">
                        <h1>Giới thiệu chung</h1>
                    </div>
                </div>

                {/* Nội dung chính */}
                <div className="container">
                    <section className="introduction">
                        <div className="s-title">
                            <h3>ĐẠI HỌC KINH TẾ QUỐC DÂN</h3>
                            <span>Trường Công Nghệ</span>
                        </div>
                        <p>
                            Trường Công nghệ là một trường thành viên của Đại học Kinh tế Quốc dân,
                            hướng đến trở thành đơn vị đào tạo và nghiên cứu hàng đầu trong lĩnh vực
                            công nghệ, với sự gắn kết chặt chẽ cùng các ngành kinh tế, quản lý và kinh
                            doanh. Trường tập trung xây dựng một môi trường học thuật hiện đại, năng
                            động, khuyến khích tư duy sáng tạo và liên ngành, nhằm đáp ứng yêu cầu phát
                            triển của nền kinh tế số và xã hội tri thức.
                        </p>
                    </section>

                    <section className="content">
                        <div className="descripton">
                            <p>
                                Với sứ mệnh cung cấp nguồn nhân lực chất lượng cao cho thị trường lao
                                động, Trường chú trọng trang bị cho người học tư duy đổi mới và khả năng
                                ứng dụng công nghệ vào thực tiễn quản lý, sản xuất và kinh doanh.
                                Chương trình đào tạo được thiết kế linh hoạt theo định hướng liên ngành,
                                tích hợp hài hòa giữa kiến thức chuyên môn, kỹ năng công nghệ và tư duy
                                phản biện – giúp sinh viên chủ động thích ứng và phát triển trong môi
                                trường làm việc nhiều biến động.
                            </p>
                        </div>
                        <div className="s-slide">
                            <img
                                src="https://nct.neu.edu.vn/admin/uploads/497927664_1118385993653132_7914435286852513369_n_203eb0a36f.jpg"
                                alt=""
                            />
                        </div>
                    </section>

                    <section className="lecture">
                        <div className="l-image">
                            <img src="https://fsf.neu.edu.vn/wp-content/uploads/2024/09/06082024-intro-img3.png" alt="" />
                        </div>
                        <p>
                            Trường sở hữu đội ngũ giảng viên có chuyên môn vững vàng, giàu kinh nghiệm
                            thực tiễn và tâm huyết với nghề. Đồng thời, Trường không ngừng mở rộng mạng
                            lưới hợp tác với doanh nghiệp, tổ chức trong và ngoài nước nhằm tăng cường
                            cơ hội thực hành, thực tập và việc làm cho sinh viên. Hệ thống cơ sở vật
                            chất được đầu tư đồng bộ với các phòng học hiện đại, phòng thí nghiệm,
                            trung tâm nghiên cứu và không gian sáng tạo, đáp ứng đầy đủ nhu cầu học tập
                            và nghiên cứu.
                        </p>
                    </section>

                    <section className="vision">
                        <div className="v-image">
                            <img
                                src="https://th.bing.com/th/id/R.cc0e387711de3979f1216f45ca0877d0?rik=L7fYwCv1GRtOjw&pid=ImgRaw&r=0"
                                alt=""
                            />
                        </div>
                        <p>
                            Với tầm nhìn dài hạn và định hướng phát triển bền vững, Trường Công nghệ đặt
                            mục tiêu trở thành nơi đào tạo ra những kỹ sư, chuyên gia và nhà lãnh đạo
                            công nghệ có năng lực hội nhập quốc tế, góp phần quan trọng vào sự phát triển
                            của nền kinh tế tri thức và công cuộc chuyển đổi số quốc gia.
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}