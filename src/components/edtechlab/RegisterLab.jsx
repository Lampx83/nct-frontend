import React, { useState } from "react";

const RegisterForm = () => {
  // Required fields definition
  const requiredFields = {
    fullName: "Họ và tên",
    studentCode: "Mã sinh viên", 
    schoolEmail: "Mail sinh viên",
    personalEmail: "Gmail cá nhân",
    phone: "Số điện thoại",
    zalo: "Zalo",
    fields: "Phù hợp và yêu thích các nhóm nghiên cứu"
  };

  const [formData, setFormData] = useState({
    fullName: "",
    category: "",
    lecturerGroup: "",
    studentCode: "",
    schoolEmail: "",
    personalEmail: "",
    phone: "",
    zalo: "",
    year: "",
    class: "",
    strengthAndSkill: "",
    abilityAndExperience: "",
    foreignLanguage: "",
    hobbyAndSport: "",
    note: "",
    fields: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setResponseMessage("");
    setIsSubmitting(true);
  
    // Validate required fields
    for (const [key, label] of Object.entries(requiredFields)) {
      if (!formData[key]) {
        setResponseMessage(`Vui lòng điền ${label}`);
        setIsSubmitting(false);
        return;
      }
    }
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
  
      const response = await fetch(
        "https://fit.neu.edu.vn/admin/api/edtech-lab-registers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
          signal: controller.signal
        }
      );
  
      clearTimeout(timeoutId);
  
      if (response.ok) {
        setResponseMessage("Gửi đăng ký thành công!. Cảm ơn bạn đã quan tâm đến EdTech-Lab. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất");
        setFormSubmitted(true);
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage(error.name === 'AbortError' 
        ? "Hệ thống đang bận, vui lòng thử lại sau."
        : "Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent form submission on enter key
  const handleKeyPress = (e) => {
    // Allow Enter key in specific textareas
    const textareaFields = [
      'strengthAndSkill',
      'abilityAndExperience',
      'foreignLanguage',
      'hobbyAndSport',
      'note',
      'fields'
    ];
    
    if (e.key === 'Enter' && !textareaFields.includes(e.target.name)) {
      e.preventDefault();
    }
  };

  const handleNextPage = () => {
    if (currentPage === 1) {
      if (!formData.fullName || !formData.studentCode || !formData.schoolEmail || !formData.phone || !formData.zalo) {
        setResponseMessage("Vui lòng điền đầy đủ các trường bắt buộc ở trang 1.");
        return;
      }
    } else if (currentPage === 2) {
      if (!formData.fields) {
        setResponseMessage("Vui lòng điền đầy đủ các trường bắt buộc ở trang 2.");
        return;
      }
    }

    setResponseMessage("");
    setCurrentPage(currentPage + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">Họ và tên*</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lecturerGroup" className="form-label">Nhóm Giảng Viên Hướng dẫn</label>
                <input
                  type="text"
                  className="form-control"
                  id="lecturerGroup"
                  name="lecturerGroup"
                  value={formData.lecturerGroup}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="studentCode" className="form-label">Mã Sinh viên*</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentCode"
                  name="studentCode"
                  value={formData.studentCode}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="schoolEmail" className="form-label">Mail Sinh Viên*</label>
                <input
                  type="email"
                  className="form-control"
                  id="schoolEmail"
                  name="schoolEmail"
                  value={formData.schoolEmail}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="personalEmail" className="form-label">Địa chỉ Gmail cá nhân*</label>
                <input
                  type="email"
                  className="form-control"
                  id="personalEmail"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="category" className="form-label">Đối Tượng</label>
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Chọn đối tượng</option>
                  <option value="Giảng viên">Giảng viên</option>
                  <option value="Sinh viên">Sinh viên</option>
                  <option value="Học viên cao học">Học viên cao học</option>
                  <option value="Nghiên cứu sinh">Nghiên cứu sinh</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">Số điện thoại*</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="zalo" className="form-label">Zalo*</label>
                <input
                  type="text"
                  className="form-control"
                  id="zalo"
                  name="zalo"
                  value={formData.zalo}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="fields" className="form-label">Phù hợp và yêu thích các nhóm nghiên cứu*</label>
              <textarea
                className="form-control"
                id="fields"
                name="fields"
                rows="3"
                value={formData.fields}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="strengthAndSkill" className="form-label">Điểm mạnh về kiến thức và kỹ năng về công nghệ</label>
              <textarea
              className="form-control"
              id="strengthAndSkill"
              name="strengthAndSkill"
              rows="3"
              value={formData.strengthAndSkill}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              required
            ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="abilityAndExperience" className="form-label">Khả năng và kinh nghiệm thực hiện nghiên cứu</label>
              <textarea
                className="form-control"
                id="abilityAndExperience"
                name="abilityAndExperience"
                rows="3"
                value={formData.abilityAndExperience}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                required
              ></textarea>
            </div>
          </>
        );
        case 3:
          return (
            <>
              <div className="mb-3">
                <label htmlFor="foreignLanguage" className="form-label">Khả năng về ngoại ngữ</label>
                <textarea
                  className="form-control"
                  id="foreignLanguage"
                  name="foreignLanguage"
                  rows="3"
                  value={formData.foreignLanguage}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  required
                ></textarea>
              </div>
        
              <div className="mb-3">
                <label htmlFor="hobbyAndSport" className="form-label">Sở thích và các môn thể thao</label>
                <textarea
                  className="form-control"
                  id="hobbyAndSport"
                  name="hobbyAndSport"
                  rows="3"
                  value={formData.hobbyAndSport}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  required
                ></textarea>
              </div>
        
              <div className="mb-3">
                <label htmlFor="note" className="form-label">Ghi chú</label>
                <textarea
                  className="form-control"
                  id="note"
                  name="note"
                  rows="3"
                  value={formData.note}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  required
                ></textarea>
              </div>
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Form Đăng Ký Edtech Lab</h2>
      {!formSubmitted ? (
        <form onSubmit={(e) => e.preventDefault()}  autoComplete="off">
          {renderPage()}

          <div className="d-flex justify-content-end">
            {currentPage > 1 && (
              <button
                type="button"
                className="btn btn-secondary me-auto"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Quay lại
              </button>
            )}
            {currentPage < 3 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextPage}
              >
                Tiếp theo
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="alert alert-success mt-3" role="alert">
          {responseMessage}
        </div>
      )}

      {responseMessage && !formSubmitted && (
        <div className={`alert ${responseMessage.includes("lỗi") ? "alert-danger" : "alert-success"} mt-3`} role="alert">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;