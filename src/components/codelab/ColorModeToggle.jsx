import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
// Tạo một motion component từ IconButton
const MotionIconButton = motion(IconButton);

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      label={colorMode === "light" ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
      placement="bottom"
      hasArrow
    >
      <AnimatePresence mode="wait">
        <MotionIconButton
          key={colorMode}
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          colorScheme={colorMode === "light" ? "blue" : "yellow"}
          _hover={{ transform: "scale(1.1)" }}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />
      </AnimatePresence>
    </Tooltip>
  );
}