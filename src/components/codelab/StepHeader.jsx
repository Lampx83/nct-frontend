// StepHeader.js
import React from "react";
import { useLocation } from "react-router-dom";
import { removeNumbering } from "../../utils/codelab";

const StepHeader = ({ step, labConfig, display }) => {
  // const print = new URLSearchParams(useLocation().search).get("print");
  let HeadingTag = print ? "h" + step.level : "h1";
  let headingClass = "step-title";

  if (step.style && step.style.className === "H1") {
    HeadingTag = "toc";
    headingClass = "index-title step-title";
  }

  return (
    <div>
      <div className="colored-line">
        <div className="part part1"></div>
        <div className="part part2"></div>
        <div className="part part3"></div>
      </div>
      <HeadingTag
        id={`h${step.chapter}`}
        data-chapter={
          step.chapter >= 1
            ? "Chương " + step.chapter + ". " + step.name
            : step.name
        }
        className={headingClass}
        style={{ textAlign: step?.style?.alignment }}
      >
        {display === "doc"
          ? (step.style !== "Start" && step.name)
          : removeNumbering(step.name)}
      </HeadingTag>
    </div>
  );
};
export default StepHeader;
