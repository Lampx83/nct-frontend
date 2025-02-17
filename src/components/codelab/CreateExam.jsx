"use client";
import { useState } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  useColorModeValue,
  ChakraProvider,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import CreateExamContent from "./CreateExamContent";

export default function TeacherStats() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (password === "@smartdoc") {
        setIsAuthenticated(true);
      } else {
        alert("Sai mật khẩu! Vui lòng thử lại.");
        setPassword("");
      }
      setLoading(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <ChakraProvider>
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.900"
        >
          <VStack
            p={6}
            bg="gray.800"
            borderRadius="lg"
            boxShadow="xl"
            spacing={4}
            maxW="400px"
            w="full"
          >
            <FaLock size={50} color="cyan" />
            <Text fontSize="xl" fontWeight="bold" color="white">
              Nhập mật khẩu để truy cập
            </Text>
            <Input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              textAlign="center"
              bg="gray.700"
              color="white"
              border="1px solid gray"
              _placeholder={{ color: "gray.400" }}
              _focus={{ borderColor: "cyan.400" }}
            />
            <Button
              colorScheme="cyan"
              onClick={handleLogin}
              isLoading={loading}
              isDisabled={!password}
              w="full"
            >
              Xác nhận
            </Button>
          </VStack>
        </Box>
      </ChakraProvider>
    );
  }

  return <CreateExamContent />; // Chỉ hiển thị nội dung chính khi đã nhập đúng mật khẩu
}
