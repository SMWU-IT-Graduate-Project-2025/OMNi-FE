import React from "react";
import "./MainMonitoring.css";

const MainMonitoring = ({ storeName }) => {
  return (
    <div className="main-root">
      <header className="main-header">
        <nav className="main-nav">
          <span>Monitoring</span>
          <span>Alert History</span>
          <span>Event DB</span>
          <span>Camera Setting</span>
        </nav>
      </header>
      <div className="main-content-area">
        <div className="main-content-left">
          <div className="main-store-name">
            <b>OMNi : for <span className="main-store-name-input">{storeName || "SMIT"} </span></b>
          </div>
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
          <section className="main-section event-clip-section">
            <div className="main-section-header">
              <span className="main-section-icon">⏲️</span>
              <span className="main-section-title">Event Clip Archive</span>
            </div>
            <div className="main-clip-list">
              <div className="main-clip-item">📁 Clip 1</div>
              <div className="main-clip-item">📁 Clip 2</div>
              <div className="main-clip-item">📁 Clip 3</div>
            </div>
          </section>
        </div>
        <aside className="main-content-right">
          <div className="main-section-header">
            <span className="main-section-icon">🔔</span>
            <span className="main-section-title">Recent Alerts</span>
          </div>
          <div className="main-alert-list">
            <div className="main-alert-item">[12:03:15] 이상행동 감지 - 도난</div>
            <div className="main-alert-item">[11:47:00] 이상행동 감지 - 쓰러짐</div>
            <div className="main-alert-item">[10:55:42] 이상행동 감지 - 다툼</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainMonitoring; 