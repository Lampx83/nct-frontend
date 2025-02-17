// SettingsButton.js
import React, { useEffect, useState, useRef } from "react";
import PrintSettingModal from "../modals/PrintSettingModal";
import { Button, Dropdown } from "react-bootstrap";
const SettingsButton = () => {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const button = buttonRef.current;
      const handleClick = () => {
        alert("ds");
      };
      button.addEventListener("click", handleClick);
      // Dọn dẹp
      return () => {
        button.removeEventListener("click", handleClick);
      };
    }
  }, []);
  const handleSettingsClick = () => {
    alert("ds");
  };
  return (
    <>
      <button
        id="settings-button"
        ref={buttonRef}
        className="settings-button"
        onClick={handleSettingsClick}
      >
        <span className="material-icons">settings</span>
      </button>
    </>
  );
};

export default SettingsButton;
