'use client';

import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco, irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { RxCopy } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdOutlineWrapText } from "react-icons/md";
import { getDatabase, onValue, ref, push } from "firebase/database";
import app from "../../firebase";
import config from "../../config";
import { Timestamp } from "firebase/firestore";
const CodeDisplay = ({ table, font, user, room }) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState("darcula");
  const [wrapLines, setWrapLines] = useState(true);

  const handleCopy = async () => {
    try {
      // Log the copy action

      fetch(`${config.API_BASE_URL}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logType: "copyCode",
          roomID: room.roomID,
          userName: user.displayName,
          log: {
            code: codeString,
          },
        }),
      });

      // Copy the code to clipboard
      await navigator.clipboard.writeText(codeString);

      // Show UI feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Error during copy or logging process:", error);

      // Optional: Provide error feedback to the user
      setCopied(false);
    }
  };

  const toggleWrapLines = () => {
    setWrapLines((prevWrapLines) => !prevWrapLines);
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "docco" ? "irBlack" : "docco"));
  };

  const extractTextContent = (cell) => {
    return cell.content
      .map((paragraph) =>
        paragraph.paragraph.elements
          .map((element) => element.textRun.content)
          .join("")
      )
      .join("")
      .trim();
  };

  const extractRowContent = (row) => {
    return row.tableCells
      .map((cell) => extractTextContent(cell))
      .join("")
      .trim();
  };

  const extractTableContent = (table) => {
    return table.tableRows
      .map((row) => extractRowContent(row))
      .join("")
      .trim();
  };

  const codeString = extractTableContent(table);
  const numberOfLines = codeString.split("\n").length;
  const blackAndWhite = {
    hljs: {
      display: "block",
      overflowX: "auto",
      padding: "0.5em",
      color: "#000000",
      background: "#F8F8FF",
    },
    "hljs-keyword": { color: "#000000" },
    "hljs-literal": { color: "#000000" },
    "hljs-symbol": { color: "#000000" },
    "hljs-name": { color: "#000000" },
    "hljs-comment": { color: "#000000" },
    "hljs-tag": { color: "#000000" },
    "hljs-string": { color: "#000000" },
  };
  let codeStyle = theme === "irBlack" ? irBlack : docco;
  if (font === "Consolas") {
    codeStyle = blackAndWhite;
  }
  // Determine language based on codeString content
  const language = codeString.startsWith("<") ? "htmlbars" : "auto";

  return (
    <div className="code-container">
      <div className="code-tool">
        <div className="left-elements"></div>
        <div className="right-elements">
          <span
            className="copy-button"
            onClick={() => {
              handleCopy();
            }}
          >
            {copied ? <IoMdCheckmark /> : <RxCopy />}{" "}
            {copied ? `Copied` : `Copy`}
          </span>
          <span className="switch-button" onClick={toggleTheme}>
            {theme === "irBlack" ? <FiSun /> : <FiMoon />}
          </span>
          <span className="wrapline-button" onClick={toggleWrapLines}>
            <MdOutlineWrapText />
          </span>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={codeStyle}
        showLineNumbers={numberOfLines > 1}
        wrapLines={wrapLines}
        lineProps={{ style: { whiteSpace: "pre-wrap" } }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
