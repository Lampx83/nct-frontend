import React from "react";
import StepHeader from "./StepHeader";
import StepFooter from "./StepFooter";
import StepBody from "./StepBody";
import { removeNumbering } from "../../utils/codelab";

const StepContent = ({
  steps,
  step,
  content,
  room,
  user,
  currentStep,
  display,
  chap,
}) => {
  let labConfig = room.config;
  // let contentClass =
  //   ((labConfig.slideHeading === "h2" || labConfig.slideHeading === "h3") &&
  //     step.level <= 1) ||
  //   (labConfig.slideHeading === "h1" && step.level === 0)
  //     ? "slide-title"
  //     : "";
  if (!step) return;
  let contentClass = "";
  if (step.level === 0) {
    contentClass = "slide-title mt-4";
  }

  const childSteps = steps.filter((s) => s.parentIndex === step.index);
  const showContent = display === "doc" || content.content.length > 0;

  if (step.style) {
    if (step.style.className === "H1")
      contentClass = contentClass + " break-after-right";
    else contentClass = contentClass + " break-after-right";
  }

  return (
    <div className={`step-content ${contentClass}`}

      style={{
        height: "calc(100vh - 66px)",
        overflowY: "auto",
        overflowX: "hidden",
        marginTop: 66,
      }}

    >
      <StepHeader step={step} display={display} user={user} room={room} />
      {(display === "slide" || (display && showContent)) && (
        <div className="step-body"

        >
          {showContent ? (
            <StepBody
              content={content.content}
              display={display}
              user={user}
              room={room}
              chap
            />
          ) : (
            <div className="child-step">
              <ol>
                {childSteps.map((childStep) => (
                  <li key={childStep.name}>
                    <p>{removeNumbering(childStep.name)}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
      {display && display === "slide" && (
        <StepFooter currentStep={currentStep} user={user} room={room} />
      )}{" "}
      {/* Hiển thị StepFooter nếu không phải trang in */}
    </div>
  );
};

export default StepContent;
