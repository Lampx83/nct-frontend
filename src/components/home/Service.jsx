import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faComputer, faBuildingColumns, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function Service() {
    return (
        <div className="container-xxl">
            <div className="container">
                <div className="row g-4 py-5">
                    <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="d-flex py-1 flex-column text-center">
                            <FontAwesomeIcon icon={faChalkboardUser} className="fa-3x flex-shrink-0 text-primary" />
                            <div className="ps-2">
                                <h5 className="mt-3 mb-3 text-primary">Đội ngũ giảng viên</h5>
                                <p>Giảng viên giàu kinh nghiệm, được đào tạo bài bản tại các trường danh tiếng trên thế giới.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="d-flex py-1 flex-column text-center">
                            <FontAwesomeIcon icon={faComputer} className="fa-3x  flex-shrink-0 text-primary" />
                            <div className="ps-2">
                                <h5 className="mt-3 mb-3 text-primary">Cơ sở vật chất</h5>
                                <p>Phòng thực hành hiện đại, được đầu tư nâng cấp thường xuyên, đáp ứng yêu cầu học tập.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="d-flex py-1 flex-column text-center">
                            <FontAwesomeIcon icon={faBuildingColumns} className="fa-3x flex-shrink-0 text-primary" />
                            <div className="ps-2">
                                <h5 className="mt-3 mb-3 text-primary">Chương trình đào tạo</h5>
                                <p>Được cập nhật thường xuyên, theo chuẩn quốc tế, định hướng ứng dụng trong kinh tế, quản lý.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                        <div className="d-flex py-1 flex-column text-center">
                            <FontAwesomeIcon icon={faGraduationCap} className="fa-3x flex-shrink-0 text-primary" />
                            <div className="ps-2">
                                <h5 className="mt-3 mb-3 text-primary">Phương pháp giảng dạy</h5>
                                <p>Đề cao tính thực hành, có tính thực tiễn cao, phù hợp nhu cầu tuyển dụng của doanh nghiệp, tổ chức.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service