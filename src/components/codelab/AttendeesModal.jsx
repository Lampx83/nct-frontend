import {Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FaUserCheck, FaWindowClose} from "react-icons/fa";
import {doc, getFirestore, getDoc} from "firebase/firestore";
import app from "../../firebase";
import moment from "moment";
import * as XLSX from 'xlsx';


export default function AttendeesModal({roomID, roomUsers = []}) {
  const [members, setMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fileName, setFileName] = useState(`Điểm danh ${moment().format("DD-MM-YYYY")}`);
  const getNotAttendees = () => {
    const attendees = roomUsers?.map(user => user?.email) || [];
    return members?.map(member => ({
      ...member,
      isAttend: attendees?.includes(member.studentCode)
    })) || [];
  }

  useEffect(() => {
    const getMembers = async () => {
      const firestore = getFirestore(app);
      const roomRef = doc(firestore, "rooms", roomID);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        setMembers(roomSnap.data()?.members || []);
      } else {
        console.log("No such document!");
      }
    }
    
    if (show) {
      getMembers();
    }
  }, [show]);
  
  const handleExport = () => {
    const attendees = getNotAttendees();
    const formattedData = attendees.map(item => ({
      "Email": item.studentCode,
      "Họ và tên": item.fullName,
      "Điểm danh": item.isAttend ? "1" : "0"
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance List");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
  
  return (
    <>
      <button className="btn btn-primary ms-2 me-2 hide-expand" onClick={() => setShow(true)}>
        <FaUserCheck size={24}/>
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Danh sách thành viên</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "50vh",
            overflowX: "auto",
            marginTop: "1rem",
          }}
        >
          {members?.length > 0 ? <ul>
            {getNotAttendees().length > 0 ? getNotAttendees().map((member, index) => (
              <li key={index} className="d-flex align-items-center">
                {member?.isAttend ? <FaUserCheck size={24} className="me-2 text-success" /> : <FaWindowClose size={24} className="me-2 text-danger" />}
                {member?.studentCode} - {member?.fullName}</li>
            )) : <p>Tất cả thành viên đã tham gia!</p>}
          </ul> : (
            <p>Chưa có danh sách thành viên, vui lòng cập nhật trong cài đặt!</p>
          )}
          
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary ms-2 me-2 hide-expand" onClick={() => {
            setShowExportModal(true);
            setShow(false);
          }}>
            Xuất danh sách
          </button>
          <button className="btn btn-warning ms-2 me-2 hide-expand" onClick={() => setShow(false)}>
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showExportModal} onHide={() => setShowExportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xuất danh sách điểm danh</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "50vh",
            overflowX: "auto",
            padding: "1rem",
          }}
        >
          <Form.Label column={true}>Tên file:</Form.Label>
          <Form.Control type="text" placeholder="Tên file" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary ms-2 me-2 hide-expand" onClick={handleExport}>
            Tải xuống
          </button>
          <button className="btn btn-warning ms-2 me-2 hide-expand" onClick={() => setShowExportModal(false)}>
            Huỷ
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}