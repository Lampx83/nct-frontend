import React from 'react';
import { Modal, Input, Button, Form, Typography, message } from 'antd';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; 
import { debounce } from 'lodash';
import { useEffect } from 'react';
const { Title } = Typography;
import { useRef } from 'react';
const QuestionModal = ({ visible, question, onClose, onUpdate, handleUpdateQuestion, handleDeleteQuestion }) => {
  if (!question) return null;
  const handleTitleChange = (e) => {
    onUpdate({ ...question, title: e.target.value });
  };
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = false; // Reset khi câu hỏi thay đổi
  }, [question]); // Chạy lại khi question thay đổi
  
  const handleQuestionChange = debounce((value) => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    onUpdate({ ...question, question: value });
  }, 300);

  const handleTestCaseChange = (index, field, value) => {
    if (!question.testcase) return;
    const updatedTestCases = structuredClone(question.testcase);
    updatedTestCases[index][field] = value;
    onUpdate({ ...question, testcase: updatedTestCases });
  };

  const addTestCase = () => {
    onUpdate({ 
      ...question, 
      testcase: [...(question.testcase || []), { input: '', expectedOutput: '' }] 
    });
  };

  const removeTestCase = (index) => {
    if (!question.testcase) return;
    const updatedTestCases = structuredClone(question.testcase);
    updatedTestCases.splice(index, 1);
    onUpdate({ ...question, testcase: updatedTestCases });
  };

  const handleDelete = () => {
    handleDeleteQuestion(question.id);
    message.success("Question deleted successfully!");
    onClose();
  };

  return (
    <Modal
      title="Edit Question"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input value={question.title} onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Question">
          <ReactQuill
            value={question?.question || ""}
            onChange={(value) => {
              if (value !== question?.question) {
                handleQuestionChange(value);
              }
            }}
          />
        </Form.Item>

        <Title level={5}>Test Cases</Title>
        {question?.testcase?.map((testCase, index) => (
          <div key={index}>
            <Form.Item label={`Test Case ${index + 1} Input`}>
              <Input.TextArea
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                autoSize={{ minRows: 2, maxRows: 6 }} 
              />
            </Form.Item>
            <Form.Item label="Expected Output">
              <Input.TextArea
                value={testCase.expectedOutput}
                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                autoSize={{ minRows: 2, maxRows: 6 }} 
              />
            </Form.Item>
            <Button
              danger
              type="link"
              onClick={() => removeTestCase(index)}
              style={{ marginBottom: '10px' }}
            >
              Remove Test Case
            </Button>
          </div>
        ))}
        <Button 
          type="dashed" 
          onClick={addTestCase} 
          style={{ width: '100%', marginBottom: '10px' }}
        >
          Add Test Case
        </Button>
        <Button 
          type="primary" 
          onClick={() => {
            handleUpdateQuestion(question);
            onClose();
          }} 
          style={{ marginTop: '10px' }}
        >
          Save & Close
        </Button>
        <Button 
          danger 
          type="default" 
          onClick={handleDelete} 
          style={{ marginTop: '10px', width: '100%' }}
        >
          Delete Question
        </Button>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
