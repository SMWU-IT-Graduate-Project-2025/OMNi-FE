
import React, { useState, useEffect } from "react";
import "./Initial.css";

const Initial = ({ onConnect }) => {
  const [storeName, setStoreName] = useState("");
  const [eventQuery, setEventQuery] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const fullText = "Welcome to OMNi !";
  // 타이핑 애니메이션 효과
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150); // 각 글자마다 150ms 딜레이

      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  // 선택 가능한 이벤트 쿼리 옵션 정의
  const eventQueryOptions = [
    { value: "Someone is making a V with two fingers", label: "감지할 이벤트를 선택하세요 (e.g. 브이 하기)" },
    { value: "A person is waving his five fingers", label: "카메라에 인사하기" },
    { value: "A person is giving a thumbs-up sign", label: "카메라에 따봉하기" },
  ];

  return (
    <div className="initial-bg">
      <div className="initial-overlay">
        <div className="initial-form-container">
          <h1 className="initial-title">
            {displayText}
            <span className="typing-cursor">|</span>
          </h1>
          <input
            type="text"
            className="initial-inputname"
            placeholder="가게명을 입력하세요"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
          />
          <select
            className="initial-input"
            value={eventQuery}
            onChange={e => setEventQuery(e.target.value)}
          >
            {eventQueryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="initial-btn-group">
            <button
              className="initial-connect-btn"
              onClick={() => onConnect && onConnect(storeName, eventQuery, 'webcam')}
            >
              connect webcam
            </button>
            <button
              className="initial-connect-btn"
              onClick={() => onConnect && onConnect(storeName, eventQuery, 'mobile')}
            >
              mobile cam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initial;