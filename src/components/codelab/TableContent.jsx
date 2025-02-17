import React from "react";
import CodeDisplay from "./CodeDisplay";
import StepBody from "./StepBody";
import Exercise from "./Exercise";
import Quiz from "./Quiz";
import { readElements } from "../../utils/codelab";
import CodeSubmit from "./CodeSubmit";
import UploadFileComponent from "./UploadFile";

const TableCell = ({ content, header, display, tableCellStyle }) => {
  // Helper function to convert RGB to CSS color

  // Extract the border styles from tableCellStyle
  const getBorderStyle = (border) => {
    if (!border || !border.color || !border.width) return "none";
    const width = `${border.width.magnitude || 0}px`;
    const style = border.dashStyle === "DOT" ? "dotted" : "solid"; // Assuming "DOT" corresponds to "dotted"
    return `${width} ${style}`;
  };

  // Inline styles based on tableCellStyle
  const cellStyle = {
    borderBottom: getBorderStyle(tableCellStyle?.borderBottom),
    borderTop: getBorderStyle(tableCellStyle?.borderTop),
    borderLeft: getBorderStyle(tableCellStyle?.borderLeft),
    borderRight: getBorderStyle(tableCellStyle?.borderRight),
    textAlign: tableCellStyle?.contentAlignment?.toLowerCase() || "left", // Default alignment is left
  };

  return (
    <td
      colSpan={
        tableCellStyle?.columnSpan > 1 ? tableCellStyle.columnSpan : undefined
      }
      rowSpan={tableCellStyle?.rowSpan > 1 ? tableCellStyle.rowSpan : undefined}
      // style={cellStyle} // Apply the calculated inline styles
    >
      <StepBody content={content} display={display} />
    </td>
  );
};

const TableRow = ({
  numCol,
  cells,
  header,
  display,
  rowSpanTracker,
  rowIndex,
}) => {
  let currentColSpan = 0; // Tracks the current column span

  return (
    <tr className={header ? "header-row" : "regular-row"}>
      {cells.map((cell, index) => {
        const colSpan =
          cell.tableCellStyle?.columnSpan > 1
            ? cell.tableCellStyle.columnSpan
            : 1;
        const rowSpan =
          cell.tableCellStyle?.rowSpan > 1 ? cell.tableCellStyle.rowSpan : 1;

        // Check if the cell should be displayed based on rowSpan tracking
        if (rowSpanTracker[rowIndex] && rowSpanTracker[rowIndex][index]) {
          // Skip this cell because it is spanned by a previous row
          return null;
        }

        // Update rowSpan tracking for future rows
        if (rowSpan > 1) {
          for (let i = 1; i < rowSpan; i++) {
            if (!rowSpanTracker[rowIndex + i]) {
              rowSpanTracker[rowIndex + i] = {};
            }
            rowSpanTracker[rowIndex + i][index] = true;
          }
        }

        // Check if adding this cell would exceed the total column count
        if (currentColSpan + colSpan <= numCol) {
          currentColSpan += colSpan; // Update the current column span
          return (
            <TableCell
              key={index}
              content={cell.content}
              tableCellStyle={cell.tableCellStyle}
              header={header}
              display={display}
            />
          );
        } else {
          return null; // Skip creating the cell if it exceeds the column limit
        }
      })}
    </tr>
  );
};

const TableContent = ({ table, display, room, user, chap }) => {
  const rowSpanTracker = [];
  const numCol = table?.columns;
  const hasTwoColumns = table?.tableRows?.length > 0 && numCol === 2;

  if (hasTwoColumns) {
    if (table.tableRows.length === 2) {
      let topRight = readElements(table?.tableRows[0]?.tableCells[1]?.content);
      topRight = topRight?.trim()?.toLowerCase() || "";
      if (topRight === "oj") {
        return <CodeSubmit table={table} user={user} room={room} />;
      }
      if (topRight === "file") {
        return <UploadFileComponent table={table} user={user} room={room}></UploadFileComponent>
      }

      let content = readElements(table?.tableRows[1]?.tableCells[1]?.content);
      const SecondEmpty =
        !table?.tableRows[1]?.tableCells[1]?.content[0]?.paragraph ||
        content.trim() === "";
      if (SecondEmpty) return <Exercise table={table} />;
    } else if (table?.tableRows?.length > 2) {
      if (table?.tableRows[2]?.tableCells[1]) {
        let content = readElements(table?.tableRows[2]?.tableCells[1]?.content);
        const ThirdEmpty =
          !table?.tableRows[2]?.tableCells[1]?.content[0]?.paragraph ||
          content?.trim() === "";
        if (ThirdEmpty) {
          return <Quiz table={table} room={room} user={user} chap={chap} />;
        }
      }
    }
  }

  if (
    table.tableRows.length === 1 &&
    table.tableRows[0].tableCells.length === 1
  ) {
    const textStyle =
      table.tableRows[0].tableCells[0].content[0]?.paragraph?.elements[0].textRun
        .textStyle;
    if (
      textStyle &&
      textStyle.weightedFontFamily &&
      (textStyle.weightedFontFamily.fontFamily === "Courier New" ||
        textStyle.weightedFontFamily.fontFamily === "Consolas" ||
        textStyle.weightedFontFamily.fontFamily === "Menlo")
    ) {
      return (
        <CodeDisplay
          user={user}
          room={room}
          table={table}
          chap={chap}
          font={textStyle.weightedFontFamily.fontFamily}
        />
      );
    }

    if (
      textStyle &&
      textStyle.weightedFontFamily &&
      textStyle.weightedFontFamily.fontFamily === "Calibri"
    ) {
      return;
    }
  }
  return (
    <table
      className={`table mx-auto ${
        table.tableRows.length && !hasTwoColumns
          ? "table-bordered"
          : "table-borderless"
      }  align-middle ${
        table.tableRows.length > 4 ? "table-hover table-striped" : ""
      } ${display === "slide" || (display === "book") & ""}`}
      style={table.tableStyle}
    >
      <tbody>
        {table.tableRows.map((row, index) => (
          <TableRow
            user={user}
            room={room}
            numCol={numCol}
            key={index}
            cells={row.tableCells}
            header={index === 0 && table.tableRows.length > 3 && !hasTwoColumns} // Use the first row as header if needed
            display={display}
            rowSpanTracker={rowSpanTracker} // Pass rowSpan tracking to rows
            rowIndex={index} // Pass the current row index for tracking
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableContent;
