import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import StepBody from "./StepBody";
import { toast } from "sonner";

const MAX_FILE_SIZE = 200 * 1024; // 200 KB in bytes

const UploadFileComponent = ({ table, user, room }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info) => {
      setFile(info.file);
      setFileName(info.file.name);
  };
  const beforeUpload = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      message.error("File size exceeds 200 KB!");
      return Upload.LIST_IGNORE; // Prevent the file from being added to the upload list
    }
    return true; // Allow the file
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    setLoading(true);
    try {
      const storage = getStorage(app);
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const storageReference = storageRef(storage, `uploads/${uniqueFileName}`);

      const result = await uploadBytes(storageReference, file.originFileObj);
      const downloadURL = await getDownloadURL(result.ref);

      const database = getDatabase(app);
      const userPath = `/labs/${room.docID.replace(/\./g, "")}/${room?.roomID}/uploads`;
      const fileRef = dbRef(database, userPath);
      await push(fileRef, {
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        downloadURL,
        user: user.displayName,
        email: user.email,
      });

      toast.success("File uploaded successfully!");
      setFile(null);
      setFileName("");
    } catch (error) {
      toast.error("Failed to upload file: " + error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="exercise">
        {table && table.tableRows.length > 0 && table.tableRows[0].tableCells.length > 0 && (
          <StepBody content={table.tableRows[0].tableCells[0].content} />
        )}
      </div>

      <div className="d-flex gap-2 mt-2 align-items-center">
        <Upload
          beforeUpload={beforeUpload} // Validate file size only
          onChange={handleFileChange}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>

        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={!file}
        >
          Submit
        </Button>
      </div>

      {fileName && (
        <span style={{ marginLeft: "10px" }}>
          <strong>Selected File:</strong> {fileName}
        </span>
      )}
    </>
  );
};

export default UploadFileComponent;
