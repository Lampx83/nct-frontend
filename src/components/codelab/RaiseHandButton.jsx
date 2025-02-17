import React from 'react';
import '../../css/raise-hand-cl.css';
import { Badge } from "react-bootstrap";

const RaiseHandButton = ({ isRaised, raisedHandsCount }) => {
  return (
    <div className="position-relative d-inline-block">
      <span className={`hand-icon ${isRaised ? 'raised' : 'lowered'}`}>
        ✋
      </span>
      {raisedHandsCount > 0 && (
        <Badge
          bg="secondary"
          className="translate-middle top-0 start-100"
          style={{ 
            position: "absolute",
            fontSize: "0.65rem",
            padding: "0.25em 0.4em"
          }}
        >
          {raisedHandsCount}
        </Badge>
      )}
    </div>
  );
};

export default RaiseHandButton;