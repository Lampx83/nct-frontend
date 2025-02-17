"use client";
import dynamic from "next/dynamic"; // Import dynamic từ next/dynamic
import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Menu,
  Button,
  Input,
  Form,
  Space,
  Typography,
  Divider,
  message,
  Modal,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import app from "../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
 import ReactQuill from "react-quill-new";
 import "react-quill-new/dist/quill.snow.css"; // Import style của Quill
import QuestionModal from "./QuestionModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Title } = Typography;
const { Sider, Content } = Layout;

const CreateExamContent = () => {
  const [questions, setQuestions] = useState([
    { title: "", question: "", testCases: [] },
  ]);
  const [createdExams, setCreatedExams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const location = usePathname();
  const pathParts = location.split("/");
  const roomId = pathParts[2]; 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const db = getFirestore(app);
    const contestCollectionRef = collection(
      db,
      "rooms",
      roomId,
      "onlineJudge",
      "contest",
      "questions"
    );

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(
      contestCollectionRef,
      (querySnapshot) => {
        const examsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          question: doc.data().question,
          testcase: doc.data().testCases || [], // Add test cases
        }));
        setCreatedExams(examsList); // Update state with the latest data
      },
      (error) => {
        console.error("Error getting documents: ", error);
        message.error("Failed to load exams");
      }
    );

    // Cleanup function to unsubscribe from the listener when the component is unmounted or roomId changes
    return () => unsubscribe();
  }, [roomId]);

  const handleDeleteQuestion = async (questionId) => {
    const db = getFirestore(app);
    const questionRef = doc(
      db,
      "rooms",
      roomId,
      "onlineJudge",
      "contest",
      "questions",
      questionId
    );

    try {
      await deleteDoc(questionRef); // Deletes the question from Firestore
      setCreatedExams((prevExams) =>
        prevExams.filter((exam) => exam.id !== questionId)
      ); // Remove the deleted question from the local state
    } catch (error) {
      console.error("Error deleting question: ", error);
      message.error("Failed to delete question");
    }
  };
  const openModal = (question) => {
    if (currentQuestion?.id !== question.id) {
      setCurrentQuestion(question);
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleTitleChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].title = e.target.value;
    setQuestions(newQuestions);
  };

  const questionRef = useRef([]);

  const handleQuestionChange = (index, value) => {
    if (questionRef.current[index] === value) return;
    questionRef.current[index] = value;

    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index].question = value;
      return newQuestions;
    });
  };

  const handleUpdateQuestion = async () => {
    if (!currentQuestion || !currentQuestion.id) {
      message.error("Invalid question data");
      return;
    }

    const db = getFirestore(app);
    const questionRef = doc(
      db,
      "rooms",
      roomId,
      "onlineJudge",
      "contest",
      "questions",
      currentQuestion.id
    );

    try {
      await updateDoc(questionRef, {
        title: currentQuestion.title,
        question: currentQuestion.question,
        testCases: currentQuestion.testcase || [],
      });

      message.success("Question updated successfully!");

      // Update the exams list
      setCreatedExams((prevExams) =>
        prevExams.map((exam) =>
          exam.id === currentQuestion.id
            ? {
                ...exam,
                title: currentQuestion.title,
                question: currentQuestion.question,
                testCases: currentQuestion.testCases,
              }
            : exam
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating question: ", error);
      message.error("Failed to update question");
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { title: "", question: "", testCases: [] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const addTestCase = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].testCases.push({ input: "", expectedOutput: "" });
    setQuestions(newQuestions);
  };

  const removeTestCase = (questionIndex, testCaseIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases.splice(testCaseIndex, 1);
    setQuestions(newQuestions);
  };

  const handleTestCaseChange = (questionIndex, testCaseIndex, e, field) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases[testCaseIndex] = {
      ...newQuestions[questionIndex].testCases[testCaseIndex],
      [field]: e.target.value,
    };
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const contestCollectionRef = collection(
        db,
        "rooms",
        roomId,
        "onlineJudge",
        "contest",
        "questions"
      );
      for (const question of questions) {
        await addDoc(contestCollectionRef, {
          title: question.title,
          question: question.question,
          testCases: question.testCases,
          timestamp: Date.now(),
        });
      }
      message.success("Exam created successfully!");
    } catch (error) {
      message.error("Failed to create exam");
    } finally {
      setLoading(false);
      console.log("vao day")
      setQuestions([{ title: "", question: "", testCases: [] }]);
    }
  };

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "#b3e0ff", color: "#333" }}
    >
      <Sider width={250} style={{ backgroundColor: "#0099cc" }}>
        <Menu
          mode="inline"
          theme="light"
          style={{ backgroundColor: "#0099cc", color: "#333" }}
          items={[
            {
              key: "1",
              disabled: true,
              label: (
                <Title level={4} style={{ color: "#fff" }}>
                  Created Exams
                </Title>
              ),
            },
            ...createdExams.map((exam) => ({
              key: exam.id,
              label: exam.title,
              onClick: () => openModal(exam),
            })),
          ]}
        />

        <QuestionModal
          visible={isModalVisible}
          question={currentQuestion}
          handleUpdateQuestion={handleUpdateQuestion}
          onClose={closeModal}
          onUpdate={setCurrentQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            padding: "24px",
            margin: 0,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <div className="d-flex justify-content-between">
            <Title level={2} style={{ color: "#333" }}>
              Create Exam
            </Title>
            <div className="d-flex gap-2">
              <Button>
                <Link href={`/room/${roomId}/onlineJudge/statistic`}>
                  Statistic
                </Link>
              </Button>
              <Button>
                <Link href={`/room/${roomId}/editor`}>Editor</Link>
              </Button>
            </div>
          </div>
          <Form onSubmitCapture={handleSubmit} layout="vertical">
            {questions.map((q, index) => (
              <div key={index} className="mb-3">
                <Form.Item label={`Exam Title ${index + 1}`}>
                  <Input
                    placeholder="Enter exam title"
                    value={q.title}
                    onChange={(e) => handleTitleChange(index, e)}
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderColor: "#ccc",
                      color: "#333",
                      padding: "10px",
                    }}
                    required
                  />
                </Form.Item>
                <ReactQuill
                  key={index}
                  value={q.question || ""}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Enter question"
                  style={{
                    minHeight: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />

                {/* Test cases */}
                <Title level={5} style={{ color: "#333" }}>
                  Test Cases
                </Title>
                {q.testCases.map((testCase, testCaseIndex) => (
                  <div key={testCaseIndex}>
                    <Form.Item
                      label={`Test Case ${testCaseIndex + 1}`}
                      required
                    >
                      <Input.TextArea
                        placeholder="Enter test case input"
                        value={testCase.input}
                        onChange={(e) =>
                          handleTestCaseChange(index, testCaseIndex, e, "input")
                        }
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        style={{
                          backgroundColor: "#f5f5f5",
                          borderColor: "#ccc",
                          color: "#333",
                          padding: "10px",
                        }}
                      />
                      <Input.TextArea
                        placeholder="Enter expected output"
                        value={testCase.expectedOutput}
                        onChange={(e) =>
                          handleTestCaseChange(
                            index,
                            testCaseIndex,
                            e,
                            "expectedOutput"
                          )
                        }
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        style={{
                          backgroundColor: "#f5f5f5",
                          borderColor: "#ccc",
                          color: "#333",
                          padding: "10px",
                        }}
                      />
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeTestCase(index, testCaseIndex)}
                      >
                        Remove Test Case
                      </Button>
                    </Form.Item>
                  </div>
                ))}
                <Button
                  icon={<PlusOutlined />}
                  type="link"
                  onClick={() => addTestCase(index)}
                  style={{ color: "#333", marginBottom: "10px" }}
                >
                  Add Test Case
                </Button>
                <Button
                  danger
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => removeQuestion(index)}
                  style={{ color: "#333", marginBottom: "10px" }}
                >
                  Remove Question
                </Button>
                <Divider style={{ borderColor: "#ccc" }} />
              </div>
            ))}
            <Button
              icon={<PlusOutlined />}
              type="dashed"
              onClick={addQuestion}
              style={{ color: "#333", width: "100%", marginBottom: "20px" }}
            >
              Add Question
            </Button>
            <Button
              type="primary"
              loading={loading}
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Submit Exam
            </Button>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CreateExamContent;
