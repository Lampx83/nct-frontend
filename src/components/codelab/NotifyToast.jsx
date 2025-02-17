import React from "react";

function NotifyToast() {
  return (
    <div
      id="toast-container"
      className="position-fixed bottom-0 end-0 p-5 d-none"
    >
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img
            id="toast-icon"
            src="../static/images/bell.svg"
            className="toast-icon rounded me-2"
          />
          <strong className="me-auto" id="toast-title">
            Bootstrap
          </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body" id="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>
  );
}

export default NotifyToast;
