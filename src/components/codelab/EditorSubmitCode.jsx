"use-client"
import { Box, HStack, VStack, Button, Text, Textarea,useColorMode,useColorModeValue } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
import app from "../../firebase"; // Import Firebase app configuration
import { getFirestore, collection, getDocs, onSnapshot, doc,getDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { usePathname } from "next/navigation";

import { Progress, Avatar } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CheckIcon } from "@chakra-ui/icons";
import ColorModeToggle from "./ColorModeToggle";
import dayjs from "dayjs";
// CodeEditor Component
export default function CodeEditor() {
  const editorRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Câu hỏi đang được chọn
  const [input, setInput] = useState(""); // Input field state
  const pathname = usePathname();
const pathParts = pathname.split("/");
const roomId = pathParts[2]; // Thay đổi logic này nếu cấu trúc URL khác
  const [user, setUser] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const totalQuestions = questions.length;
  const { colorMode } = useColorMode();
  const editorTheme = colorMode === 'dark' ? 'vs-dark' : 'light';
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headerBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('blue.600', 'blue.200');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const buttonBg = useColorModeValue('white', 'gray.800');
  const placeholderColor = useColorModeValue('gray.500', 'gray.400');
  const openCodePreview = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    const fetchUserSubmission = async () => {
      if (user && selectedQuestion) {
        const db = getFirestore(app);
        const questionRef = doc(
          db,
          "rooms",
          roomId,
          "onlineJudge",
          "contest",
          "questions",
          selectedQuestion.id
        );
  
        const questionSnap = await getDoc(questionRef);
        if (questionSnap.exists()) {
          const questionData = questionSnap.data();
          console.log("Question Data:", questionData);
  
          // Lọc danh sách users để tìm user hiện tại
          const userSubmission = questionData.users?.find(
            (u) => u.uid === user.uid
          );
  
          if (userSubmission) {
            console.log("User Submission:", userSubmission);
            setSubmissions(userSubmission); // Lưu vào state nếu cần
          } else {
            console.log("User chưa có bài nộp");
          }
        } else {
          console.log("Câu hỏi không tồn tại");
        }
      }
    };
  
    fetchUserSubmission();
  }, [user, selectedQuestion]);
  
  
  

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  
      if (currentUser) {
        const db = getFirestore(app);
        const questionsRef = collection(db, "rooms", roomId, "onlineJudge", "contest", "questions");
  
        // Lắng nghe thay đổi trên Firestore
        const unsubscribeFirestore = onSnapshot(questionsRef, (snapshot) => {
          const updatedQuestions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setQuestions(updatedQuestions);
  
          // Cập nhật số câu hỏi đã hoàn thành real-time
          const completedCount = updatedQuestions.filter(q =>
            q?.users?.some(userObj => userObj.uid === currentUser.uid && userObj.status === true)
          ).length;
          setCompletedQuestions(completedCount);
        });
  
        return () => unsubscribeFirestore(); // Cleanup listener khi component unmount
      }
    });
  
    return () => unsubscribeAuth(); // Cleanup auth listener
  }, [roomId]); // Chỉ chạy lại khi `roomId` thay đổi
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const db = getFirestore(app);
      const contestCollectionRef = collection(db, "rooms", roomId, "onlineJudge", "contest", "questions");

      try {
        const querySnapshot = await getDocs(contestCollectionRef);
        const questionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          question: doc.data().question,
          testCases: doc.data().testCases || [], // Thêm test cases
          users: doc.data().users || [], // Thêm users
        }));
        setQuestions(questionsList); // Cập nhật câu hỏi
      } catch (error) {
        console.error("Error fetching questions from Firestore:", error);
        setQuestions([]); // Đảm bảo `questions` là một mảng rỗng khi có lỗi
      }
    };

    if (roomId) {
      fetchQuestions(); // Gọi fetch chỉ khi roomId có sẵn
    }
  }, [roomId]);

  // Khi chọn câu hỏi từ navbar, hiển thị lên editor
  const handleQuestionClick = (question) => {
    if (question && question.question) { // Kiểm tra xem question có hợp lệ không
      setSelectedQuestion(question);
    }
  };
  useEffect(() => {
    // Khi câu hỏi thay đổi, reset editor về rỗng và output về trạng thái ban đầu
    setValue(""); 
    setInput("")
  }, [selectedQuestion]);
  useEffect(() => {
    if (selectedQuestion) {
      const savedCode = localStorage.getItem(`code_${selectedQuestion.id}_${language}`);
      setValue(savedCode || CODE_SNIPPETS[language] || "");
    }
  }, [selectedQuestion, language]);
  
  useEffect(() => {
    if (selectedQuestion) {
      localStorage.setItem(`code_${selectedQuestion.id}_${language}`, value);
    }
  }, [value, selectedQuestion, language]);

  
  return (
    <>
      <Box 
        bg={headerBg}
        color={textColor}
        p={4} 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        boxShadow="lg"
        borderBottomWidth="1px"
        borderColor={borderColor}
      >
        {/* User Info */}
        <HStack>
          <Avatar name={user?.displayName} size="md" bg={accentColor} />
          <VStack align="start">
            <Text fontSize="lg" fontWeight="bold" color={accentColor}>
              {user?.displayName || "Anonymous"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user?.email}
            </Text>
          </VStack>
        </HStack>
        {/* Progress */}
        <ColorModeToggle></ColorModeToggle>
        <VStack align="start" spacing={1}>
          <Text fontSize="md" color={accentColor}>
            Progress: {completedQuestions}/{totalQuestions} completed
          </Text>
          <Progress 
            value={(completedQuestions / (totalQuestions || 1)) * 100} 
            size="sm" 
            colorScheme={colorMode === 'dark' ? 'blue' : 'pink'}
            w="200px" 
          />
        </VStack>
      </Box>

      <Box display="flex" bg={bgColor} minHeight="100vh">
        {/* Sidebar */}
        <Box
          w="20%"
          borderRightWidth="1px"
          borderColor={borderColor}
          minHeight="100vh"
          bg={headerBg}
        >
          <Text 
            fontSize="2.3rem" 
            fontWeight="bold" 
            mb={4} 
            pb={2} 
            borderBottomWidth="2px"
            borderColor={borderColor}
            textAlign="center"
            color={textColor}
          >
            Questions
          </Text>

          {questions && questions.length > 0 ? (
            questions.map((question) => {
              const isCompleted = question?.users?.some(userObj => 
                userObj.uid === user?.uid && userObj.status === true
              );
              
              return (
                <Button
                key={question.id}
                variant="ghost"
                w="100%"
                onClick={() => handleQuestionClick(question)}
                mb={2}
                justifyContent="flex-start"
                textAlign="left"
                whiteSpace="normal"
                _hover={{ bg: hoverBg }}
                bg={buttonBg}
                color={textColor}
                rightIcon={isCompleted ? <CheckIcon color="green.500" /> : null}
              >
                {question.title}
              </Button>
              );
            })
          ) : (
            <Text color="gray.500">No questions available</Text>
          )}
        </Box>


        {/* Editor Section */}
        <Box 
          w="80%" 
          p={4} 
          bg={headerBg}
          borderRadius="md" 
          boxShadow="xl"
          borderWidth="1px"
          borderColor={borderColor}
          m={4}
        >
          {selectedQuestion ? (
            <Box 
              mb={4} 
              borderBottomWidth="2px"
              borderColor={accentColor}
            >
              <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                {selectedQuestion.title}
              </Text>
              <Text
                fontSize="md"
                mt={2}
                padding="15px"
                color={textColor}
                dangerouslySetInnerHTML={{ __html: selectedQuestion.question }}
              />
            </Box>
          ) : (
            <Text color="gray.500">Select a question to view and edit the code</Text>
          )}

          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{ minimap: { enabled: false } }}
            height="50vh"
            theme={editorTheme}
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />

          {/* Input field */}
          <Box mt={4} mb={2}>
            <Text fontSize="lg" mb={2} color={accentColor}>
              Input
            </Text>
            <Textarea 
            placeholder="Enter input for your code..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            size="sm" 
            bg={useColorModeValue('gray.100', 'gray.700')}
            color={textColor}
            _placeholder={{ color: placeholderColor }}
          />
          </Box>

          <Output 
            roomId={roomId} 
            editorRef={editorRef} 
            language={language} 
            input={input} 
            selectedQuestion={selectedQuestion} 
          />
        </Box>
      </Box>
      <Box mt={8}>
  <Text fontSize="xl" fontWeight="bold" mb={4}>
    Lịch sử nộp bài
  </Text>
  {submissions && Object.keys(submissions).length > 0 ? (
  <Tabs variant="enclosed">
    <TabList>
      {[submissions].map((submission) => (
        submission?.timestamp ? (
          <Tab key={submission.timestamp.seconds}>
            {dayjs(submission.timestamp.toDate()).format("DD/MM/YYYY HH:mm:ss")}
          </Tab>
        ) : null
      ))}
    </TabList>
    <TabPanels>
      {[submissions].map((submission) => (
        submission?.timestamp ? (
          <TabPanel key={submission.timestamp.seconds}>
            <Button colorScheme="blue" onClick={() => openCodePreview(submission)}>
              Xem trước
            </Button>
          </TabPanel>
        ) : null
      ))}
    </TabPanels>
  </Tabs>
) : (
  <Text>Không tìm thấy lịch sử nộp bài.</Text>
)}


</Box>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="6xl">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Mã nguồn đã nộp</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    <Box bg="gray.900" color="white" p={4} borderRadius="md">
  <pre>{submissions.code}</pre>
</Box>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
        Đóng
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
}

