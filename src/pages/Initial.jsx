import React, { useState, useContext, useEffect } from "react";
import useQueryStore from "../store/queryStore";
import { StoreContext } from "../StoreContext";
import "./Initial.css";

const Initial = ({ onConnect }) => {
  const [storeName, setStoreName] = useState("");
  const [eventQuery, setEventQuery] = useState("");
  const [customEventQuery, setCustomEventQuery] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { setStoreName: setGlobalStoreName, setSelectedEvent } = useContext(StoreContext);

  // Zustand store에서 setSelectedQuery 함수 가져오기
  const { setSelectedQuery } = useQueryStore();

  const fullText = "Welcome to OMNi ";
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
    { value: "Someone is making a V-shape with two fingers", label: "감지할 이벤트를 선택하세요 (e.g. 브이 하기)" },
    { value: "A person is waving his five fingers", label: "카메라에 인사하기" },
    { value: "A person is giving a thumbs-up sign", label: "카메라에 따봉하기" },
    { value: "custom", label: "기타 (직접 입력)" },
  ];

  // 기본 선택값 설정 (첫 로드 시)
  useEffect(() => {
    if (!eventQuery && eventQueryOptions.length > 0) {
      setEventQuery(eventQueryOptions[0].value);
    }
  }, [eventQuery]);

  const persistSelectedQuery = () => {
    const fallback = eventQueryOptions[0];
    const selectedOption = eventQueryOptions.find(option => option.value === eventQuery) || fallback;

    const extractExample = (label) => {
      if (!label) return '';
      const match = label.match(/\((?:e\.g\.\s*)?(.+?)\)/);
      return match ? match[1].trim() : label;
    };

    // 기타 옵션 선택 시 사용자 입력 텍스트 사용
    if (eventQuery === "custom" && customEventQuery.trim()) {
      const customEvent = {
        value: customEventQuery.trim(),
        label: customEventQuery.trim()
      };
      setSelectedQuery(customEvent);
      setSelectedEvent(customEvent);
      return customEventQuery.trim();
    }

    if (selectedOption) {
      const eventData = {
        value: selectedOption.value,
        label: extractExample(selectedOption.label)
      };
      setSelectedQuery(eventData);
      setSelectedEvent(eventData);
    }
    return selectedOption?.value || "";
  };

  return (
    <div className="initial-bg">
      <div className="initial-overlay">
        <div className="initial-form-container">
          <h1 className="initial-title">
            {displayText.split('').map((char, index) => (
              <span 
                key={index} 
                className={index === displayText.length - 1 && currentIndex >= fullText.length ? 'last-char' : ''}
              >
                {char}
              </span>
            ))}
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
          {eventQuery === "custom" && (
            <input
              type="text"
              className="initial-input"
              placeholder="감지할 이벤트를 직접 입력하세요"
              value={customEventQuery}
              onChange={e => setCustomEventQuery(e.target.value)}
            />
          )}
          <div className="initial-btn-group">
            <button
              className="initial-connect-btn"
              onClick={() => {
                const ensuredValue = persistSelectedQuery();
                setGlobalStoreName(storeName);
                onConnect && onConnect(storeName, ensuredValue, 'webcam');
              }}
            >
              connect webcam
            </button>
            {/* <button
              className="initial-connect-btn"
              onClick={() => {
                const ensuredValue = persistSelectedQuery();
                setGlobalStoreName(storeName);
                onConnect && onConnect(storeName, ensuredValue, 'mobile');
              }}
            >
              mobile cam
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initial;