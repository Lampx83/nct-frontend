import React, { useEffect, useState } from "react";
import { SHA256 } from "crypto-js";
import ParagraphContent from "./ParagraphContent";
import { readElements } from "../../utils/codelab";
import { useRouter } from 'next/navigation';
import {
  getDatabase,
  onValue,
  ref,
  push,
  update,
  onDisconnect,
  set,
} from "firebase/database";
import app from "../../firebase";
import { Timestamp } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import "../../css/quiz.css";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import config from "../../config";
import { Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const generateQuizId = (content) => {
  return SHA256(content).toString();
};

const Quiz = ({ table, room, user }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answerUsers, setAnswerUsers] = useState({});
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [selectedAnswerUsers, setSelectedAnswerUsers] = useState([]);
  const [showBadges, setShowBadges] = useState(true);
  const searchParams = useSearchParams();
  const chap = searchParams.get("chap");
 
  useEffect(() => {
    const db = getDatabase(app);
    const link = chap ? `/chap${chap}` : "";
    const quizPath = `/labs/${room.docID.replace(/\./g, "")}/${
      room.roomID
    }${link}/quiz`;
    const quizPath1 = `/labs/${room.docID.replace(/\./g, "")}/${
      room.roomID
    }${link}/quiz/`;
    const quizRef = ref(db, quizPath);
    const quiz1Ref = ref(db, quizPath1);
    const unsubscribe = onValue(quizRef, (snapshot) => {
      const data = snapshot.val() || {};
      setAnswerUsers(data);
    });

    return () => {
      unsubscribe();
    };
  }, [room.docID, room.roomID, chap]);

  useEffect(() => {
    if (room?.roomID) {
      const db = getDatabase(app);
      const link = chap ? `/chap${chap}` : "";
      const visibilityRef = ref(
        db,
        `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${link}/quizBadgeVisibility`
      );
      
      onValue(visibilityRef, (snapshot) => {
        const visibility = snapshot.val();
        setShowBadges(visibility !== false);
      });
    }
  }, [room?.roomID, room.docID, chap]);

  const toggleBadgeVisibility = () => {
    const db = getDatabase(app);
    const link = chap ? `/chap${chap}` : "";
    const visibilityRef = ref(
      db,
      `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${link}/quizBadgeVisibility`
    );
    
    set(visibilityRef, !showBadges);
  };

  useEffect(() => {
    if (table) {
      let result = "";
      table.tableRows.forEach((row) => {
        result += readElements(row.tableCells[0].content);
      });
      const quizId = generateQuizId(result);

      if (answerUsers[quizId] && answerUsers[quizId][user?.uid]) {
        setSelectedAnswerIndex(answerUsers[quizId][user?.uid].answer);
      } else {
        setSelectedAnswerIndex(null);
      }
    }
  }, [answerUsers, table, user]);

  const handleAnswerChange = (index, quizId) => {
    const db = getDatabase(app);
    const quizPath = `/labs/${room.docID.replace(/\./g, "")}/${
      room.roomID
    }/quiz/${quizId}/${user?.uid}`;
    const quizRef = ref(db, quizPath);

    update(quizRef, {
      answer: index,
      uid: user?.uid,
      name: user.displayName,
      timestamp: Timestamp.now(),
    });
    fetch(`${config.API_BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logType: "Quiz",
        roomID: room.roomID,
        userName: user.displayName,
        log: {
          answer: index,
          quizId: quizId,
        },
      }),
    });

    setSelectedAnswerIndex(index);
  };

  const handleShowUsers = (users) => {
    setSelectedAnswerUsers(users);
    setShowUsersModal(true);
  };

  if (
    table &&
    table.tableRows.length >= 2 &&
    table.tableRows[0].tableCells.length >= 1
  ) {
    let result = "";
    table.tableRows.forEach((row) => {
      result += readElements(row.tableCells[0].content);
    });
    const quizId = generateQuizId(result);

    const question = table.tableRows[0].tableCells[0].content.map(
      (paragraph, questionIndex) => (
        <div key={`${quizId}_question`}>
          <ParagraphContent content={paragraph} user={user} room={room} />
        </div>
      )
    );

    const answers = table.tableRows.slice(1).map((row, index) => {
      const quizId = generateQuizId(result, index);
      if (row.tableCells.length >= 1) {
        const optionText = row.tableCells[0].content.map((paragraph) => (
          <ParagraphContent content={paragraph} user={user} room={room} />
        ));
        const optionId = `${quizId}_${index}`;

        const usersForAnswer = Object.values(answerUsers[quizId] || {}).filter(
          (userAnswer) => userAnswer.answer === index
        );
        const userNames = usersForAnswer.map((userAnswer) => userAnswer.name);

        return (
          <div className="quiz-choice" key={optionId}>
            <input
              className="form-check-input me-3"
              type="radio"
              id={optionId}
              checked={selectedAnswerIndex === index}
              onChange={() => handleAnswerChange(index, quizId)}
            />
            <label htmlFor={optionId}>{optionText}</label>
            {room.userID === user?.uid && userNames.length > 0 && showBadges && (
              <Badge
                bg="secondary"
                style={{
                  fontSize: "0.8rem",
                  marginLeft: "20px",
                  cursor: "pointer",
                  padding: "8px 12px",
                  transition: "all 0.2s ease"
                }}
                onClick={() => handleShowUsers(userNames)}
                className="user-count-badge"
              >
                {userNames.length}
              </Badge>
            )}
          </div>
        );
      }
      return null;
    });

    return (
      <>
        <div className="quiz" id={quizId}>
          {room.userID === user?.uid && (
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={toggleBadgeVisibility}
                className="badge-toggle-btn"
                title={showBadges ? "Ẩn số người chọn" : "Hiện số người chọn"}
              >
                {showBadges ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          )}
          <div>{question}</div>
          <div>
            <form>{answers}</form>
          </div>
        </div>

        <Modal 
          show={showUsersModal} 
          onHide={() => setShowUsersModal(false)}
          centered
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: '1.1rem' }}>
              Danh sách người chọn ({selectedAnswerUsers.length})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {selectedAnswerUsers.map((name, index) => (
              <div 
                key={index} 
                className="p-2 user-list-item"
                style={{
                  borderBottom: index < selectedAnswerUsers.length - 1 ? '1px solid #dee2e6' : 'none',
                  fontSize: '0.9rem'
                }}
              >
                {name}
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return null;
};

export default Quiz;
