import React from "react";
import { Modal, List } from "antd";
import { Button } from "react-bootstrap";

const UploadedFilesModal = ({ show, onClose, uploadedFiles }) => {
  return (
    <Modal
      open={show}
      onCancel={onClose}
      footer={[
        <Button key="close" variant="secondary" onClick={onClose}>
          Close
        </Button>,
      ]}
      title="Uploaded Files"
      centered
    >
      {uploadedFiles && uploadedFiles.length > 0 ? (
        <List
          borderedbeforeUpload
          dataSource={uploadedFiles}
          renderItem={(file) => (
            <List.Item>
              <a
                href={file?.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file?.fileName}
              </a>
              <span style={{ marginLeft: "10px" }}>
                
                <em>({file?.user || "Unknown"})</em>
              </span>
            </List.Item>
          )}
        />
      ) : (
        <p>No files have been uploaded yet.</p>
      )}
    </Modal>
  );
};

export default UploadedFilesModal;
