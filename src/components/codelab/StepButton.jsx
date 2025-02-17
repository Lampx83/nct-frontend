import React, { useState, useRef, useEffect } from "react";
import SpeechBubble from "./SpeechBubble";
import { removeNumbering } from "../../utils/codelab";
import { getDatabase, onValue, ref, push } from "firebase/database";
import app from "../../firebase.js";
import { Timestamp } from "firebase/firestore";
import config from "../../config";
const StepButton = ({
  step,
  index,
  currentStep,
  handleStepClick,
  heading1Count,
  heading2Count,
  heading3Count,
  onlineList,
  room,
  display,
  user,
}) => {
  const [isSpeechBubbleVisible, setSpeechBubbleVisible] = useState(false);
  const userOnlineRef = useRef(null);
  const [userOnline, setUserOnline] = useState(null);

  useEffect(() => {
    let userOnline = onlineList[index];
    setUserOnline(userOnline);
  }, [onlineList]);

  const handleMouseEnter = () => {
    const userOnlineRect = userOnlineRef.current.getBoundingClientRect();
    setSpeechBubbleVisible(true);
    setSpeechBubblePosition({
      x: userOnlineRect.left + userOnlineRect.width / 2,
      y: userOnlineRect.top + userOnlineRect.height,
    });
  };

  const handleMouseLeave = () => {
    setSpeechBubbleVisible(false);
  };

  const handleStepButtonClick = async () => {
    // Navigate first
    handleStepClick(index);
    
    // Then log the action
    try {
      const response = await fetch(`${config.API_BASE_URL}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logType: "step",
          roomID: room.roomID,
          user: user.displayName,
          step: index,
        }),
      });

      if (!response.ok) {
        console.error("Failed to log step change:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging step change:", error);
    }
  };

  const [speechBubblePosition, setSpeechBubblePosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <li
      className={`
        ${index} ${currentStep} 
        step-button nav-item list-group-item 
        ${index === currentStep}
        ${index > currentStep ? "inactive" : ""}
        `}
      onClick={handleStepButtonClick}
    >
      {step.level > 0 && (
        <div className={`step-number step-number${step.level}`}>
          {step.level === 1
            ? heading1Count
            : step.level === 2
            ? `${heading1Count}.${heading2Count}`
            : step.level === 3
            ? `${heading1Count}.${heading2Count}.${heading3Count}`
            : 1}
        </div>
      )}

      {/* {step.level === 0 ? (
        <div className="step-name fw-bold text-primary">{step.name}</div>) : (<div className="step-name">
          {display === "slide" ? removeNumbering(step.name) : step.name}
        </div>)} */}

      <div className="step-name">
        {display === "slide" ? removeNumbering(step.name) : step.name}
      </div>

      <div
        ref={userOnlineRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`online-step badge badge-secondary bg-secondary ${
          isSpeechBubbleVisible ? "active" : ""
        }`}
      >
        {userOnline?.count}
      </div>
      {isSpeechBubbleVisible && (
        <SpeechBubble
          userOnline={userOnline}
          position={{ x: speechBubblePosition.x, y: speechBubblePosition.y }}
        />
      )}
    </li>
  );
};

export default StepButton;
