"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  Divider,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import app from "../../firebase";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
  FaInfoCircle,
} from "react-icons/fa";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

export default function TeacherStatsContent() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  // Hook cho Modal preview code
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCode, setSelectedCode] = useState("");
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const roomId = pathParts[2]; // Thay đổi logic này nếu cấu trúc URL khác

  useEffect(() => {
    const fetchQuestions = async () => {
      const db = getFirestore(app);
      const contestCollectionRef = collection(
        db,
        "rooms",
        roomId,
        "onlineJudge",
        "contest",
        "questions"
      );
      try {
        const querySnapshot = await getDocs(contestCollectionRef);
        const questionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          users: doc.data().users || [],
        }));
        setQuestions(questionsList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu câu hỏi:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [roomId]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: questions.map((q) => q.title),
    datasets: [
      {
        label: "Số sinh viên hoàn thành",
        data: questions.map(
          (q) => q.users.filter((user) => user.status === true).length
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        suggestedMin: 1,
        suggestedMax: 50,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Hàm mở Modal xem code của sinh viên
  const handlePreviewCode = (code) => {
    setSelectedCode(code);
    onOpen();
  };

  return (
    <Box
      p={6}
      bg="linear-gradient(to right, #6EE7B7, #3B82F6)"
      borderRadius="md"
      boxShadow="lg"
    >
      <Text fontSize="3xl" fontWeight="bold" mb={4} color="white">
        <Icon as={FaChartBar} mr={2} /> 📊 Thống kê số lượng sinh viên hoàn
        thành bài
      </Text>

      {/* Biểu đồ */}
      <Box
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        maxW="700px"
        mx="auto"
        mb={6}
      >
        <Bar data={chartData} options={chartOptions} height={350} />
      </Box>

      {/* Bảng thống kê chi tiết */}
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <Box
            key={question.id}
            mt={6}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            mb={6}
          >
            <Text fontSize="xl" fontWeight="bold" mb={2} color="blue.700">
              <Icon as={FaInfoCircle} mr={2} /> {question.title}
            </Text>
            <Table
              variant="striped"
              border="1px solid gray"
              colorScheme="gray" // Thêm dòng này
              borderWidth="1px"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    STT
                  </Th>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    Tên User
                  </Th>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    Email
                  </Th>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    Số lượng testcases hoàn thành
                  </Th>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    Trạng thái
                  </Th>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    Thời gian nộp
                  </Th>
                  <Th border="1px solid gray" px={6} py={3} textAlign="center">
                    Preview Code
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
  {question.users.length > 0 ? (
    question.users.map((user, idx) => (
      <Tr key={user.uid} _hover={{ bg: "blue.50" }} bg={idx % 2 === 0 ? "gray.800" : "white"}>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          {idx + 1}
        </Td>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          {user.displayName || "N/A"}
        </Td>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          {user.email || "N/A"}
        </Td>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          {user.passedTestCases || "N/A"}
        </Td>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          <Icon as={user.status ? FaCheckCircle : FaTimesCircle} color={user.status ? "green.400" : "red.400"} mr={2} />
          {user.status ? "Hoàn thành" : "Chưa hoàn thành"}
        </Td>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          {user.timestamp
            ? dayjs(user.timestamp.toDate()).format("DD/MM/YYYY HH:mm:ss")
            : "N/A"}
        </Td>
        <Td color={idx % 2 === 0 ? "white" : "black"} border="1px solid gray" px={6} py={3} textAlign="center">
          {user.code ? (
            <Button size="sm" colorScheme="teal" onClick={() => handlePreviewCode(user.code)}>
              Preview Code
            </Button>
          ) : (
            "N/A"
          )}
        </Td>
      </Tr>
    ))
  ) : (
    <Tr>
      <Td colSpan={7} textAlign="center" border="1px solid gray" px={6} py={3}>
        Chưa có ai làm
      </Td>
    </Tr>
  )}
</Tbody>


            </Table>
            {index !== questions.length - 1 && <Divider my={6} />}
          </Box>
        ))
      ) : (
        <Text fontSize="lg" color="red.500" textAlign="center">
          Không có câu hỏi nào để hiển thị!
        </Text>
      )}

      {/* Modal xem code */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          borderRadius="lg"
          boxShadow="2xl"
          border="2px solid"
          borderColor="blue.200"
          overflow="hidden"
        >
          <ModalHeader
            bg="blue.500"
            color="white"
            fontSize="2xl"
            textAlign="center"
            py={4}
          >
            Code Preview
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody bg="gray.50" p={6}>
            <Box
              as="pre"
              p={4}
              bg="gray.100"
              borderRadius="md"
              overflowX="auto"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              fontFamily="monospace"
              fontSize="md"
              color="gray.700"
            >
              {selectedCode}
            </Box>
          </ModalBody>
          <ModalFooter bg="gray.50" justifyContent="center" py={4}>
            <Button
              onClick={onClose}
              colorScheme="blue"
              size="lg"
              px={8}
              py={4}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
