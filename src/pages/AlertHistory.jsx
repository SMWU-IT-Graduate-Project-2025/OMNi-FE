import React, { useContext, useState } from "react";
import { StoreContext } from "../StoreContext";
import "./AlertHistory.css";
import Header from "../components/Header.jsx";
import ClipModal from "../components/ClipModal";

const AlertHistory = ({ onPageChange }) => {
  const { storeName } = useContext(StoreContext);
  const [todayAlerts, setTodayAlerts] = useState([
    {
      id: 1,
      time: "10:03 PM",
      type: "실내흡연",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrum01m46BXlnCB4gnxa_DJU5U8FsGiJEzhz1_smTRrpSTvxViK1swoF_SWk35P8etIKm1AOxs4icS-54zBOOur9rvu0o2S9XTubBIJ4Ql8TVka3oWp57J46UGQA__avvdETO6kdtDm37UMaLjpLEsReKXj5HfQ0msvgAVb2-jUoQ6DFL9ZTYgHAJPnHzw7hPv3jVCYYRewT9VwCyGD3tJJNr4XG4IUGQPm3MSncCTz0rIZwBhUxzWDmBMASPHXnofe7Qp-UVPRlw",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1-image.png?...",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1.mp4?...",
      feedback: null
    },
    {
      id: 2,
      time: "11:47 AM",
      type: "쓰러짐",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWpSKcLeuxWkEL1HkTfCuJ6v4ktpGKRvtyKfjPTLuq-509RYDsFo2IsZHgS18wXnXyrOY0wRSKooMiPkhRwS3ZNTKo6o3Fo8LUeoij1gtRKcTk7IxzB1b7_D-eKoBminJd0kKPSPugkKK92TIZ73Cj1xifuInN4NFAnZM0Q8nDJ8B1T7_6MXkt3BIor9bJL0mTqiUg43D3Ot8Pu8XfY3fKctqy4Cmb-oeDS8G4mcElifTlx4clMXJXz13JEROOSkfdZrNGoCqL2rM",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1-image.png?...",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1.mp4?...",
      feedback: null
    },
    {
      id: 3,
      time: "10:55 AM",
      type: "파손손상",
      description: "camera #2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxCFNVvt152j6wYZgr4YTMH4VgkNbzHWK_i4lQv7nYT9EMH2WFvxoqf7MAWuY1UAk539WtfbuHuo5I_VmB_0ZomUcvlrPvhDi2JZKCMW7LLnJZVp2kl4L_DbWCyC2eUby_H22Rb3COG-lWrCXiitRd-p3flZ72WTC0vEJmJmC2xP76E83fMMT3X1D9eHHQGpw65YLOYN3UcQTAbUoAZ_HKfxXYQsWZEyx6LATBGyIc1b-AORU1aW1wl2fKZvVIJkBOp6Q7yo_EUHc",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1-image.png?...",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1.mp4?...",
      feedback: null
    },
    {
      id: 4,
      time: "02:38 AM",
      type: "절도도난",
      description: "camera #2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgATzq8jv--hx3YZKcPAqopLCBb9ZxTObm5iufsGoHhN0hdt1So5Y47bTDN45wnQ9_7qcdRp9XLAFVEwPMxhY_iuVVTq--tH9MX3gAMf2XwJSV8IGIIzK31ONgf018-1REd1ijRPq0Yp4e5QY8bnHBii8Uvut4kA0F0Jwt20VTgyB32VY_INgz9xz0P-IGTEsjgue2wsxlpJ1hcriBde7GyCZdv6qwQ5s365QdTnpnSpzExo5kfqEAqYPOfDE_2Ec0oDzZr16Ta8k",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1-image.png?...",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1.mp4?...",
      feedback: null
    },
  ]);

  const [yesterdayAlerts, setYesterdayAlerts] = useState([
    {
      id: 5,
      time: "4:55 PM",
      type: "유기방치",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMranBlAhOxWBXSscKT0hL_dK0qI0SQWr_160O-RcYnpOojOxO6lV2FVBk0QARGHo5zyuwGIHybvGgAYidvPl9BADSNjsvPyrvVdMiYcT8jokvvobEgNztrA3bGDdxJdOsV17kfSQR9pQEHa1ZmL0wWtXz0kTiHJ7U57iM7uH0yn1-Q0zgDhgdCfudsyIxxBnqJfDaBkf38T15XlchgGD9IRc3mzN4DTn1Nlvf5ListlHK_6Gg9QaNk2h03k06vzWeqq5260AEiks",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1-image.png?...",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1.mp4?...",
      feedback: null
    },
    {
      id: 6,
      time: "3:30 PM",
      type: "방화",
      description: "camera #3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoFKpstcaMqvJwnc_-bxRXZYsiH2mLjlTLFiIRDytxgVBKxgqw2k-spbNzAQZwPQQBapKBgX2s75pXpxm3kBG9sySmZAtgG-yXvAeqkctLOrh_FpZNr_8K9MCUR3VdZLpIwzVaInmJ3K1bNyrEoOI1eUmqka_8RY1d7oUCwxOIR4RxCAQkcfFv-nun4vzuKXiRNXi5z5ILJRuzVHYq_u2h8Wfy5V4eUUSVIW5QmaOOySM_lrCkZa9GyDfqBGU3XCr-ubG75HiNqF0",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/arson-1-image.png?...",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/arson-1.mp4?...",
      feedback: null
    },
  ]);

  const handleFeedback = (id, feedback, isToday = true) => {
    if (isToday) {
      setTodayAlerts(prev =>
        prev.map(alert =>
          alert.id === id ? { ...alert, feedback } : alert
        )
      );
    } else {
      setYesterdayAlerts(prev =>
        prev.map(alert =>
          alert.id === id ? { ...alert, feedback } : alert
        )
      );
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClipUrl, setActiveClipUrl] = useState("");
  const [activeTitle, setActiveTitle] = useState("");
  const [hoveredAlertId, setHoveredAlertId] = useState(null);

  const isThumbUrlValid = (thumbUrl) => {
    if (!thumbUrl) return false;
    try {
      const url = new URL(thumbUrl);
      const exp = url.searchParams.get("token");
      if (!exp) return false;
      const tokenParts = exp.split(".");
      if (tokenParts.length !== 3) return false;
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  };

  const handleAlertClick = (alert) => {
    setActiveClipUrl(alert.videoUrl);
    setActiveTitle(`${alert.type} • ${alert.time}`);
    setIsModalOpen(true);
  };

  const renderAlertItem = (alert, from) => {
    const isThumbValid = isThumbUrlValid(alert.thumbUrl);
    const imageUrl = isThumbValid ? alert.thumbUrl : alert.image;
    const isHovered = hoveredAlertId === alert.id;
    const isAnyHovered = hoveredAlertId !== null;

    return (
      <div key={alert.id} className="alert-item-container">
        <div
          className="alert-item-content"
          onClick={() => handleAlertClick(alert)}
          onMouseEnter={() => setHoveredAlertId(alert.id)}
          onMouseLeave={() => setHoveredAlertId(null)}
          style={{
            cursor: "pointer",
            opacity: isAnyHovered && !isHovered ? 0.3 : 1,
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            transition: "all 0.3s ease",
            boxShadow: isHovered
              ? "0 8px 25px rgba(0,0,0,0.15)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: isHovered ? 10 : 1,
            position: "relative",
          }}
        >
          <div className="alert-text-section">
            <p className="alert-time">{alert.time}</p>
            <p className="alert-type">{alert.type}</p>
            <p className="alert-description">{alert.description}</p>
          </div>
          <div
            className="alert-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>

          <div className="alert-feedback">
            {alert.feedback ? (
              <span>
                {alert.feedback === "good" ? "✅ Good" : "❌ Bad"}
              </span>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeedback(alert.id, "good", from === "today");
                  }}
                >
                  👍 Good
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeedback(alert.id, "bad", from === "today");
                  }}
                >
                  👎 Bad
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="alert-history-root">
      <Header onPageChange={onPageChange} />
      <div className="alert-history-content">
        <div className="alert-header-section">
          <div className="alert-header-text">
            <p className="alert-main-title">Alerts</p>
            <p className="alert-subtitle">Review and manage triggered alarms</p>
          </div>
        </div>

        <h3 className="alert-section-title">Yesterday</h3>
        <div className="alert-list">
          {todayAlerts.map((alert) => renderAlertItem(alert, "today"))}
        </div>

        <h3 className="alert-section-title">This Month</h3>
        <div className="alert-list">
          {yesterdayAlerts.map((alert) => renderAlertItem(alert, "yesterday"))}
        </div>
      </div>

      <ClipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clipUrl={activeClipUrl}
        title={activeTitle}
      />
    </div>
  );
};

export default AlertHistory;
