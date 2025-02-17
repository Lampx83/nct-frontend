// Syllabus.js
import React from "react";
import { useRouter } from 'next/navigation';
import Document from "./Document";
const Syllabus = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(location.search);
  const display = searchParams.get("display") || "doc"; //doc, book, slide
  const containerClass = display === "slide" ? "container-fluid" : "container";

  return (
    <div className={containerClass}>
      <Document />
    </div>
  );
};
export default Syllabus;
