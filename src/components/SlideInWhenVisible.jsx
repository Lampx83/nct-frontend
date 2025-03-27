"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SlideInWhenVisible({ children, direction = "up" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 200 : direction === "down" ? -50 : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <div ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 1, ease: "easeOut" }}
        variants={variants}
        // className="p-4 bg-blue-500 text-white rounded-lg shadow-lg"
      >
        {children}
      </motion.div>
    </div>
  );
}
