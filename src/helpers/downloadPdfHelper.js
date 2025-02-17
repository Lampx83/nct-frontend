// downloadPdfHelper.js
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import {
  normalizeSubjectCode,
  processSubjectGroups,
  sortAndGroupSubjects,
} from "@/helpers/curriculumTable";
import "jspdf-autotable";

export const downloadPdf = async (
  curriculum,
  major,
  selectedYear,
  t,
  locale,
  pathname
) => {
  try {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addFont("/fonts/NotoSans-Regular.ttf", "NotoSans", "normal");
    pdf.addFont("/fonts/NotoSans-Bold.ttf", "NotoSans", "bold");
    pdf.setFont("NotoSans", "normal");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const headerHeight = 30;
    const headerCenter = headerHeight / 2;
    const logoHeight = 25;
    const logoY = (headerHeight - logoHeight) / 2;

    pdf.setFillColor(8, 92, 167);
    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    try {
      const logoUrl = "/LogoNEU.png";
      const logoResponse = await fetch(logoUrl);
      const logoBlob = await logoResponse.blob();
      const logoBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(logoBlob);
      });

      pdf.addImage(logoBase64, "PNG", 5, logoY, logoHeight, logoHeight);
    } catch (logoError) {
      console.error("Error adding logo:", logoError);
    }

    pdf.setFont("NotoSans", "bold");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    const schoolName = encodeURIComponent("ĐẠI HỌC KINH TẾ QUỐC DÂN");
    pdf.text(decodeURIComponent(schoolName), pageWidth / 2, headerCenter - 2, {
      align: "center",
    });

    pdf.setFontSize(12);
    pdf.text("NATIONAL ECONOMICS UNIVERSITY", pageWidth / 2, headerCenter + 6, {
      align: "center",
    });

    pdf.setTextColor(0, 0, 0);
    let currentY = headerHeight + 15;

    const leftColWidth = pageWidth * 0.7;
    const rightColWidth = pageWidth * 0.3;
    const rightColX = leftColWidth;

    pdf.setFontSize(16);
    pdf.setFont("NotoSans", "bold");
    const titleText = encodeURIComponent(
      `${major.title} - ${major.admissionCode}`
    );
    const splitTitle = pdf.splitTextToSize(
      decodeURIComponent(titleText),
      leftColWidth - 15
    );
    pdf.text(splitTitle, 10, currentY);
    currentY += splitTitle.length * 10;

    pdf.setFontSize(12);
    pdf.setFont("NotoSans", "normal");
    const version = major.versions.find((v) => v.year === selectedYear);
    pdf.text(`Phiên bản: ${version?.year || ""}`, 10, currentY);
    currentY += 5;

    if (major.faculty) {
      pdf.text(`Khoa: ${major.faculty.name}`, 10, currentY);
      currentY += 8;
    }

    const url = `https://courses.neu.edu.vn/major/${major.slug}`;
    pdf.setFontSize(12);
    pdf.text(url, 10, currentY);

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        width: 100,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      const qrSize = rightColWidth - 35;
      const qrY = headerHeight + 10;
      pdf.addImage(qrCodeDataUrl, "PNG", rightColX + 20, qrY, qrSize, qrSize);
    } catch (qrError) {
      console.error("Error generating QR code:", qrError);
    }

    currentY = Math.max(currentY, headerHeight + 35) + 10;

    const groups = sortAndGroupSubjects(curriculum);
    const data = processSubjectGroups(groups, locale);
    const year = curriculum.attributes?.year?.split(" - ")[0] || "K66";
    const localeSubjects = curriculum.localeSubjects || "vi";

    pdf.autoTable({
      head: [
        [
          {
            content: t("Number"),
            rowSpan: 2,
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: t("ContentAndTeaching"),
            colSpan: 2,
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: t("CourseCode"),
            rowSpan: 2,
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: t("Credit"),
            rowSpan: 2,
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: t("SemesterAllocation"),
            colSpan: 8,
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: t("Semester"),
            rowSpan: 2,
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
        ],
        [
          {
            content: t("Number"),
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: t("Content"),
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "1",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "2",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "3",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "4",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "5",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "6",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "7",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
          {
            content: "8",
            styles: {
              lineWidth: 0.3,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              valign: "middle",
              halign: "center",
              fillColor: [9, 92, 167],
            },
          },
        ],
      ],
      body: [
        ...data.map((item, index) => {
          const styles = {
            valign: "middle",
            lineWidth: 0.3,
          };
          if (item.type === "group") {
            styles.fillColor = "#a6bcd4";
            styles.fontStyle = "bold";
          } else if (item.type === "required" || item.type === "optional") {
            styles.fillColor = "#cfd9e6";
            styles.fontStyle = "bold";
          }
          const isSpecial =
            item.type === "group" ||
            item.type === "required" ||
            item.type === "optional";

          return [
            {
              content: isSpecial ? "" : item.index,
              styles: { ...styles, halign: "center" },
            },
            {
              content: isSpecial ? "" : item.indexInGroup,
              styles: { ...styles, halign: "center" },
            },
            {
              content: item.name || "",
              styles: { ...styles },
            },
            {
              content: item.subjectCode || "",
              styles: { ...styles, halign: "center" },
            },
            {
              content: item.credits || "",
              styles: { ...styles, halign: "center" },
            },
            ...Array.from({ length: 8 }, (_, i) => {
              return {
                content: item[`semester${i + 1}`] || "",
                styles: { ...styles, halign: "center" },
              };
            }),
            {
              content: item.semester || "",
              styles: { ...styles, halign: "center" },
            },
          ];
        }),
      ],
      startY: currentY,
      styles: {
        font: "NotoSans",
        fontStyle: "normal",
        fontSize: 9,
        textColor: [0, 0, 0],
      },
      willDrawCell: (hookData) => willDrawCell(hookData, localeSubjects, year),
    });

    const removeDiacritics = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    };

    const majorName = removeDiacritics(major.title);
    const fileName = `${majorName}_${version?.year}`
      .replace(/[^a-zA-Z0-9_ ]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_");
    return { fileName: `${fileName}`, pdf };
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
const willDrawCell = (hookData, localeSubjects, year) => {
  const { doc } = hookData;

  if (hookData.section === "body" && hookData.column.index === 3) {
    const { cell } = hookData;
    const textPos = cell.getTextPos();
    doc.setLineWidth(0.3);
    doc.rect(cell.x, cell.y, cell.width, cell.height, "F");
    doc.rect(cell.x, cell.y, cell.width, cell.height, "S");

    const url = cell?.text[0]
      ? `https://courses.neu.edu.vn/syllabus/${year}/${localeSubjects}/${normalizeSubjectCode(
          cell.text[0]
        )}`
      : "";

    if (cell.text[0]) {
      autoTableLinkText(
        cell.text[0],
        url,
        textPos.x,
        textPos.y,
        {
          halign: cell.styles.halign,
          valign: cell.styles.valign,
          maxWidth: Math.ceil(
            cell.width - cell.padding("left") - cell.padding("right")
          ),
        },
        doc
      );
    }
    return false;
  }
  return true;
};
const autoTableLinkText = (text, url, x, y, styles, doc) => {
  styles = styles || {};
  const PHYSICAL_LINE_HEIGHT = 1.15;

  const k = doc.internal.scaleFactor;
  const fontSize = doc.internal.getFontSize() / k;
  const lineHeightFactor = doc.getLineHeightFactor
    ? doc.getLineHeightFactor()
    : PHYSICAL_LINE_HEIGHT;
  const lineHeight = fontSize * lineHeightFactor;

  const splitRegex = /\r\n|\r|\n/g;
  let splitText = "";
  let lineCount = 1;
  if (
    styles.valign === "middle" ||
    styles.valign === "bottom" ||
    styles.halign === "center" ||
    styles.halign === "right"
  ) {
    splitText = typeof text === "string" ? text.split(splitRegex) : text;
    lineCount = splitText?.length || 1;
  }

  // Align the top
  y += fontSize * (2 - PHYSICAL_LINE_HEIGHT);

  if (styles.valign === "middle") y -= (lineCount / 2) * lineHeight;
  else if (styles.valign === "bottom") y -= lineCount * lineHeight;

  if (styles.halign === "center" || styles.halign === "right") {
    let alignSize = fontSize;
    if (styles.halign === "center") alignSize *= 0.5;

    if (splitText && lineCount >= 1) {
      for (let iLine = 0; iLine < splitText.length; iLine += 1) {
        const xPos = x - doc.getStringUnitWidth(splitText[iLine]) * alignSize;
        const textWidth = doc.getTextWidth(splitText[iLine]);
        const textColor = doc.getTextColor();
        const drawColor = doc.getDrawColor();

        if (url) {
          doc.setTextColor(0, 84, 162);
          doc.setDrawColor(0, 0, 238);
        }

        doc.textWithLink(splitText[iLine], xPos, y, {
          url,
        });

        doc.setTextColor(textColor);
        doc.setDrawColor(drawColor);
        y += lineHeight;
      }
      return doc;
    }
    x -= doc.getStringUnitWidth(text) * alignSize;
  }

  if (styles.halign === "justify") {
    doc.textWithLink(text, x, y, {
      maxWidth: styles.maxWidth || 100,
      align: "justify",
      url,
    });
  } else {
    doc.textWithLink(text, x, y, {
      url,
    });
  }

  return doc;
};
