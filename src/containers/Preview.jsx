import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useParams, useNavigate } from "react-router-dom";
// import '../css/preview.css';
import "material-icons/iconfont/material-icons.css";
import StepContent from "../components/StepContent";
import Header from "../components/Header";
import config from "../config";
import firebase from "firebase/compat/app";
import app from "../firebase";
import "firebase/compat/database";
import { getDatabase, onDisconnect, ref, set } from "firebase/database";
import "firebase/firestore";
import paged, { registerHandlers, Previewer, Handler } from "pagedjs";

import SettingsButton from "../components/SettingsButton";

const Preview = () => {
  const { email, id, year } = useParams();

  const router = useRouter();
  const searchParams = new URLSearchParams(location.search);
  const slideHeadingParam = searchParams.get("slideHeading");
  const display = searchParams.get("display");
  const chap = searchParams.get("chap");
  const update = searchParams.get("update");
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsData, setStepsData] = useState({
    steps: [],
    contents: [],
    listChapter: [],
  });
  const [showStepList, setShowStepList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const [slideTitle, setSlideTitle] = useState(null);
  const [template, setTemplate] = useState(null);
  const [settingsChangeCounter, setSettingsChangeCounter] = useState(0);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    setShowStepList(false);
    window.location.hash = `#${index}`;
    if (room.roomID) {
      const db = getDatabase(app);
      let link = chap ? `/chap${chap}` : "";
      set(
        ref(
          db,
          `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${link}/users/${
            user.uid
          }`
        ),
        {
          step: index,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          name: user.displayName,
        }
      );
    }
  };

  const handleTitleClick = () => {
    handleStepClick(0);
  };
  const handleOptionClick = (selectedItem) => {
    if (prevChap != selectedItem) {
      setSelectedItem(selectedItem);
      setLoading(true);
      setCurrentStep(0);
      // Update URL when selectedItem changes
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("chap", selectedItem);
      navigate(`${location.pathname}?${queryParams.toString()}`);
    } else {
      setCurrentStep(0);
    }
  };
  const handleUserLogin = (userData) => {
    setUser(userData);
  };
  const isRoomInPath = window.location.pathname.includes("room");
  const isUnitInPath = window.location.pathname.includes("unit");

  // Custom hook to get the previous value of a prop/state
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevChap = usePrevious(chap);
  var labConfig;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let listChapter;
        let data;
        if (isRoomInPath) {
          let url = `${config.API_BASE_URL}/room/${id}${
            (chap ? chap : selectedItem)
              ? `?chap=${chap ? chap : selectedItem}`
              : ""
          }`;
          let response = await fetch(url);
          data = await response.json();
          if (update === "true" && data.docID) {
            navigate(`/preview/${data.docID}`);
            return;
          }
          labConfig = data.config;
          data.teacher = data.userID === user.uid;
          setRoom(data);
          //var mang = ["Dlo8Dn", "ArEDlK", "WQIK1L", "QpErCB", "ydZ4k9", "ix3IQY", "k7vuu7", "xLPND1", "lURTu4"];
          if (labConfig.template) {
            setTemplate(labConfig.template);
          } else {
            setTemplate("NEU");
          }
          const db = getDatabase(app);
          let link = chap ? `/chap${chap}` : "";
          const refUsers = ref(
            db,
            `/labs/${data.docID.replace(/\./g, "")}/${
              data.roomID
            }${link}/users/${user.uid}`
          );
          await onDisconnect(refUsers).set({});
          const hash = window.location.hash;
          const hashIndex = hash ? parseInt(hash.substring(1), 10) : 0;
          //Vao phong, dang ky step
          if (hashIndex > 0) {
            let link = chap ? `/chap${chap}` : "";
            set(
              ref(
                db,
                `/labs/${data.docID.replace(/\./g, "")}/${
                  data.roomID
                }${link}/users/${user.uid}`
              ),
              {
                step: hashIndex,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                name: user.displayName,
              }
            );
          }

          const handleChapChange = async () => {
            if (isRoomInPath && room && user) {
              const db = getDatabase(app);
              const prevChapRef = ref(
                db,
                `/labs/${data.docID.replace(/\./g, "")}/${
                  data.roomID
                }/chap${prevChap}/users/${user.uid}`
              );
              await set(prevChapRef, null); // Set the data to null to clear it
            }
          };
          if (prevChap !== chap) {
            await handleChapChange();
          }
          listChapter = data.listChapter;
          data = data.data;
        } else if (isUnitInPath) {
          let url = `${config.API_BASE_URL}/unit/${year}/${id}`;
          if (chap || selectedItem || display === "print") {
            url += "?";
          }
          if (chap || selectedItem) {
            url += `chap=${chap || selectedItem}`;
          }
          if (display === "print") {
            if (chap || selectedItem) {
              url += "&";
            }
            url += `display=${display}`;
          }
          let response = await fetch(url);
          data = await response.json();
          data.docID = id;
          setRoom(data);
          labConfig = data.config;
          listChapter = data.listChapter;
          data = data.data;
          setTemplate("NEU");
        } else {
          let url = `${config.API_BASE_URL}/preview`;
          if (email) {
            url += `/${email}`;
          }
          if (id) {
            url += `/${id}`;
          }
          if (chap || selectedItem || display === "print") {
            url += "?";
          }
          if (chap || selectedItem) {
            url += `chap=${chap || selectedItem}`;
          }

          if (display) {
            if (url.includes("?")) {
              url += `?display=${display}`;
            } else {
              url += `?display=${display}`;
            }
          }

          // let url = email
          //     ? `${config.API_BASE_URL}/preview/${email}/${id}${(chap || selectedItem) ? `?chap=${chap || selectedItem}` : ''}${display ? `&display=${display}` : ''}`
          //     : `${config.API_BASE_URL}/preview/${id}${(chap || selectedItem) ? `?chap=${chap || selectedItem}` : ''}${display ? `&display=${display}` : ''}`;

          let response = await fetch(url);
          data = await response.json();
          data.docID = id;
          setRoom(data);
          labConfig = data.config;
          listChapter = data.listChapter;
          data = data.data;
          setTemplate("NEU");
        }
        let steps = [];
        let contents = [];
        let currentHeading = {
          name: "",
          content: [],
          style: null,
          level: 0,
          index: 0,
          parentIndex: null,
        };
        const pushCurrentHeading = () => {
          if (currentHeading.style && currentHeading.name.trim() !== "") {
            steps.push({
              style: currentHeading.style,
              name: currentHeading.name.trim(),
              level: currentHeading.level,
              index: currentHeading.index,
              parentIndex: currentHeading.parentIndex,
              chapter: chapter,
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
        data?.content.forEach((item, index) => {
          if (item.paragraph) {
            const { namedStyleType } = item.paragraph.paragraphStyle;
            if (
              namedStyleType === "HEADING_1" ||
              (labConfig.slideHeading === "h2" ||
              labConfig.slideHeading === "h3"
                ? namedStyleType === "HEADING_2"
                : false) ||
              (labConfig.slideHeading === "h3"
                ? namedStyleType === "HEADING_3"
                : false)
            ) {
              if (
                labConfig.slideHeading === "h1" &&
                namedStyleType === "HEADING_1"
              ) {
                pushCurrentHeading();
                chapter++;
              } else if (
                labConfig.slideHeading === "h2" &&
                (namedStyleType === "HEADING_1" ||
                  namedStyleType === "HEADING_2")
              ) {
                pushCurrentHeading();
              } else if (
                labConfig.slideHeading === "h3" &&
                (namedStyleType === "HEADING_1" ||
                  namedStyleType === "HEADING_2" ||
                  namedStyleType === "HEADING_3")
              ) {
                pushCurrentHeading();
              }
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
              };
              if (namedStyleType === "HEADING_1") {
                lastH1Index = index;
              } else if (namedStyleType === "HEADING_2") {
                lastH2Index = index;
              }
            } else if (item.paragraph.paragraphStyle.className === "H1") {
              chapter = 0;
              pushCurrentHeading();
              currentHeading = {
                name: item.paragraph.elements[0]?.textRun?.content || "",
                content: [],
                style: item.paragraph.paragraphStyle,
                level: 1,
                index: index,
                parentIndex: -1,
              };
            } else {
              currentHeading.content.push(item);
            }
            if (namedStyleType === "TITLE") {
              //TITLE là một page
              pushCurrentHeading();
              if (labConfig.slideHeading === "h1") {
                setSlideTitle(
                  item.paragraph.elements[0]?.textRun?.content || ""
                );
              }
              currentHeading = {
                name: item.paragraph.elements[0]?.textRun?.content || "",
                content: [],
                style: item.paragraph.paragraphStyle,
                level: 0, // Đặt level là 0 cho 'TITLE'
                index: index,
                parentIndex: null,
              };
            }
          } else if (item) {
            currentHeading.content.push(item);
          }
        });
        pushCurrentHeading();
        setStepsData({ steps, contents, listChapter });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (isRoomInPath) {
      if (!user) setLoading(!user);
      else fetchData();
    } else {
      fetchData();
    }
  }, [id, user, selectedItem, chap, prevChap]);

  useEffect(() => {
    return () => {
      // Dọn dẹp nếu cần thiết
    };
  }, []);

  function afterPreview() {
    // var element = document.getElementById('setting');
    // var parent = element.parentNode;
    //
    // const button = document.getElementById('settings-button');
    // button.onclick = function () {
    //     if (settingsChangeCounter) setSettingsChangeCounter(false); else setSettingsChangeCounter(true);
    // };
    // let elementCopy = element.cloneNode(true);
    // parent.removeChild(element);
    // document.body.appendChild(elementCopy);
  }

  function encodeHTML(str) {
    var div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
  }

  function createToc(config) {
    const className = config.className;
    const content = config.content;
    const tocElement = config.tocElement;
    const titleElements = config.titleElements;
    const filterContent = config.filterContent;
    let tocElementDiv = content.querySelector(tocElement);
    if (!tocElementDiv) return;
    let tocUl = document.createElement("ul");
    tocUl.id = "list-" + className + "-generated";
    tocElementDiv.appendChild(tocUl);
    // add class to all title elements
    let tocElementNbr = 0;
    for (let i = 0; i < titleElements.length; i++) {
      let titleHierarchy = i + 1;
      let titleElement = content.querySelectorAll(titleElements[i]);
      if (filterContent) {
        titleElement = Array.from(titleElement).filter((el) =>
          el.textContent.trim().startsWith(filterContent)
        );
      }
      titleElement.forEach(function (element) {
        // add classes to the element
        element.classList.add(className + "-" + "title-element");
        element.setAttribute("data-title-level", titleHierarchy);
        // add id if doesn't exist
        tocElementNbr++;
        let idElement = element.id;
        if (idElement == "") {
          element.id = className + "-" + "title-element-" + tocElementNbr;
        }
        let newIdElement = element.id;
      });
    }
    // create toc list
    let tocElements = content.querySelectorAll(
      "." + className + "-" + "title-element"
    );
    for (let i = 0; i < tocElements.length; i++) {
      let tocElement = tocElements[i];
      let tocNewLi = document.createElement("li");
      // Add class for the hierarcy of toc
      tocNewLi.classList.add(className + "-" + "element");
      tocNewLi.classList.add(
        className + "-element-level-" + tocElement.dataset.titleLevel
      );
      // Keep class of title elements
      let classTocElement = tocElement.classList;
      for (let n = 0; n < classTocElement.length; n++) {
        if (classTocElement[n] != className + "-" + "title-element") {
          tocNewLi.classList.add(classTocElement[n]);
        }
      }
      // Create the element
      tocNewLi.innerHTML =
        '<a href="#' +
        tocElement.id +
        '">' +
        encodeHTML(tocElement.innerText) +
        "</a>";

      tocUl.appendChild(tocNewLi);
    }
  }

  useEffect(() => {
    if (!loading && display === "paged") {
      let paged = new Previewer();
      let DOMContent = document.querySelector("main-content");

      registerHandlers(
        class TOCHandler extends Handler {
          beforeParsed(content) {
            createToc({
              className: "toc",
              content: content,
              tocElement: "#my-toc",
              titleElements: ["h1", "h2", "h3", "toc"],
              filterContent: null,
            });
          }
        }
      );

      registerHandlers(
        class TOCHandler extends Handler {
          beforeParsed(content) {
            createToc({
              className: "toi",
              content: content,
              tocElement: "#my-toi",
              titleElements: ["p.Caption"],
              filterContent: "Hình",
            });
          }
        }
      );

      registerHandlers(
        class RepeatTableHeadersHandler extends Handler {
          constructor(chunker, polisher, caller) {
            super(chunker, polisher, caller);
            this.splitTablesRefs = [];
          }

          afterPageLayout(pageElement, page, breakToken, chunker) {
            this.chunker = chunker;
            this.splitTablesRefs = [];

            if (breakToken) {
              const node = breakToken.node;
              const tables = this.findAllAncestors(node, "table");
              if (node.tagName === "TABLE") tables.push(node);

              if (tables.length > 0) {
                this.splitTablesRefs = tables.map((t) => t.dataset.ref);

                let thead =
                  node.tagName === "THEAD"
                    ? node
                    : this.findFirstAncestor(node, "thead");
                if (thead) {
                  let lastTheadNode = thead.hasChildNodes()
                    ? thead.lastChild
                    : thead;
                  breakToken.node = this.nodeAfter(
                    lastTheadNode,
                    chunker.source
                  );
                }

                this.hideEmptyTables(pageElement, node);
              }
            }
          }

          hideEmptyTables(pageElement, breakTokenNode) {
            this.splitTablesRefs.forEach((ref) => {
              let table = pageElement.querySelector("[data-ref='" + ref + "']");
              if (table) {
                let sourceBody = table.querySelector("tbody > tr");
                if (
                  !sourceBody ||
                  this.refEquals(sourceBody.firstElementChild, breakTokenNode)
                ) {
                  table.style.visibility = "hidden";
                  table.style.position = "absolute";
                  let lineSpacer = table.nextSibling;
                  if (lineSpacer) {
                    lineSpacer.style.visibility = "hidden";
                    lineSpacer.style.position = "absolute";
                  }
                }
              }
            });
          }

          refEquals(a, b) {
            return (
              a &&
              a.dataset &&
              b &&
              b.dataset &&
              a.dataset.ref === b.dataset.ref
            );
          }

          findFirstAncestor(element, selector) {
            while (element.parentNode && element.parentNode.nodeType === 1) {
              if (element.parentNode.matches(selector))
                return element.parentNode;
              element = element.parentNode;
            }
            return null;
          }

          findAllAncestors(element, selector) {
            const ancestors = [];
            while (element.parentNode && element.parentNode.nodeType === 1) {
              if (element.parentNode.matches(selector))
                ancestors.unshift(element.parentNode);
              element = element.parentNode;
            }
            return ancestors;
          }

          layout(rendered, layout) {
            this.splitTablesRefs.forEach((ref) => {
              const renderedTable = rendered.querySelector(
                "[data-ref='" + ref + "']"
              );
              if (renderedTable) {
                if (!renderedTable.getAttribute("repeated-headers")) {
                  const sourceTable = this.chunker.source.querySelector(
                    "[data-ref='" + ref + "']"
                  );
                  this.repeatColgroup(sourceTable, renderedTable);
                  this.repeatTHead(sourceTable, renderedTable);
                  renderedTable.setAttribute("repeated-headers", true);
                }
              }
            });
          }

          repeatColgroup(sourceTable, renderedTable) {
            let colgroup = sourceTable.querySelectorAll("colgroup");
            let firstChild = renderedTable.firstChild;
            colgroup.forEach((colgroup) => {
              let clonedColgroup = colgroup.cloneNode(true);
              renderedTable.insertBefore(clonedColgroup, firstChild);
            });
          }

          repeatTHead(sourceTable, renderedTable) {
            let thead = sourceTable.querySelector("thead");
            if (thead) {
              let clonedThead = thead.cloneNode(true);
              renderedTable.insertBefore(clonedThead, renderedTable.firstChild);
            }
          }

          nodeAfter(node, limiter) {
            if (limiter && node === limiter) return;
            let significantNode = this.nextSignificantNode(node);
            if (significantNode) return significantNode;
            if (node.parentNode) {
              while ((node = node.parentNode)) {
                if (limiter && node === limiter) return;
                significantNode = this.nextSignificantNode(node);
                if (significantNode) return significantNode;
              }
            }
          }

          nextSignificantNode(sib) {
            while ((sib = sib.nextSibling)) {
              if (!this.isIgnorable(sib)) return sib;
            }
            return null;
          }

          isIgnorable(node) {
            return (
              node.nodeType === 8 ||
              (node.nodeType === 3 && this.isAllWhitespace(node))
            );
          }

          isAllWhitespace(node) {
            return !/[^\t\n\r ]/.test(node.textContent);
          }
        }
      );

      registerHandlers(
        class TOCHandler extends Handler {
          beforeParsed(content) {
            createToc({
              className: "tot",
              content: content,
              tocElement: "#my-tot",
              titleElements: ["p.Caption"],
              filterContent: "Bảng",
            });
          }
        }
      );

      paged
        .preview(DOMContent, ["../css/print.css"], document.body)
        .then((flow) => {
          afterPreview();
        });
    }
  }, [loading, settingsChangeCounter]);

  useEffect(() => {
    const hashIndex = parseInt(window.location.hash.substring(1), 10);
    if (
      !isNaN(hashIndex) &&
      hashIndex > 0 &&
      hashIndex <= stepsData.steps.length
    ) {
      setCurrentStep(hashIndex);
    }
  }, [stepsData]);

  const headerComponent = (
    <Header
      stepsData={stepsData}
      currentStep={currentStep}
      handleStepClick={handleStepClick}
      showStepList={showStepList}
      onOptionClick={handleOptionClick}
      slideTitle={slideTitle}
      room={room}
      chap={chap}
      onUserLogin={handleUserLogin}
      loading={loading}
      onTitleClick={handleTitleClick}
    />
  );

  let mainContent;
  if ((display !== null && display === "print") || display === "paged") {
    mainContent = stepsData.contents.map((content, index) => (
      <StepContent
        key={index}
        room={room}
        steps={stepsData.steps}
        step={stepsData.steps[index]}
        content={content}
        currentStep={index}
      />
    ));
  } else {
    mainContent = (
      <StepContent
        room={room}
        steps={stepsData.steps}
        step={stepsData.steps[currentStep]}
        content={stepsData.contents[currentStep]}
        currentStep={currentStep}
      />
    );
  }

  return (
    <div
      className={`preview-container ${template} ${
        display.includes("paged") ? "print" : ""
      }`}
    >
      {headerComponent}
      {/*<div className="break-after-page d-flex flex-column">*/}
      {/*    <div className="d-flex justify-content-center">*/}
      {/*        <div className="d-flex ms-4">*/}
      {/*            <img src="/images/NEU.png" alt="logo" width="64" height="64"/>*/}
      {/*        </div>*/}
      {/*        <div className="flex-fill d-flex flex-column justify-content-center">*/}
      {/*            <div className="text-center fw-bold fs-6">TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN</div>*/}
      {/*            <div className="text-center fs-6">KHOA CÔNG NGHỆ THÔNG TIN</div>*/}
      {/*        </div>*/}
      {/*        <div id="cover-org-blank" className="me-4">*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex justify-content-center mt-2">*/}
      {/*        <div className="flex-fill d-flex flex-column justify-content-center">*/}
      {/*            <div className="text-center fw-bold fs-6">TS. PHẠM XUÂN LÂM (Chủ biên)</div>*/}
      {/*            <div className="text-center fs-6">ThS. Cao Thị Thu Hương - ThS. Chu Văn Huy*/}
      {/*            </div>*/}
      {/*            <div className="text-center fs-6">ThS. Phạm Đức Trung - ThS. Vũ Hưng Hải*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex justify-content-center flex-column" id="cover-book-info">*/}
      {/*        <div id="cover-book-name1">GIÁO TRÌNH</div>*/}
      {/*        <div id="cover-book-name2">THIẾT KẾ WEB</div>*/}
      {/*    </div>*/}

      {/*    <div className="d-flex justify-content-center flex-column" id="cover-pub-info">*/}
      {/*        <div>NHÀ XUẤT ĐẠI HỌC KINH TẾ QUỐC DÂN</div>*/}
      {/*        <div>HÀ NỘI - 2024</div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div className="break-after-page d-flex flex-column">*/}
      {/*    <div className="d-flex justify-content-center flex-column text-center" id="lastpage-book-info">*/}
      {/*        <div className="fw-bold fs-5">GIÁO TRÌNH</div>*/}
      {/*        <div className="fw-bold fs-2">THIẾT KẾ WEB</div>*/}
      {/*        <div className="hr">&nbsp;</div>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex justify-content-center flex-column" id="lastpage-pub-info">*/}
      {/*        <div className="fw-bold">NHÀ XUẤT BẢN ĐẠI HỌC KINH TẾ QUỐC DÂN</div>*/}
      {/*        <div>Địa chỉ: 207 đường Giải Phóng, Hai Bà Trưng, Hà Nội</div>*/}
      {/*        <div>Website: https://nxb.neu.edu.vn &nbsp;&nbsp;&nbsp;&nbsp;Email: nxb@neu.edu.vn</div>*/}
      {/*        <div>Điện thoại: (024) 36280280/ Máy lẻ 5722</div>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex justify-content-center flex-column ms-4 me-4" id="lastpage-people-info">*/}
      {/*        <div className="d-flex justify-content-between">*/}
      {/*            <div className="fw-bold fst-italic">Chịu trách nhiệm xuất bản:</div>*/}
      {/*            <div className="d-flex flex-column align-items-end">*/}
      {/*                <div>TS. ĐỖ VĂN SANG*/}
      {/*                </div>*/}
      {/*                <div className="fst-italic">*/}
      {/*                    Phó Giám đốc phụ trách Nhà xuất bản*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <div className="d-flex justify-content-between">*/}
      {/*            <div className="fw-bold fst-italic">Chịu trách nhiệm nội dung:</div>*/}
      {/*            <div className="d-flex flex-column align-items-end">*/}
      {/*                <div>GS.TS. LÊ QUỐC HỘI*/}
      {/*                </div>*/}
      {/*                <div className="fst-italic">*/}
      {/*                    Tổng biên tập Nhà xuất bản*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <div className="d-flex justify-content-between">*/}
      {/*            <div className="fw-bold fst-italic">Biên tập:</div>*/}
      {/*            <div>*/}
      {/*                BÙI THỊ HẠNH*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <div className="d-flex justify-content-between">*/}
      {/*            <div className="fw-bold fst-italic">Thiết kế bìa:</div>*/}
      {/*            <div>*/}
      {/*                VƯƠNG NGUYỄN*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <div className="d-flex justify-content-between">*/}
      {/*            <div className="fw-bold fst-italic">Chế bản:</div>*/}
      {/*            <div>*/}
      {/*                PHẠM XUÂN LÂM*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <div className="d-flex justify-content-between">*/}
      {/*            <div className="fw-bold fst-italic">Sửa bản in và đọc sách mẫu:</div>*/}
      {/*            <div>*/}
      {/*                BÙI THỊ HẠNH*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}

      {/*    <div className="d-flex justify-content-center flex-column" id="lastpage-footer-info">*/}
      {/*        <div className="hr">&nbsp;</div>*/}
      {/*        <div className="flex-fill d-flex flex-column justify-content-center">*/}
      {/*            <div className="">In xxx cuốn, khổ 16x24 cm tại Công ty TNHH và Thương Mại Hải Nam.</div>*/}
      {/*            <div className="">Địa chỉ: số 18, Ngách 68/53/9 Quan Hoa, quận Cầu Giấy, Hà Nội.</div>*/}
      {/*            <div className="">Số xác nhận đăng ký xuất bản: xxx-xxxx/xxxxx/x-xxx/ĐHKTQD.</div>*/}
      {/*            <div className="">Mã số ISBN: xxx-xxx-xxx-xxx-x.</div>*/}
      {/*            <div className="">Quyết định xuất bản số: xxx/QĐ-NXBĐHKTQD, Cấp ngày xx/xx/xxxx</div>*/}
      {/*            <div className="">In xong và nộp lưu chiểu quý III năm 2024.</div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div data-chapter="Mục lục" className="table-of-content break-after-right">*/}
      {/*    <div className="index-title step-title mucluc">MỤC LỤC</div>*/}
      {/*    <div id="my-toc"></div>*/}
      {/*</div>*/}
      {/*<div data-chapter="Danh mục hình" className="table-of-content break-after-right">*/}
      {/*    <toc className="index-title step-title">DANH MỤC HÌNH</toc>*/}
      {/*    <span id="my-toi"></span>*/}
      {/*</div>*/}
      {/*<div data-chapter="Danh mục bảng" className="table-of-content break-after-right">*/}
      {/*    <toc className="index-title step-title">DANH MỤC BẢNG</toc>*/}
      {/*    <span id="my-tot"></span>*/}
      {/*</div>*/}

      {loading ? (
        <div className="main-center">
          <div className="spinner-border text-primary " role="status"></div>
        </div>
      ) : (
        room && (
          <div
            className={`d-flex justify-content-center ${
              stepsData.steps.length === 1 ? "content-full" : "content"
            }`}
          >
            <div className="main-content" id="chapter">
              {mainContent}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Preview;
