import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MainMonitoring.css";
import Header from "../components/Header.jsx";
import ClipModal from "../components/ClipModal";
import useWebcamController from "../components/WebcamController";
import useQueryStore from "../store/queryStore";

const MainMonitoring = ({ storeName, onPageChange, camType }) => {
  const [clips, setClips] = useState([
    { id: 1, title: "[실내흡연]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2NDksImV4cCI6MTc1ODk0MjY0OX0.9s2bF5Z8dHR5mybya9LA42Mw2QAAoAGxaPJUgGXOSWg", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS5tcDQiLCJpYXQiOjE3NTYzNTE4NjUsImV4cCI6MTc1ODk0Mzg2NX0.EvCFTB24qAEFgr-grDLR9I0LTV2RkQuYQbQNfwX448w" },
    { id: 2, title: "[쓰러짐]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2MzcsImV4cCI6MTc1ODk0MjYzN30.9uehBKfO8aHOWveVlxk-BXYvTfgoK5zk06_39pdzfPo", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS5tcDQiLCJpYXQiOjE3NTYzNTE4NTAsImV4cCI6MTc1ODk0Mzg1MH0.U8BzbqndzV0ZVp_NRZvN5Rt8-e8SAMmaqJLV7U7BhgU" },
    { id: 3, title: "[파손손상]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLWltYWdlLnBuZyIsImlhdCI6MTc1NjM1MDYwOCwiZXhwIjoxNzU4OTQyNjA4fQ._xhs8Nb5vcsBvQQQD4VGbmGX4z87oN2A7lUoCNdcmuQ", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLm1wNCIsImlhdCI6MTc1NjM1MTgzNCwiZXhwIjoxNzU4OTQzODM0fQ.brd2-X3qWU0OzFSeblH95h5vwEnti-f7oNSIVBv3G1Y" },
    { id: 4, title: "[절도도난]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUwMjY5LCJleHAiOjE3NTg5NDIyNjl9.gPHHFnp9pK4Q_Ypvm6o4QvYX2n2ozYYKIUwIcSAhHgw", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEubXA0IiwiaWF0IjoxNzU2MzUxODEzLCJleHAiOjE3NTg5NDM4MTN9.lq8evAmNAN_YKjzPFKk8lSeIA5DS3kHUuqTMqVvcxXo" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClip, setActiveClip] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([
    "[22:03:15] 이상행동 감지 - 흡연",
    "[11:47:00] 이상행동 감지 - 쓰러짐", 
    "[10:55:42] 이상행동 감지 - 파손손상",
    "[02:38:21] 이상행동 감지 - 도난"
  ]);
  
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
  
  // API 응답 결과를 상태에 반영
  useEffect(() => {
    if (lastInferenceResult) {
      // similarity_score 파싱
      const score = lastInferenceResult.similarityScore;
      if (typeof score === 'number' && isFinite(score)) {
        setLatestScore(score);
      }
      
      // 이벤트 감지 상태 업데이트
      const wasEventDetected = lastInferenceResult.eventDetected || false;
      setEventDetected(wasEventDetected);
      setDetectionMessage(lastInferenceResult.message || '');
      setThreshold(lastInferenceResult.threshold || null);
      
      // 이벤트가 감지되면 Recent Alerts에 추가
      if (wasEventDetected && lastInferenceResult.queryLabel) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ko-KR', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        });
        
        const newAlert = `[${timeString}] 이벤트 감지 - ${lastInferenceResult.queryLabel}`;
        
        setRecentAlerts(prev => {
          // 중복 방지: 같은 시간대에 같은 이벤트가 감지되면 추가하지 않음
          const isDuplicate = prev.some(alert => 
            alert.includes(lastInferenceResult.queryLabel) && 
            Math.abs(new Date(alert.match(/\[(\d{2}:\d{2}:\d{2})\]/)?.[1] || '00:00:00').getTime() - now.getTime()) < 5000
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
      <Header onPageChange={onPageChange} storeName={storeName} />
      <div className="main-content-area">
        <div className="main-content-left">
          {/* <div className="main-store-name">
            <b>OMNi : for <span className="main-store-name-input">{storeName || "SMIT"} </span></b>
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
                      : eventDetected 
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
                          {eventDetected ? "🎯 이벤트 감지됨" : "👁️ 모니터링 중"}
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
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
        <aside className="main-content-right">
          <div className="main-section-header">
            <span className="main-section-icon">🔔</span>
            <span className="main-section-title">Recent Alerts</span>
          </div>
          <div className="main-alert-list">
            {recentAlerts.map((alert, index) => (
              <div 
                key={index} 
                className="main-alert-item"
                style={{
                  backgroundColor: index === 0 && eventDetected ? 'rgba(40,167,69,0.1)' : 'transparent',
                  borderLeft: index === 0 && eventDetected ? '3px solid #28a745' : 'none',
                  fontWeight: index === 0 && eventDetected ? 'bold' : 'normal'
                }}
              >
                {alert}
              </div>
            ))}
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