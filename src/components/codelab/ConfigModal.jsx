import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfigModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Cấu hình</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label for="select-class" className="form-label">
            Lớp học
          </label>
          <select className="form-select" id="select-class"></select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="allow_submit"
            checked
          />
          <label className="form-check-label" for="allow_submit">
            Cho phép nộp bài
          </label>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="shuffle" />
          <label className="form-check-label" for="shuffle">
            Đảo các bước
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onHide}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfigModal;
