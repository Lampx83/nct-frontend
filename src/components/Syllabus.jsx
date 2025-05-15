"use client";
import {
  useParams,
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import StepContent from "@/components/codelab/StepContent";
import "@/css/doc.css";
import { Modal, Select, Button, Spin } from "antd";
import axios from "@/utils/axios";
import { denormalizeSubjectCode, versionAndYear } from "@/helpers/curriculumTable";

import { useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  OAuthProvider,
} from "firebase/auth";
import { convertKNumber } from "@/constant/versionSyllabus";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAowCDyHC5b0HhhIBvxVqc0o3lLSMXnJM",
  authDomain: "vncodelab2.firebaseapp.com",
  databaseURL: "https://vncodelab2-default-rtdb.firebaseio.com",
  projectId: "vncodelab2",
  storageBucket: "vncodelab2.appspot.com",
  messagingSenderId: "852532707206",
  appId: "1:852532707206:web:5281cd31d29828fbc7f607",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default function Syllabus({ dataResponse }) {
  const params = useParams(); // For dynamic route parameters
  const validateParams = denormalizeSubjectCode(
    params?.slug?.toString().replaceAll(",", "/")
  );
  const router = useRouter(); // For navigation
  const searchParams = useSearchParams(); // For query parameters
  const pathname = usePathname(); // For the current path
  const chap = searchParams.get("chap");
  const display = searchParams.get("display") || "doc";
  const [currentStep, setCurrentStep] = useState(0);

  const [subjectCode, setSubjectCode] = useState(null);
  const [subjectFaculty, setSubjectFaculty] = useState("---");
  const [showStepList, setShowStepList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [slideTitle, setSlideTitle] = useState(null);
  const [template, setTemplate] = useState("NEU");
  const [docx, setDocx] = useState(null);
  const [stepsData, setStepsData] = useState({
    steps: [],
    contents: [],
    listChapter: [],
  });
  const [selectedYear, setSelectedYear] = useState("");
  const [docError, setDocError] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [syllabusOptions, setSyllabusOptions] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [loadingSyllabi, setLoadingSyllabi] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const isRoomInPath = pathname.includes("room");
  const isSyllabusInPath = pathname.includes("syllabus");
  const [versionSyllabus, setVersionSyllabus] = useState([]);

  const [majorsCourse, setMajorsCourse] = useState([]);
  const [modalCourse, setModalCourse] = useState(false);
  const [modalCourseOK, setModalCourseOK] = useState(false);
  const [modalCourseCancel, setModalCourseCancel] = useState(false);
  const contentRef = useRef(null);
  const [years, setYears] = useState([]);
  useEffect(() => {
    // Lấy Kxx từ URL (/syllabus/K66/vi/CNTT1101 -> K66)
    const match = pathname.match(/\/syllabus\/(K\d{2})\//);
    if (match) {
      const foundVersion = convertKNumber(match[1]); // Áp dụng convertKNumber
      setSelectedYear(versionAndYear(foundVersion)); // Chuyển thành "K66 - 2024"
    }
}, [pathname]);
const handleYearChange = (year) => {
  setSelectedYear(year);

  const yearSlug = year.split(" - ")[0]; // Lấy "K67" từ "K67 - 2025"

  if (!/K\d{2}/.test(pathname)) {
    console.error("URL không chứa khóa học hợp lệ:", pathname);
    return;
  }
  const newPathname = pathname.replace(/K\d{2}/, yearSlug); // Thay thế phần khóa học cũ

  if (newPathname !== pathname) {
    // router.push(newPathname);
    window.location.href = newPathname
  } else {
    console.warn("URL không thay đổi:", newPathname);
  }
};
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalCourse = () => {
    setModalCourse(true);
  };
  const handleOkModalcourse = () => {
    setModalCourse(false);
  };
  const handleCancelModalcourse = () => {
    setModalCourse(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchVersionSyllabus = async () => {
      if (!params?.slug || params.slug.length < 3) {
        console.error("Invalid params.slug:", params?.slug);
        return;
      }

      try {
        const res = await axios.get(`https://courses.neu.edu.vn/codelab/api/course/${params.slug.join("/")}`);
        setVersionSyllabus(res.data);
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };

    fetchVersionSyllabus();
  }, [params.slug]); 
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await axios.get(`/curriculum-majors`, {
          params: {
            "populate[curriculum_curricula][populate][curriculum_curriculum_subjects][populate][curriculum_subject]":
              "*",
            "pagination[withCount]": false,
            "pagination[pageSize]": 70,
          },
          validateStatus: (status) => status < 500,
        });

        const data = res.data;
        const foundMajors = [];
        if (data && data.data) {
          for (const major of data.data) {
            let isMajorAdded = false; // Track if the current major is already added
            for (const curriculum of major.attributes.curriculum_curricula
              .data) {
              for (const subjectData of curriculum.attributes
                .curriculum_curriculum_subjects.data) {
                const subject =
                  subjectData.attributes.curriculum_subject.data?.attributes;
                if (subject?.subjectCode === extractSubjectCode(pathname)) {
                  foundMajors.push(major); // Add the current major
                  isMajorAdded = true; // Mark as added
                  break; // Exit the innermost loop
                }
              }
              if (isMajorAdded) break; // Exit the second loop if major is added
            }
            if (isMajorAdded) continue; // Skip to the next major if it was already added
          }
        }

        setMajorsCourse(foundMajors);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
      }
    };

    fetchMajors();
  }, []);
  function extractSubjectCode(pathname) {
    // Use a regular expression to match the subject code.
    // This regex looks for a sequence of uppercase letters, digits, or a combination of both
    // at the end of the pathname, after a hyphen or a slash.
    const pathNameArr = pathname.split("/");
    const validateParams = pathNameArr[pathNameArr.length - 1];
    if (validateParams) {
      return validateParams; // Return the captured group (the subject code).
    } else {
      return null; // Return null if no match is found.
    }
  }
  function formatTitle(input) {
    // Tìm vị trí cuối cùng có dấu cách
    const lastSpaceIndex = input.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
      // Nếu không có dấu cách, trả về chuỗi gốc
      return input;
    }

    // Thay thế dấu cách bằng "_" từ vị trí đó
    return (
      input.slice(0, lastSpaceIndex) + "_" + input.slice(lastSpaceIndex + 1)
    );
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const lastPathname = validateParams.split("/").at(-1);
      const res = await axios.get(
        `/curriculum-subjects?filters[subjectCode]=${lastPathname}&populate[curriculum_faculties]=*`
      );
      setTitle(res?.data?.data[0]?.attributes?.name);
      setSubjectCode("(" + res?.data?.data[0]?.attributes?.subjectCode + ")");
      setSubjectFaculty(
        res?.data?.data[0]?.attributes?.curriculum_faculties.data[0].attributes
          .name
      );
    };
    fetchAPI();
  });
  const readDoc = async () => {
    try {
      setLoading(true);
      // setYears(response.data.map((year) => year.year));
      if (dataResponse.labName) {
        document.title = dataResponse.labName;
        setSlideTitle(dataResponse.labName);
        const docx = formatTitle(dataResponse.labName) + ".docx";
        setDocx(docx);
      }
      setRoom(dataResponse);

      // Lấy danh sách năm học từ API
      const x = [
        "K67 - 2025",
        "K66 - 2024",
        "K65 - 2023",
        "K64 - 2022",
        "K63 - 2021",
        "K62 - 2020",
        "K61 - 2019",
      ];
      dataResponse.year = x;
      if (dataResponse.year) {
        setYears(x);
      }

      const { config: labConfig, listChapter } = dataResponse;
      const steps = [];
      const contents = [];
      let currentHeading = {
        name: dataResponse?.labName || "",
        content: [],
        style: "Start",
        level: 0,
        index: 0,
        parentIndex: null,
      };

      const pushCurrentHeading = () => {
        if (
          (currentHeading.style && currentHeading.name?.trim() !== "") ||
          currentHeading.style === "Start"
        ) {
          steps.push({
            style: currentHeading.style,
            name: currentHeading.name?.trim(),
            level: currentHeading.level,
            index: currentHeading.index,
            parentIndex: currentHeading.parentIndex,
            chapter: currentHeading.chapter,
          });
          contents.push({
            content: currentHeading.content,
            level: currentHeading.level,
            index: currentHeading.index,
            parentIndex: currentHeading.parentIndex,
          });
        }
      };

      let lastH1Index = -1;
      let lastH2Index = -1;
      let chapter = 0;

      dataResponse.data?.content.forEach((item, index) => {
        if (item.paragraph) {
          const { namedStyleType } = item.paragraph.paragraphStyle;
          const isValidHeading =
            namedStyleType === "HEADING_1" ||
            namedStyleType === "HEADING_2" ||
            namedStyleType === "HEADING_3";

          if (isValidHeading) {
            pushCurrentHeading();
            currentHeading = {
              name: item.paragraph.elements[0]?.textRun?.content || "",
              content: [],
              style: item.paragraph.paragraphStyle,
              level:
                namedStyleType === "HEADING_1"
                  ? 1
                  : namedStyleType === "HEADING_2"
                    ? 2
                    : 3,
              index: index,
              parentIndex:
                namedStyleType === "HEADING_1"
                  ? -1
                  : namedStyleType === "HEADING_2"
                    ? lastH1Index
                    : lastH2Index,
              chapter: namedStyleType === "HEADING_1" ? ++chapter : chapter,
            };

            if (namedStyleType === "HEADING_1") lastH1Index = index;
            if (namedStyleType === "HEADING_2") lastH2Index = index;
          } else {
            currentHeading.content.push(item);
          }
        } else if (item) {
          currentHeading.content.push(item);
        }
      });

      pushCurrentHeading();
      setStepsData({ steps, contents, listChapter });
      setLoading(false);

      if (!isRoomInPath) {
        const updatedParams = new URLSearchParams(searchParams);
        router.replace(`${pathname}?${updatedParams.toString()}`);
      }
    } catch (error) {
      console.error("Error fetching doc:", error);
      setDocError("An error occurred while loading the document.");
      setLoading(false);
    }
  };
  useEffect(() => {
    readDoc(selectedYear);
  }, [selectedYear]);
  useEffect(() => {
    const auth = getAuth();

    // Kiểm tra trạng thái đăng nhập của người dùng
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Dọn dẹp listener khi component unmount
    return () => unsubscribe();
  }, []);
  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  const handleDownloadWordFile = async () => {
    try {
      const auth = getAuth();
      let user = auth.currentUser;
      if (!user) {
        console.log(
          "User not signed in. Initiating Microsoft sign-in process..."
        );
        const provider = new OAuthProvider("microsoft.com");

        try {
          const result = await signInWithPopup(auth, provider);
          user = result.user;
          setUser(user);
          console.log("User signed in successfully with Microsoft:", user);
        } catch (error) {
          if (error.code === "auth/popup-closed-by-user") {
            console.warn("Sign-in popup was closed by the user.");
            alert(
              "Sign-in process was canceled. Please sign in to download the file."
            );
            return;
          } else {
            throw error;
          }
        }
      }

      // Check if the user's email belongs to the specified domain
      const email = user.email;
      if (!email.endsWith("neu.edu.vn")) {
        alert("Your email domain is not authorized to download this file.");
        return;
      }

      // Proceed to download the file if the user is authenticated and email domain is valid
      await downloadFile();
    } catch (error) {
      console.error("Error handling file download:", error.message);
    }
  };

  const downloadFile = async () => {
    try {
      const docID = room.docID.replace(/\./g, ""); // Adjust docID based on your data
      const response = await fetch(
        `https://fit.neu.edu.vn/codelab/api/download-word-course?docID=${docID}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file: " + response.statusText);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      const nameFileDownload = docID.replace("anonymous", "");
      a.download = `${nameFileDownload}.docx`; // Set the downloaded file name
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };
  const handleCompareClick = () => {
    const [year, locale, code] = validateParams.split("/");
    router.push(`/syllabus/compares?first=${code}`);
  };
  const mainContent = loading ? (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <Spin size="large" />
    </div>
  ) : display === "book" || display === "doc" ? (
    stepsData.contents.map((content, index) => (
      <div className="container" key={index}>
        <StepContent
          room={room}
          steps={stepsData.steps}
          step={stepsData.steps[index]}
          content={content}
          currentStep={index}
          display={display}
        />
      </div>
    ))
  ) : (
    stepsData.contents[currentStep] && (
      <StepContent
        room={room}
        steps={stepsData.steps}
        step={stepsData.steps[currentStep]}
        content={stepsData.contents[currentStep]}
        currentStep={currentStep}
        display={display}
      />
    )
  );

  return (
    <div className="container-fluid container-lg my-5">
      {!docError && (
        <div className="d-flex justify-content-end align-items-center mb-4 gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="version-text">Version:</span>
            <Select
              options={versionSyllabus
                .sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1))) // Sắp xếp tăng dần theo số
                .map((year) => ({ label: versionAndYear(year), value: versionAndYear(year) }))
              }
              value={selectedYear}
              onChange={handleYearChange}
            />
          </div>

        </div>
      )}

      <div className="NEU" ref={contentRef}>
        <div className="fluid-container">
          <div className="row flex-nowrap">
            <div
              className="offcanvas offcanvas-start d-xxl-none"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  Nội dung
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              {/* <div className="offcanvas-body p-0">
                   <StepList
                     steps={stepsData.steps}
                     currentStep={currentStep}
                     handleStepClick={handleStepClick}
                     show={showStepList}
                     display={display}
                     room={room}
                     user={user}
                   />
                 </div> */}
            </div>
            <div
              className={`${display?.includes("slide") ? "col" : "main-content"
                }`}
            >
              <div className="justify-content-center content">
                {mainContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const getSlug = (faculty) => {
  if (typeof faculty !== "string") {
    return ""; // Or throw an error, depending on your needs
  }

  return faculty
    .toLowerCase() // Convert to lowercase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .replace(/đ/g, "d") // Replace đ with d
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters (except spaces and hyphens)
    .replace(/[\s-]+/g, "-") // Replace spaces and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};
