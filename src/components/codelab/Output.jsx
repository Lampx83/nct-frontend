import { useState, useEffect } from "react";
import { Box, Button, Text, useToast, HStack, Spacer } from "@chakra-ui/react";
import { executeCode } from "../../api";
import { Flex } from "antd";
import app from "../../firebase";
import { getFirestore, doc, updateDoc, arrayUnion ,setDoc, getDoc, Timestamp} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(app);
const auth = getAuth(app); // Lấy thông tin người dùng hiện tại
const Output = ({ editorRef, language, input = "", selectedQuestion,roomId }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [testResults, setTestResults] = useState([]); // Kết quả kiểm tra test case
  const [isChecking, setIsChecking] = useState(false); // Trạng thái kiểm tra test case

  // Reset output khi selectedQuestion thay đổi
  useEffect(() => {
    setOutput(null);
    setTestResults([]);
    setIsError(false);
  }, [selectedQuestion]);

  // Hàm để chạy code và hiển thị output
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode, input);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm để kiểm tra test case của câu hỏi đang chọn
  // Hàm để kiểm tra test case của câu hỏi đang chọn
const checkTestCases = async () => {
  const sourceCode = editorRef.current.getValue();
  const user = auth.currentUser;
  if (!user) {
    toast({
      title: "User not logged in",
      description: "Please log in before checking test cases.",
      status: "warning",
      duration: 4000,
    });
    return;
  }

  if (!sourceCode || !selectedQuestion || !selectedQuestion.testCases) {
    toast({
      title: "No question selected or no test cases available.",
      status: "warning",
      duration: 4000,
    });
    return;
  }

  setIsChecking(true);
  const results = [];

  for (const testCase of selectedQuestion.testCases) {
    try {
      const { run: result } = await executeCode(language, sourceCode, testCase.input);
      const programOutput = result.output.trim();
      const expectedOutput = testCase.expectedOutput.trim();
      const isPass = programOutput === expectedOutput;
      results.push({ input: testCase.input, expectedOutput, programOutput, isPass });
    } catch (error) {
      results.push({ input: testCase.input, expectedOutput: "N/A", programOutput: "Error", isPass: false });
    }
  }

  setTestResults(results);
  setIsChecking(false);

  // Tính số lượng test case đúng
  const passedCount = results.filter((testCase) => testCase.isPass).length;
  // Nếu số test case đúng bằng tổng số test case, status sẽ là true, ngược lại false
  const status = passedCount === selectedQuestion.testCases.length;

  // Cập nhật dữ liệu lên Firestore dù có đạt đủ test case hay không
  try {
    const questionRef = doc(db, "rooms", roomId, "onlineJudge", "contest", "questions", selectedQuestion.id);
    // Kiểm tra xem dữ liệu của câu hỏi đã có hay chưa
    const questionSnap = await getDoc(questionRef);
    if (questionSnap.exists()) {
      const questionData = questionSnap.data();
      const users = questionData.users || [];
      const existingUserIndex = users.findIndex((u) => u.uid === user.uid);
      if (existingUserIndex === -1) {
        // Nếu chưa có, thêm mới bằng arrayUnion
        await updateDoc(questionRef, {
          users: arrayUnion({
            displayName: user.displayName || "Anonymous",
            uid: user.uid || "Unknown",
            status, // true nếu đạt đủ, false nếu không đạt
            email: user.email || "Anonymous",
            timestamp: Timestamp.now(),
            code: sourceCode,
            passedTestCases: `${passedCount}/${selectedQuestion.testCases.length}`, // số test case đúng
          }),
        });
      } else {
        // Nếu đã có, cập nhật lại thông tin của user đó
        users[existingUserIndex] = {
          ...users[existingUserIndex],
          status,
          code: sourceCode,
          timestamp: Timestamp.now(),
          passedTestCases: passedCount,
        };
        await updateDoc(questionRef, { users });
      }
    } else {
      // Nếu câu hỏi chưa tồn tại, tạo mới document với dữ liệu
      await setDoc(
        questionRef,
        {
          users: [
            {
              displayName: user.displayName || "Anonymous",
              uid: user.uid || "Unknown",
              status,
              email: user.email || "Anonymous",
              timestamp: new Date(),
              code: sourceCode,
              passedTestCases: passedCount,
            },
          ],
        },
        { merge: true }
      );
    }

    toast({
      title: "Success!",
      description: `Your progress has been recorded. Passed ${passedCount} out of ${selectedQuestion.testCases.length} test case(s).`,
      status: "success",
      duration: 4000,
    });
  } catch (error) {
    console.error("Failed to update Firestore:", error);
    toast({
      title: "Error updating progress",
      description: error.message,
      status: "error",
      duration: 4000,
    });
  }
};

  return (
    <Box w="100%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <HStack mb={4} width="100%">
        <Button variant="outline" colorScheme="green" isLoading={isLoading} onClick={runCode}>
          Run Code
        </Button>
        <Button variant="solid" colorScheme="blue" isLoading={isChecking} onClick={checkTestCases}>
          Check Test Cases
        </Button>
        <Spacer />
        <Text fontSize="lg" mb={2}>
          Test Case Results
        </Text>
      </HStack>

      <Flex direction="row" gap="20px">
        {/* Kết quả đầu ra */}
        <Box
          width="50%"
          height="50vh"
          p={2}
          color={isError ? "red.400" : ""}
          border="1px solid"
          borderRadius={4}
          borderColor={isError ? "red.500" : "#333"}
          mb={4}
        >
          {output
            ? output.map((line, i) => <Text key={i}>{line}</Text>)
            : 'Click "Run Code" to see the output here'}
        </Box>

        {/* Kết quả kiểm tra test case */}
        <Box width="50%">
  {testResults.length > 0 ? (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Test Case Results
      </Text>
      {testResults.map((testCaseResult, i) => (
        <Box key={i} mb={2} p={2} borderRadius={6} bg={testCaseResult.isPass ? "green.100" : "red.100"}>
          <Text fontWeight="bold" color={testCaseResult.isPass ? "green.500" : "red.500"}>
            Test {i + 1}:{" "}
            <Text as="span" color={testCaseResult.isPass ? "green.500" : "red.500"}>
              {testCaseResult.isPass ? "✅ Pass" : "❌ Fail"}
            </Text>
          </Text>
          {/* <Text fontSize="sm">🔹 Input: {testCaseResult.input}</Text>
          <Text fontSize="sm">✅ Expected: {testCaseResult.expectedOutput}</Text> */}
          {/* <Text fontSize="sm">📌 Output: {testCaseResult.programOutput}</Text> */}
        </Box>
      ))}
    </Box>
  ) : (
    <Text>Click "Check Test Cases" to see the results</Text>
  )}
</Box>

      </Flex>
    </Box>
  );
};

export default Output;
