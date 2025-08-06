
import React, { useState } from "react";
import "./Initial.css";

const Initial = ({ onConnect }) => {
  const [storeName, setStoreName] = useState("");
  const [eventQuery, setEventQuery] = useState("");

  return (
    <div className="initial-bg">
      <div className="initial-overlay">
        <div className="initial-form-container">
          <h1 className="initial-title">Welcome to OMNi</h1>
          <input
            type="text"
            className="initial-input"
            placeholder="가게명을 입력하세요"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
          />
          <input
            type="text"
            className="initial-input"
            placeholder="감지할 이벤트 쿼리를 입력하세요"
            value={eventQuery}
            onChange={e => setEventQuery(e.target.value)}
          />
          <button
            className="initial-connect-btn"
            onClick={() => onConnect && onConnect(storeName, eventQuery)}
          >
            Connect a Camera
          </button>
        </div>
      </div>
    </div>
  );
};

export default Initial;