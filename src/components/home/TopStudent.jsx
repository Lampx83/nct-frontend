import React, { useEffect, useState, useRef } from 'react';
import '../../css/topstudent.css';

const TopStudent = () => {
    const [students, setStudents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const itemWidth = 250; // Cố định kích thước mỗi item để tính toán dịch chuyển

    // Hàm xáo trộn mảng
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    // Lấy dữ liệu sinh viên từ API và xáo trộn thứ tự
    const fetchStudentData = async () => {
        try {
            const response = await fetch('https://fit.neu.edu.vn/admin/api/featured-students?populate=*');
            const data = await response.json();
            const students = data.data.map((student) => ({
                img: `https://fit.neu.edu.vn/admin/${student.attributes.avatar.data.attributes.url}`,
                name: student.attributes.displayName,
                information: student.attributes.introduction,
            }));
            setStudents(shuffleArray(students)); // Xáo trộn danh sách
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    // Tự động chuyển động carousel mỗi 2.5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === students.length ? 0 : prevIndex + 1
            );
        }, 2500);

        return () => clearInterval(interval);
    }, [students]);

    // Khi currentIndex thay đổi, chuyển động carousel
    useEffect(() => {
        const totalItems = students.length;
        if (totalItems > 0) {
            const transitionCarousel = () => {
                const offset = -currentIndex * (itemWidth + 20); // 20px là khoảng cách giữa các item
                carouselRef.current.style.transform = `translateX(${offset}px)`;
                carouselRef.current.style.transition = 'transform 0.5s ease';
            };

            transitionCarousel();

            // Reset vị trí khi đến item cuối cùng để tạo hiệu ứng lặp
            if (currentIndex === totalItems) {
                setTimeout(() => {
                    carouselRef.current.style.transition = 'none';
                    setCurrentIndex(0);
                }, 500); // Delay để chờ cho đến khi chuyển động hoàn tất
            }
        }
    }, [currentIndex, students.length]);

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center">
                    <h2 className="text-uppercase">
                        <i className="fa-solid fa-user-graduate text-primary"></i>
                    </h2>
                    <h1 className="mb-5 fs-1 text-primary">- Sinh Viên Tiêu Biểu -</h1>
                </div>
                <div className="carousel-container">
                    <div ref={carouselRef} className="carousel">
                        {[...students, ...students].map((student, index) => (
                            <div
                                className="testimonial-item text-center"
                                key={index}
                            >
                                <img
                                    className="bg-light rounded-circle p-2 mx-auto mb-3"
                                    src={student.img}
                                    alt={`Student ${index + 1}`}
                                    style={{ width: '168px', height: '168px' }}
                                />
                                <h5 className="mb-0">{student.name}</h5>
                                <p dangerouslySetInnerHTML={{ __html: student.information }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TopStudent;