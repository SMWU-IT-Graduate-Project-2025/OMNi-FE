import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import "./MainMonitoring.css";
import Header from "../components/Header.jsx";
import ClipModal from "../components/ClipModal";
import useWebcamController from "../components/WebcamController";
import useQueryStore from "../store/queryStore";
import { StoreContext } from "../StoreContext";
import supabase from "../lib/supabase";

const MainMonitoring = ({ onPageChange, camType }) => {
  const { storeName } = useContext(StoreContext);
  const [clips, setClips] = useState([
    // { id: 1, title: "[실내흡연]", thumbUrl: supabase.storage.from('existing-samples').getPublicUrl('smoking-1-image.png').data.publicUrl, videoUrl: supabase.storage.from('existing-samples').getPublicUrl('smoking-1.mp4').data.publicUrl },
    { id: 1, title: "[실내흡연]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS1pbWFnZS5wbmciLCJpYXQiOjE3NjA0NTg0NTcsImV4cCI6MTc5MTk5NDQ1N30.yQlcDkE6ytbIhpkg_enq1xgxhzNYuQcEshGVgbLPVl8", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS5tcDQiLCJpYXQiOjE3NjA0NTg0NDYsImV4cCI6MTc5MTk5NDQ0Nn0.I1T2wKIywZzfyGSTgmvk0YWuh3lyIg7yJ_3Fd3URcJY" },
    { id: 2, title: "[쓰러짐]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS1pbWFnZS5wbmciLCJpYXQiOjE3NjA0NTgxNDEsImV4cCI6MTc5MTk5NDE0MX0.0cSv36zac_ifgMgucAuT5imanHRK76rOEwmkc0HRxlY", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS5tcDQiLCJpYXQiOjE3NjA0NTgxNTksImV4cCI6MTc5MTk5NDE1OX0.8fteu_gHg0Osktb2set_aBH6KnRbfrb_zJjyH-or51k" },
    { id: 3, title: "[파손손상]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLWltYWdlLnBuZyIsImlhdCI6MTc2MDQ1ODQ3NiwiZXhwIjoxNzkxOTk0NDc2fQ.iU35E9tkk0KdHL0Se9GF1XDve60X2zorhqYh3nkQgsU", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLm1wNCIsImlhdCI6MTc2MDQ1ODQ5OCwiZXhwIjoxNzkxOTk0NDk4fQ.HF98JZzo-5RVSdaYSoR7GxVrqOHG2z289S4n8qT5fW4" },
    { id: 4, title: "[절도도난]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzYwNDU4NTM1LCJleHAiOjE3OTE5OTQ1MzV9.VacgqLfCpu47ppS6bjjcscIG2Ne-7vunU6tA2T3axtU", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEubXA0IiwiaWF0IjoxNzYwNDU4NTI3LCJleHAiOjE3OTE5OTQ1Mjd9.TEe9pX539HEkUX0bb6lupNFHn3ZWtCVELrjhMmy7HOw" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClip, setActiveClip] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([
    { text: "[22:03:15] 이상행동 감지 - 흡연", unread: false },
    { text: "[11:47:00] 이상행동 감지 - 쓰러짐", unread: false },
    { text: "[10:55:42] 이상행동 감지 - 파손손상", unread: false },
    { text: "[02:38:21] 이상행동 감지 - 도난", unread: false },
  ]);
  
  const [hasNewAlert, setHasNewAlert] = useState(false);

  // 웹캠 컨트롤러 훅 사용
  const {
    webcamStream,
    webcamError,
    isWebcamActive,
    webcamStatus,
    videoRef,
    canvasRef,
    isCapturing,
    lastInferenceResult,
    inferenceError,
    connectWebcam,
    pauseWebcam,
    resumeWebcam,
    disconnectWebcam,
    toggleWebcamStatus,
    startCapturing,
    stopCapturing,
    toggleCapturing,
    captureAndSendImage
  } = useWebcamController(camType);

  // Zustand store에서 선택된 쿼리 정보 가져오기
  const { selectedQuery } = useQueryStore();

  // ================= VLM inference result display =================
  const [latestScore, setLatestScore] = useState(null); // number | null
  const [eventDetected, setEventDetected] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState('');
  const [threshold, setThreshold] = useState(null);
  const [eventActive, setEventActive] = useState(false);
  const [allEvents, setAllEvents] = useState([]); // 모든 이벤트 감지 결과
  const [demoEvents, setDemoEvents] = useState([]); // demo_event 결과
  const [storeAbnormalEvents, setStoreAbnormalEvents] = useState([]); // store_abnormal 결과
  
  // API 응답 결과를 상태에 반영
  useEffect(() => {
    if (lastInferenceResult) {
      console.log("🔥 lastInferenceResult:", lastInferenceResult);
      console.log("➡️ eventDetected:", lastInferenceResult.eventDetected);
      console.log("➡️ eventActive:", lastInferenceResult.eventActive);
      console.log("➡️ demoEvents:", lastInferenceResult.demoEvents);
      console.log("➡️ storeAbnormalEvents:", lastInferenceResult.storeAbnormalEvents);
      console.log("➡️ allEvents:", lastInferenceResult.allEvents);
      
      // similarity_score 파싱
      const score = lastInferenceResult.similarityScore ?? lastInferenceResult.similarity_score;
      console.log("➡️ Parsed similarity score:", score);
      if (typeof score === 'number' && isFinite(score)) {
        setLatestScore(score);
      }
      
      const wasEventDetected = lastInferenceResult.eventDetected || false;
      const isActive = lastInferenceResult.eventActive ?? false;
      setEventActive(isActive);
      setEventDetected(wasEventDetected);
      setDetectionMessage(lastInferenceResult.message || '');
      setThreshold(lastInferenceResult.threshold || null);
      
      // 모든 이벤트 정보 업데이트
      setAllEvents(lastInferenceResult.allEvents || []);
      setDemoEvents(lastInferenceResult.demoEvents || []);
      setStoreAbnormalEvents(lastInferenceResult.storeAbnormalEvents || []);
      
      // 새 이벤트가 감지되면 Recent Alerts에 추가 (demo_event, store_abnormal 지원)
      const detectedDemoEvents = lastInferenceResult.demoEvents?.filter(event => event.detected) || [];
      const detectedAbnormalEvents = lastInferenceResult.storeAbnormalEvents?.filter(event => event.detected) || [];
      const primaryEventDetected = lastInferenceResult.eventDetected && lastInferenceResult.queryLabel;
      
      if (detectedDemoEvents.length > 0 || detectedAbnormalEvents.length > 0 || primaryEventDetected) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ko-KR', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        });
        
        // 감지된 이벤트들을 카테고리별로 구성
        const demoLabels = detectedDemoEvents.map(event => event.event_label).join(', ');
        const abnormalLabels = detectedAbnormalEvents.map(event => event.event_label).join(', ');
        
        let alertText = `[${timeString}] 이벤트 감지`;
        let alertType = 'normal'; // normal, demo, abnormal, both
        
        if (detectedDemoEvents.length > 0 && detectedAbnormalEvents.length > 0) {
          alertText += ` - 시연용: ${demoLabels} - 이상: ${abnormalLabels}`;
          alertType = 'both';
        } else if (detectedDemoEvents.length > 0) {
          alertText += ` - 시연용: ${demoLabels}`;
          alertType = 'demo';
        } else if (detectedAbnormalEvents.length > 0) {
          alertText += ` - 이상: ${abnormalLabels}`;
          // alertType = 'abnormal';
        }
        
        const newAlert = { 
          text: alertText,
          unread: true,
          type: alertType
        };
        
        setRecentAlerts(prev => {
          // 중복 방지: 같은 시간대에 같은 이벤트가 감지되면 추가하지 않음
          const allDetectedLabels = [...detectedDemoEvents, ...detectedAbnormalEvents].map(event => event.event_label).join(', ');
          const isDuplicate = prev.some(alert => 
            alert.text.includes(allDetectedLabels) &&
            Math.abs(
              new Date(alert.text.match(/\[(\d{2}:\d{2}:\d{2})\]/)?.[1] || '00:00:00').getTime()- now.getTime()) < 5000
          );
          
          if (!isDuplicate) {
            return [newAlert, ...prev.slice(0, 9)]; // 최대 10개 유지
          }
          return prev;
        });
      }
    }
}, [lastInferenceResult]);

  // thumbUrl 유효성 검사 함수
  const isThumbUrlValid = (thumbUrl) => {
    if (!thumbUrl) return false;
    
    try {
      // URL에서 exp 파라미터 추출하여 만료 시간 확인
      const url = new URL(thumbUrl);
      const exp = url.searchParams.get('token');
      if (!exp) return false;
      
      // JWT 토큰에서 만료 시간 추출 (간단한 파싱)
      const tokenParts = exp.split('.');
      if (tokenParts.length !== 3) return false;
      
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const handleClipClick = (clip) => {
    setActiveClip(clip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveClip(null);
  };

  return (
    <div className="main-root">
      <Header onPageChange={onPageChange} />
      <div className="main-content-area">
        <div className="main-content-left">
          {/* <div className="main-store-name">
            <b>OMNi : for <span className="main-store-name-input">{"SMIT"} </span></b>
          </div> */}
          <section className="main-section live-monitoring-section">
            <div className="main-section-header">
              <span className="main-section-icon">📷</span>
              <span className="main-section-title">Live Monitoring</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span 
                  className="main-status-badge"
                  onClick={toggleWebcamStatus}
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: webcamStatus === 'connected' ? '#d4edda' : 
                                    webcamStatus === 'disconnected' ? '#fff3cd' : 
                                    webcamStatus === 'paused' ? '#e2e3e5' :
                                    webcamStatus === 'error' ? '#f8d7da' : '#f8d7da',
                    color: webcamStatus === 'connected' ? '#155724' : 
                           webcamStatus === 'disconnected' ? '#856404' : 
                           webcamStatus === 'paused' ? '#6c757d' :
                           webcamStatus === 'error' ? '#721c24' : '#721c24'
                  }}
                >
                  {webcamStatus === 'connected' ? 'Connected' : 
                   webcamStatus === 'disconnected' ? 'Connecting...' : 
                   webcamStatus === 'paused' ? 'Paused' :
                   webcamStatus === 'error' ? 'Error' : 'Stopped'}
                </span>
                {webcamStatus === 'connected' && (
                  <button
                    onClick={toggleCapturing}
                    style={{
                      padding: '4px 8px',
                      fontSize: '12px',
                      backgroundColor: isCapturing ? '#dc3545' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {isCapturing ? 'Stop Capture' : 'Start Capture'}
                  </button>
                )}
              </div>
            </div>
            {selectedQuery.value && (
              <div className="main-query-info" style={{
                padding: "8px 16px",
                margin: "8px 0",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e9ecef",
                fontSize: "14px",
                color: "#495057"
              }}>
                <strong>감지 대상:</strong> {selectedQuery.label}
              </div>
            )}
            {!selectedQuery.value && (
              <div className="main-query-info" style={{
                padding: "8px 16px",
                margin: "8px 0",
                backgroundColor: "#fff3cd",
                borderRadius: "6px",
                border: "1px solid #ffeaa7",
                fontSize: "14px",
                color: "#856404"
              }}>
                <strong>⚠️ 경고:</strong> 감지할 이벤트가 선택되지 않았습니다. 초기 페이지에서 이벤트를 선택해주세요.
              </div>
            )}
            {inferenceError && (
              <div className="main-query-info" style={{
                padding: "8px 16px",
                margin: "8px 0",
                backgroundColor: "#f8d7da",
                borderRadius: "6px",
                border: "1px solid #f5c6cb",
                fontSize: "14px",
                color: "#721c24"
              }}>
                <strong>🚨 백엔드 연결 오류:</strong> {inferenceError}
              </div>
            )}
            <div className="main-live-video" style={{ position: "relative" }}>
              {/* 숨겨진 캔버스 요소 - 이미지 캡처용 */}
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              />
              {isWebcamActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    borderRadius: "12px"
                  }}
                  onPlay={() => console.log('비디오 재생 시작됨')}
                  onPause={() => console.log('비디오 일시정지됨')}
                  onWaiting={() => console.log('비디오 로딩 대기 중')}
                  onCanPlay={() => console.log('비디오 재생 준비 완료')}
                />
              ) : webcamError ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  <span style={{ color: "#c64949", marginBottom: "10px" }}>⚠️ {webcamError}</span>
                  <button 
                    onClick={connectWebcam}
                    style={{
                      padding: "8px 16px",
                      background: "#7180CB",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    다시 연결
                  </button>
                </div>
              ) : (
                <span className="main-live-video-text">📷 실시간 영상 스트림</span>
              )}

              {/* 우상단 오버레이: 추론 결과 및 오류 표시 */}
              {isWebcamActive && (selectedQuery?.value || inferenceError) && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: inferenceError 
                      ? "rgba(220,53,69,0.8)" 
                      : eventActive
                        ? "rgba(40,167,69,0.8)" 
                        : "rgba(0,0,0,0.55)",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    alignItems: "flex-start",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(2px)",
                    minWidth: "200px"
                  }}
                >
                  {inferenceError ? (
                    <>
                      <span style={{ opacity: 0.9, fontWeight: "bold" }}>❌ Error</span>
                      <span style={{ fontSize: 12, opacity: 0.8 }}>{inferenceError}</span>
                    </>
                  ) : (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ opacity: 0.9, fontWeight: "bold" }}>
                          {eventActive 
                            ? (eventDetected ? "🎯 이벤트 감지됨" : "🟢 이벤트 유지 중"): "👁️ 모니터링 중"}
                        </span>
                        {isCapturing && (
                          <span style={{ fontSize: 12, opacity: 0.8 }}>capturing…</span>
                        )}
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ opacity: 0.9 }}>Similarity:</span>
                        <strong style={{ fontVariantNumeric: "tabular-nums" }}>
                          {latestScore == null ? "–" : latestScore.toFixed(3)}
                        </strong>
                        {threshold && (
                          <span style={{ fontSize: 12, opacity: 0.7 }}>
                            (threshold: {threshold.toFixed(3)})
                          </span>
                        )}
                      </div>
                      
                      {detectionMessage && (
                        <div style={{ fontSize: 12, opacity: 0.8, fontStyle: "italic" }}>
                          {detectionMessage}
                        </div>
                      )}
                      
                      {/* 멀티클래스 이벤트 감지 결과 표시 */}
                      {(demoEvents.length > 0 || storeAbnormalEvents.length > 0) && (
                        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
                          {/* Demo Events 표시 */}
                          {demoEvents.filter(event => event.detected).length > 0 && (
                            <div style={{ marginBottom: 4 }}>
                              <div style={{ fontWeight: "bold", marginBottom: 2, color: "#4CAF50" }}>데모 이벤트:</div>
                              {demoEvents
                                .filter(event => event.detected)
                                .map((event, index) => (
                                  <div key={`demo-${index}`} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                                    <span>{event.event_label}:</span>
                                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                                      {event.similarity_score?.toFixed(3) || '0.000'}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                          
                          {/* Store Abnormal Events 표시 */}
                          {storeAbnormalEvents.filter(event => event.detected).length > 0 && (
                            <div>
                              <div style={{ fontWeight: "bold", marginBottom: 2, color: "#FF9800" }}>매장 이상행동:</div>
                              {storeAbnormalEvents
                                .filter(event => event.detected)
                                .map((event, index) => (
                                  <div key={`abnormal-${index}`} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                                    <span>{event.event_label}:</span>
                                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                                      {event.similarity_score?.toFixed(3) || '0.000'}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
        <aside className="main-content-right">
          <div className="main-section-header" style={{ position: "relative" }}>
            <span className="main-section-icon">🔔</span>
            <span className="main-section-title">Recent Alerts</span>
            {recentAlerts.some(alert => alert.unread) && (
              <span
                onClick={() => {
                  // 빨간 점 클릭 → 모든 알림 읽음 처리
                  setRecentAlerts(prev => prev.map(a => ({ ...a, unread: false })));
                }}
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginLeft: "8px",
                  cursor: "pointer"
                }}
              ></span>
            )}
          </div>
          <div className="main-alert-list">
            {recentAlerts.map((alert, index) => {
              // 알림 타입에 따른 스타일 결정
              let backgroundColor = "transparent";
              let borderLeft = "none";
              let fontWeight = "normal";
              
              if (alert.unread) {
                // 읽지 않은 알림의 경우 타입에 따라 색상 구분
                if (alert.type === 'demo') {
                  backgroundColor = "rgba(156, 39, 176, 0.3)"; // 보라색
                  borderLeft = "3px solid #9C27B0";
                } else if (alert.type === 'abnormal') {
                  backgroundColor = "rgba(244, 67, 54, 0.3)"; // 빨간색
                  borderLeft = "3px solid #F44336";
                } else if (alert.type === 'both') {
                  backgroundColor = "rgba(255, 152, 0, 0.3)"; // 주황색 (혼합)
                  borderLeft = "3px solid #FF9800";
                } else {
                  backgroundColor = "rgba(255, 132, 132, 0.6)"; // 기본 빨간색
                  borderLeft = "3px solid red";
                }
                fontWeight = "bold";
              } else if (index === 0 && eventActive) {
                backgroundColor = "rgba(40,167,69,0.1)";
                borderLeft = "3px solid #28a745";
                fontWeight = "bold";
              }
              
              return (
                <div 
                  key={index} 
                  className="main-alert-item"
                  style={{
                    backgroundColor: backgroundColor,
                    borderLeft: borderLeft,
                    fontWeight: fontWeight,
                    display: "block",
                    width: "fit-content",
                    padding: alert.unread ? "2px 4px" : "0",
                    borderRadius: alert.unread ? "3px" : "0"
                  }}
                >
                  {alert.text}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
      <div className="main-clip-section">
        <section className="main-section event-clip-section">
          <div className="main-section-header">
            <span className="main-section-icon">⏲️</span>
            <span className="main-section-title">Last Clip Archive</span>
          </div>
          <div className="main-clip-list">
            {clips.map((clip) => {
              const isThumbValid = isThumbUrlValid(clip.thumbUrl);
              return (
                <div
                  key={clip.id}
                  className="main-clip-item"
                  style={{
                    backgroundImage: isThumbValid ? `url(${clip.thumbUrl})` : undefined,
                    backgroundSize: isThumbValid ? "cover" : undefined,
                    backgroundPosition: isThumbValid ? "center" : undefined,
                    cursor: "pointer",
                  }}
                title={clip.title}  
                  onClick={() => handleClipClick(clip)}
                >
                  {!isThumbValid && <span>📁 Clip {clip.id}</span>}
                  {isThumbValid && (
                    <div className="main-clip-caption">
                      <span>{clip.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
      
      <ClipModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        clipUrl={activeClip?.videoUrl}
        title={activeClip?.title}
      />
    </div>
  );
};

export default MainMonitoring; 