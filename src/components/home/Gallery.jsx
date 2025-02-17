import React, { useEffect, useState } from "react";
import "../../css/indexGallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://fit.neu.edu.vn/admin/api/index-page?populate=deep"
        );
        const data = await response.json();

        const galleryImages = data.data.attributes.imagesLibrary.data.map(
          (item) => ({
            id: item.id,
            url: `https://fit.neu.edu.vn/admin${item.attributes.formats.medium.url}`,
          })
        );

        setImages(galleryImages);
      } catch (error) {
        console.error("Lỗi khi tải hình ảnh:", error);
      }
    };

    fetchImages();
  }, []);

  // Tính toán số trang
  const pageCount = Math.ceil(images.length / imagesPerPage);

  // Lấy ảnh cho trang hiện tại
  const currentImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  // Xử lý điều hướng
  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      if (prev === 0) {
        return pageCount - 1;
      }
      return prev - 1;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (prev === pageCount - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className="gallery-wrapper container-fluid">
      <div className="gallery-container">
        <div className="text-center">
          <h2 className="text-uppercase">
            <i className="fa-solid fa-images text-primary"></i>
          </h2>
          <h1 className="mb-5 fs-1 text-primary">- Thư viện ảnh -</h1>
        </div>

        <div className="gallery-grid">
          {currentImages.map((image) => (
            <div key={image.id} className="gallery-item">
              <div className="gallery-image">
                <img src={image.url} alt={image.title} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 6 && (
          <div className="gallery-navigation">
            <button
              className="btn btn-primary nav-arrow prev "
              onClick={handlePrevPage}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="btn btn-primary nav-arrow next"
              onClick={handleNextPage}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
