import React, { useState, useEffect } from "react";
import StepButton from "./StepButton";
import app from "../../firebase.js";

import { getDatabase, onValue, ref, push } from "firebase/database";
import config from "../../config.js";
const StepList = ({
  steps,
  currentStep,
  handleStepClick,
  isVisible,
  room,
  display,
  user,
}) => {
  let heading1Count = 0;
  let heading2Count = 0;
  let heading3Count = 0;
  const [onlineList, setOnlineList] = useState([]);
  const db = getDatabase(app);
  // const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chap = searchParams.get("chap");

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (
        (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "VolumeUp") &&
        currentStep > 0
      ) {
        handleStepClick(currentStep - 1);
        const response = await fetch(`${config.API_BASE_URL}/logs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            logType: "step",
            roomID: room.roomID,
            user: user.displayName,
            step: currentStep - 1,
          }),
        });

        if (!response.ok) {
          console.error("Failed to log:", response.statusText);
        } else {
        }
        e.preventDefault();
      } else if (
        (e.key === "ArrowRight" ||
          e.key === "PageDown" ||
          e.key === "VolumeDown" ||
          e.key === "Space") &&
        currentStep < steps.length - 1
      ) {
        handleStepClick(currentStep + 1);
        const response = await fetch(`${config.API_BASE_URL}/logs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            logType: "step",
            roomID: room.roomID,
            user: user.displayName,
            step: currentStep + 1,
          }),
        });

        if (!response.ok) {
          console.error("Failed to log:", response.statusText);
        } else {
        }
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, handleStepClick, steps]);

  useEffect(() => {
    if (room && room.roomID) {
      let link = chap ? `/chap${chap}` : "";
      onValue(
        ref(
          db,
          `/labs/${room.docID.replace(/\./g, "")}/${room.roomID}${link}/users`
        ),
        (snapshot) => {
          let data = snapshot.val();
          let count = [];
          let totalUser = 0;
          for (let uid in data) {
            let step = data[uid].step;
            if (count[step] === undefined) count[step] = { count: 0, user: "" };
            count[step].count++;
            count[step].user = count[step].user + data[uid].name + "<br>";
            totalUser++;
            setOnlineList(count);
          }
        }
      );
    }
  }, [room]);

  return (
    <ul
      className={`nav-stick me-auto list-group ${isVisible ? "visible" : "hidden"
        } `}
    >
      {steps.map((step, index) => {
        if (step.level === 0) {
          return null;
        }
        if (step.level === 1) {
          heading2Count = 0;
          heading3Count = 0;
          heading1Count++;
        } else if (step.level === 2) {
          heading3Count = 0;
          heading2Count++;
        } else if (step.level === 3) {
          heading3Count++;
        }
        // }
        return (
          <StepButton
            chap={chap}
            key={index}
            step={step}
            index={index}
            currentStep={currentStep}
            handleStepClick={handleStepClick}
            heading1Count={heading1Count}
            heading2Count={heading2Count}
            heading3Count={heading3Count}
            onlineList={onlineList}
            room={room}
            display={display}
            user={user}
          >
            {step.name}
          </StepButton>
        );
      })}
    </ul>
  );
};

export default StepList;
