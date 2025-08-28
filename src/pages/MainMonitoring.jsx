import React, { useEffect, useState } from "react";
import "./MainMonitoring.css";
import Header from "../components/Header";
import ClipModal from "../components/ClipModal";

const MainMonitoring = ({ storeName, onPageChange }) => {
  const [clips, setClips] = useState([
    { id: 1, title: "[실내흡연]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2NDksImV4cCI6MTc1ODk0MjY0OX0.9s2bF5Z8dHR5mybya9LA42Mw2QAAoAGxaPJUgGXOSWg", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS5tcDQiLCJpYXQiOjE3NTYzNTE4NjUsImV4cCI6MTc1ODk0Mzg2NX0.EvCFTB24qAEFgr-grDLR9I0LTV2RkQuYQbQNfwX448w" },
    { id: 2, title: "[쓰러짐]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2MzcsImV4cCI6MTc1ODk0MjYzN30.9uehBKfO8aHOWveVlxk-BXYvTfgoK5zk06_39pdzfPo", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS5tcDQiLCJpYXQiOjE3NTYzNTE4NTAsImV4cCI6MTc1ODk0Mzg1MH0.U8BzbqndzV0ZVp_NRZvN5Rt8-e8SAMmaqJLV7U7BhgU" },
    { id: 3, title: "[파손손상]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLWltYWdlLnBuZyIsImlhdCI6MTc1NjM1MDYwOCwiZXhwIjoxNzU4OTQyNjA4fQ._xhs8Nb5vcsBvQQQD4VGbmGX4z87oN2A7lUoCNdcmuQ", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLm1wNCIsImlhdCI6MTc1NjM1MTgzNCwiZXhwIjoxNzU4OTQzODM0fQ.brd2-X3qWU0OzFSeblH95h5vwEnti-f7oNSIVBv3G1Y" },
    { id: 4, title: "[절도도난]", thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUwMjY5LCJleHAiOjE3NTg5NDIyNjl9.gPHHFnp9pK4Q_Ypvm6o4QvYX2n2ozYYKIUwIcSAhHgw", videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEubXA0IiwiaWF0IjoxNzU2MzUxODEzLCJleHAiOjE3NTg5NDM4MTN9.lq8evAmNAN_YKjzPFKk8lSeIA5DS3kHUuqTMqVvcxXo" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClip, setActiveClip] = useState(null);

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
              <span className="main-status-badge">Stopped</span>
            </div>
            <div className="main-live-video">
              <span className="main-live-video-text">📷 실시간 영상 스트림</span>
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
            {clips.map((clip) => (
              <div
                key={clip.id}
                className="main-clip-item"
                style={{
                  backgroundImage: clip.thumbUrl ? `url(${clip.thumbUrl})` : undefined,
                  backgroundSize: clip.thumbUrl ? "cover" : undefined,
                  backgroundPosition: clip.thumbUrl ? "center" : undefined,
                  cursor: "pointer",
                }}
                title={clip.title}
                onClick={() => handleClipClick(clip)}
              >
                {!clip.thumbUrl && <span>📁 {clip.title}</span>}
                {clip.thumbUrl && (
                  <div className="main-clip-caption">
                    <span>{clip.title}</span>
                  </div>
                )}
              </div>
            ))}
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