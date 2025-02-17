import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "firebaseui/dist/firebaseui.css";
import UploadFilePage from "../containers/CodeLab";


const DocTypeChooseModal = ({ show, handleClose, user }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    const handleUploadDone = () => {
        handleClose()
    };
    return (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Lựa chọn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {selectedOption === 'MS Word' ? (<UploadFilePage user={user} uploadDone={handleUploadDone} />) : selectedOption === 'Google Docs' ? (
                <div>Hướng dẫn cho Google Docs</div>) : selectedOption === 'Latex' ? (
                    <div>Hướng dẫn cho Latex</div>) : selectedOption === 'Markdown' ? (
                        <div>Hướng dẫn cho Markdown</div>) : (<>
                            <Button variant="primary" className="m-2" onClick={() => handleOptionClick('MS Word')}>MS
                                Word</Button>
                            <Button variant="success" className="m-2" onClick={() => handleOptionClick('Google Docs')}>Google
                                Docs</Button>
                            <Button variant="secondary" className="m-2" disabled
                                onClick={() => handleOptionClick('Latex')}>Latex</Button>
                            <Button variant="secondary" className="m-2" disabled
                                onClick={() => handleOptionClick('Markdown')}>Markdown</Button>
                        </>)}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
            {selectedOption === 'MS Word' ? (<div>Hướng dẫn cho MS Word</div>) : selectedOption === 'Google Docs' ? (
                <div>Hướng dẫn cho Google Docs</div>) : selectedOption === 'Latex' ? (
                    <div>Hướng dẫn cho Latex</div>) : selectedOption === 'Markdown' ? (
                        <div>Hướng dẫn cho Markdown</div>) : (
                <p className="text-muted">* Hỗ trợ đọc file Latex và Markdown chưa hoạt động</p>)}
        </Modal.Footer>
    </Modal>);


};

export default DocTypeChooseModal;
