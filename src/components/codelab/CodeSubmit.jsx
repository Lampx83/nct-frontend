import React, { useState, useEffect, useRef } from "react";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/python/python";
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/css/css";
import { SHA256 } from "crypto-js";
import StepBody from "./StepBody";
import { Form, Spinner } from "react-bootstrap";
import config from "../../config";
import { readElements } from "../../utils/codelab";
import axios from "axios";
import { toast } from "sonner";
import { Buffer } from "buffer";
import { Editor } from "@monaco-editor/react";
import { RxCopy } from "react-icons/rx";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdOutlineWrapText } from "react-icons/md";
import { getDatabase, onValue, ref, push } from "firebase/database";
import app from "../../firebase";
import { Timestamp } from "firebase/firestore";
const CodeSubmit = ({ table, user, room }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [codeMirrorMode, setCodeMirrorMode] = useState("");
  const [languageOptions, setLanguageOptions] = useState([]);
  const [stdin, setStdin] = useState(
    (readElements(table?.tableRows[1]?.tableCells[0]?.content)) || ""
  );
  const hasInput = !!((readElements(table?.tableRows[1]?.tableCells[0]?.content))?.trim() || "");
  const expected_output =
    readElements(table.tableRows[1].tableCells[1].content) || "";
  const [output, setOutput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [theme, setTheme] = useState("light");
  const [wrapLines, setWrapLines] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    setStdin((readElements(table?.tableRows[1]?.tableCells[0]?.content)) || "");
    setUserAnswer("");
    setOutput("");
    setIsWaiting(false);
  }, [table]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${config.API_OJ_BASE_URL}/languages`);
        const data = await response.json();
        setLanguageOptions(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output, isWaiting]);

  const handleAnswerChange = (value) => {
    setUserAnswer(value);
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
  const handleSubmit = async () => {
    if (!selectedLanguage) {
      setOutput("Chọn ngôn ngữ đầu vào!");
      setIsWaiting(false);
      return;
    }
    if (!userAnswer) {
      setOutput("Chưa nhập code!");
      setIsWaiting(false);
      return;
    }

    setOutput("");
    setIsWaiting(true);

    const body = {};
    if (stdin) {
      body.stdin = utf8ToBase64(stdin);
    }
    if (expected_output) {
      body.expected_output = utf8ToBase64(expected_output);
    }
    const db = getDatabase(app);
    const userPath = `/logs`;
    const userRef = ref(db, userPath);

    let response = null;
    try {
      response = await axios.post(
        `${config.API_OJ_BASE_URL}/submissions?base64_encoded=true&wait=false`,
        {
          language_id:
            selectedLanguage === "HTML" || selectedLanguage === "CSS"
              ? 43
              : parseInt(selectedLanguage),
          source_code: utf8ToBase64(userAnswer),
          ...body,
        }
      );
    } catch (e) {
      setOutput(e.message || "Error");
      setIsWaiting(false);
      return;
    }
    const token = response.data.token;
    
    try {
      let status = 1;
      
      while (status === 1 || status === 2) {
        const { data } = await axios.get(
          `${config.API_OJ_BASE_URL}/submissions/${token}?base64_encoded=true`
        );
        status = data.status.id;
        if (data.status.id !== 1 && data.status.id !== 2) {
          let res = "";
          if (data?.stdout) {
            res += base64ToUtf8(data?.stdout) + "\n";
          }
          if (data?.stderr) {
            res += base64ToUtf8(data?.stderr) + "\n";
          }
          if (data?.compile_output) {
            res += base64ToUtf8(data?.compile_output) + "\n";
          }
          if (data?.message) {
            res += base64ToUtf8(data?.message) + "\n";
          }
          if (data?.status?.description) {
            res += data?.status?.description + "\n";
          }
          fetch(`${config.API_BASE_URL}/logs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logType: "codeSubmit",
              roomID: room.roomID,
              user: user.displayName,
              log: {
                language: selectedLanguage,
                code: userAnswer,
                input: stdin,
                status: data?.status?.description,
              },
            }),
          }).catch(console.error);
          setOutput(res);
          toast.info("Đã có kết quả!");
          setIsWaiting(false);
        }
        await sleep(2000);
      }
    } catch (e) {
      setOutput(e.message || "Error");
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);

    const name = languageOptions.find(
      (language) => language.id === parseInt(e.target.value)
    )?.name;
    // setCodeMirrorMode(languageToMode[name?.toLowerCase()?.replace(/ \(.*/, '')] || 'text/plain');
    setCodeMirrorMode(getLanguageName(name));
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(userAnswer);
    await fetch(`${config.API_BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logType: "copyCode",
        roomID: room.roomID,
        userName: user.displayName,
        log: {
          code: userAnswer,
        },
      }),
    });
    toast.success("Đã copy code!");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "vs-dark" : "light");
  };

  const toggleWrapLines = () => {
    setWrapLines(!wrapLines);
  };

  return (
    <>
      <div className="exercise">
        {table &&
          table.tableRows.length > 0 &&
          table.tableRows[0].tableCells.length > 0 && (
            <StepBody content={table.tableRows[0].tableCells[0].content} />
          )}
        <div className="submit-code">
          <div className="code-tool">
            <div className="left-elements">
              <Form.Select
                size={"sm"}
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="">Select language</option>
                <option value={"HTML"}>HTML</option>
                <option value={"CSS"}>CSS</option>
                {languageOptions.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="right-elements d-flex align-items-center">
              <span
                className="copy-button"
                onClick={() => {
                  handleCopy();
                }}
              >
                {<RxCopy size={24} />}{" "}
              </span>
              <span className="switch-button" onClick={toggleTheme}>
                {theme === "light" ? <FiSun size={24} /> : <FiMoon size={24} />}
              </span>
              <span className="wrapline-button" onClick={toggleWrapLines}>
                <MdOutlineWrapText size={24} />
              </span>
            </div>
          </div>
          <Editor
            height="40vh"
            width={"100%"}
            language={codeMirrorMode}
            value={userAnswer}
            onChange={handleAnswerChange}
            options={{
              theme: theme,
              fontSize: 20,
              minimap: { enabled: false },
              wordWrap: wrapLines ? "on" : "off",
              lineNumbers: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              scrollbar: { vertical: "auto", horizontal: "auto" },
            }}
          />
        </div>
        <div className={"my-4"}>
          <h4>Input</h4>
          <Form.Control
            as="textarea"
            rows={3}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            disabled={hasInput}
          />
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {(output || isWaiting) && (
        <div className="exercise" ref={outputRef}>
          <div
            className={`output ${
              isWaiting
                ? "d-flex justify-content-center align-items-center"
                : ""
            }`}
          >
            {output && (
              <>
                <h4>Output</h4>
                <pre>{output}</pre>
              </>
            )}
            {isWaiting && <Spinner animation="border" variant="primary" />}
          </div>
        </div>
      )}
    </>
  );
};

function utf8ToBase64(str) {
  return Buffer.from(str, "utf8").toString("base64");
}

function base64ToUtf8(str) {
  return Buffer.from(str, "base64").toString("utf8");
}

function getLanguageName(str) {
  const parsed = str?.toLowerCase()?.replace(/ \(.*/, "") || "";
  if (parsed === "c++") {
    return "cpp";
  }
  return parsed;
}

export default CodeSubmit;
