// utils.js
import { getDatabase, onDisconnect, ref, set } from "firebase/database";
import firebase from "firebase/compat/app";
import app from "../firebase";

export function readElements(elements) {
  let result = "";
  if (elements)
    elements.forEach((element) => {
      if (element.paragraph) {
        element.paragraph.elements.forEach((paragraphElement) => {
          result += readParagraphElement(paragraphElement);
        });
      } else if (element.table) {
        element.table.tableRows.forEach((row) => {
          row.tableCells.forEach((cell) => {
            result += readElements(cell.content);
          });
        });
      }
    });
  return result;
}

export function readParagraphElement(element) {
  const run = element.textRun;
  if (!run || !run.content) {
    return "";
  }
  return run.content;
}

export function removeNumbering(text) {
  return text.replace(/^\d+(\.\d+)*\.\s*/, "");
}



export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

export function renderDoc(dataResponse) {
  let steps = [];
  let contents = [];
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
      } else if (namedStyleType === "TITLE") {
        pushCurrentHeading();
        currentHeading = {
          name: item.paragraph.elements[0]?.textRun?.content || "",
          content: [],
          style: item.paragraph.paragraphStyle,
          level: 0,
          index: index,
          parentIndex: -1,
          chapter: 0,
        };
      } else if (item.paragraph.paragraphStyle.className === "H1") {
        pushCurrentHeading();
        currentHeading = {
          name: item.paragraph.elements[0]?.textRun?.content || "",
          content: [],
          style: item.paragraph.paragraphStyle,
          level: 1,
          index: index,
          parentIndex: -1,
          chapter: 0,
        };
      } else {
        currentHeading.content.push(item);
      }
    } else if (item) {
      currentHeading.content.push(item);
    }
  });
  pushCurrentHeading();
  let listChapter = dataResponse.listChapter;
  return { steps, contents, listChapter }
}
