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
  
  // 웹캠 컨트롤러 훅 사용
  const {
    webcamStream,
    webcamError,
    isWebcamActive,
    webcamStatus,
    videoRef,
    connectWebcam,
    pauseWebcam,
    resumeWebcam,
    disconnectWebcam,
    toggleWebcamStatus
  } = useWebcamController(camType);

  // Zustand store에서 선택된 쿼리 정보 가져오기
  const { selectedQuery } = useQueryStore();

  // ================= VLM similarity overlay states =================
  const [latestScore, setLatestScore] = useState(null); // number | null
  const [isInferBusy, setIsInferBusy] = useState(false);
  const canvasRef = useRef(null);
  const frameBufferRef = useRef([]); // base64 JPEG strings
  const WINDOW_SIZE = 6; // match inference_example.py
  const SAMPLE_FPS = 2; // frames per second
  const inferEndpoint = useMemo(() => {
    // 구성 가능하도록 환경변수 우선, 없으면 기본값
    return (
      import.meta.env.VLM_ENDPOINT || 
      "/api/vlm/similarity"
    );
  }, []);

  // 캔버스 보조 함수: 현재 프레임을 캡처해 JPEG base64로 반환
  const captureCurrentFrame = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return null;
    const width = Math.max(1, Math.floor(videoEl.videoWidth || 640));
    const height = Math.max(1, Math.floor(videoEl.videoHeight || 360));

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(videoEl, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.7); // base64
  };

  // 윈도우 크기만큼 모이면 추론 API 호출
  const maybeInferWindow = async () => {
    if (isInferBusy) return;
    const frames = frameBufferRef.current;
    if (frames.length < WINDOW_SIZE) return;
    try {
      setIsInferBusy(true);
      const body = {
        frames, // [base64jpeg]
        query: selectedQuery?.value || null,
        windowSize: WINDOW_SIZE,
        fps: SAMPLE_FPS
      };
      const res = await fetch(inferEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`infer http ${res.status}`);
      const data = await res.json();
      // 기대 형태: { similarity: number } 또는 { score: number }
      const score =
        typeof data?.similarity === "number"
          ? data.similarity
          : typeof data?.score === "number"
          ? data.score
          : null;
      if (score != null && isFinite(score)) {
        setLatestScore(score);
      }
    } catch (e) {
      console.error("VLM infer 실패", e);
    } finally {
      setIsInferBusy(false);
    }
  };

  // 주기적으로 프레임 샘플링 및 슬라이딩 윈도우 관리
  useEffect(() => {
    if (!isWebcamActive || !videoRef.current) return;
    if (!selectedQuery?.value) return; // 쿼리 미선택 시 샘플링 중단

    let cancelled = false;
    const intervalMs = Math.max(250, Math.floor(1000 / SAMPLE_FPS));
    const intervalId = setInterval(() => {
      if (cancelled) return;
      const img = captureCurrentFrame();
      if (!img) return;
      // 슬라이딩 윈도우: 크기 유지하며 한 프레임씩 밀기
      const buffer = frameBufferRef.current;
      buffer.push(img);
      if (buffer.length > WINDOW_SIZE) buffer.shift();
      // 윈도우 차면 추론 시도
      if (buffer.length === WINDOW_SIZE) {
        maybeInferWindow();
      }
    }, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      frameBufferRef.current = [];
    };
  }, [isWebcamActive, selectedQuery?.value, videoRef]);

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
            <b>OMNi : for <span className="main-store-name-input">{storeName || "SMIT"} </span></b>
          </div> */}
          <section className="main-section live-monitoring-section">
            <div className="main-section-header">
              <span className="main-section-icon">📷</span>
              <span className="main-section-title">Live Monitoring</span>
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

              {/* 우상단 오버레이: similarity score */}
              {isWebcamActive && selectedQuery?.value && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(2px)"
                  }}
                >
                  <span style={{ opacity: 0.9 }}>Similarity</span>
                  <strong style={{ fontVariantNumeric: "tabular-nums" }}>
                    {latestScore == null ? "–" : latestScore.toFixed(3)}
                  </strong>
                  {isInferBusy && (
                    <span style={{ fontSize: 12, opacity: 0.8 }}>estimating…</span>
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
            <div className="main-alert-item">[22:03:15] 이상행동 감지 - 흡연</div>
            <div className="main-alert-item">[11:47:00] 이상행동 감지 - 쓰러짐</div>
            <div className="main-alert-item">[10:55:42] 이상행동 감지 - 파손손상</div>
            <div className="main-alert-item">[02:38:21] 이상행동 감지 - 도난</div>
          </div>
        </aside>
      </div>
      <div className="main-clip-section">
        <section className="main-section event-clip-section">
          <div className="main-section-header">
            <span className="main-section-icon">⏲️</span>
            <span className="main-section-title">Event Clip Archive</span>
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