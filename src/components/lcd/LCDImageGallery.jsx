import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/gallery.css';
import Spinner from '../../containers/Spinner';

const ITEMS_PER_PAGE = 9;

function ImageGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const strapiBaseURL = 'https://fit.neu.edu.vn/admin';

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get('https://fit.neu.edu.vn/admin/api/lcd-page?populate=deep');
        const data = response.data.data.attributes.gallery;
        setGalleryItems(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Error loading gallery data.</p>;

  const totalPages = Math.ceil(galleryItems.length / ITEMS_PER_PAGE);

  const currentImages = galleryItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="gallery-fullwidth">
      <h2 className="text-center mb-4">Hình ảnh về LCĐ Khoa</h2>

      <div className="gallery-grid">
        {currentImages.map((item, index) => (
          <div
            className="gallery-item"
            key={index}
            onClick={() => openLightbox(`${strapiBaseURL}${item.background?.data?.attributes?.url}`)}
          >
            <img
              src={`${strapiBaseURL}${item.background?.data?.attributes?.formats?.medium?.url || item.background?.data?.attributes?.url}`}
              alt={item.title}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img src={selectedImage} alt="Selected" className="img-fluid" />
            <button className="btn btn-light close-lightbox" onClick={closeLightbox}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;