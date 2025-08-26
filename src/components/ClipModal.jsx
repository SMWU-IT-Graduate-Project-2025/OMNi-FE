import React, { useEffect } from "react";

const ClipModal = ({ isOpen, onClose, clipUrl, title }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="clip-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="clip-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(960px, 92vw)",
          background: "#111827",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="clip-modal-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "#1f2937",
            color: "#f9fafb",
          }}
        >
          <div style={{ fontWeight: 700 }}>{title || "Alert Clip"}</div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: 0,
              color: "#e5e7eb",
              cursor: "pointer",
              fontSize: 18,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="clip-modal-body" style={{ background: "#000" }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            key={clipUrl}
            src={clipUrl}
            controls
            autoPlay
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClipModal;
