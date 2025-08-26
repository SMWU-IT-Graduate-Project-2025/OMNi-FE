import React, { useState } from "react";
import "./AlertHistory.css";
import Header from "../components/Header";
import ClipModal from "../components/ClipModal";

const AlertHistory = ({ onPageChange }) => {
  const [todayAlerts] = useState([
    {
      id: 1,
      time: "10:30 AM",
      type: "Intruder Detected",
      //   camera: "camera #1",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrum01m46BXlnCB4gnxa_DJU5U8FsGiJEzhz1_smTRrpSTvxViK1swoF_SWk35P8etIKm1AOxs4icS-54zBOOur9rvu0o2S9XTubBIJ4Ql8TVka3oWp57J46UGQA__avvdETO6kdtDm37UMaLjpLEsReKXj5HfQ0msvgAVb2-jUoQ6DFL9ZTYgHAJPnHzw7hPv3jVCYYRewT9VwCyGD3tJJNr4XG4IUGQPm3MSncCTz0rIZwBhUxzWDmBMASPHXnofe7Qp-UVPRlw",
    },
    {
      id: 2,
      time: "11:45 AM",
      type: "Suspicious Activity",
      description: "camera #2",
      //   description: "Unusual movement detected near the main entrance.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWpSKcLeuxWkEL1HkTfCuJ6v4ktpGKRvtyKfjPTLuq-509RYDsFo2IsZHgS18wXnXyrOY0wRSKooMiPkhRwS3ZNTKo6o3Fo8LUeoij1gtRKcTk7IxzB1b7_D-eKoBminJd0kKPSPugkKK92TIZ73Cj1xifuInN4NFAnZM0Q8nDJ8B1T7_6MXkt3BIor9bJL0mTqiUg43D3Ot8Pu8XfY3fKctqy4Cmb-oeDS8G4mcElifTlx4clMXJXz13JEROOSkfdZrNGoCqL2rM",
    },
    {
      id: 3,
      time: "12:15 PM",
      type: "Package Left Unattended",
      description: "camera #1",
      //   description: "A package was left unattended in the lobby.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxCFNVvt152j6wYZgr4YTMH4VgkNbzHWK_i4lQv7nYT9EMH2WFvxoqf7MAWuY1UAk539WtfbuHuo5I_VmB_0ZomUcvlrPvhDi2JZKCMW7LLnJZVp2kl4L_DbWCyC2eUby_H22Rb3COG-lWrCXiitRd-p3flZ72WTC0vEJmJmC2xP76E83fMMT3X1D9eHHQGpw65YLOYN3UcQTAbUoAZ_HKfxXYQsWZEyx6LATBGyIc1b-AORU1aW1wl2fKZvVIJkBOp6Q7yo_EUHc",
    },
  ]);

  const [yesterdayAlerts] = useState([
    {
      id: 4,
      time: "3:20 PM",
      type: "Vehicle Approaching Gate",
      description: "camera #2",
      //   description: "A vehicle was detected approaching the main gate.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgATzq8jv--hx3YZKcPAqopLCBb9ZxTObm5iufsGoHhN0hdt1So5Y47bTDN45wnQ9_7qcdRp9XLAFVEwPMxhY_iuVVTq--tH9MX3gAMf2XwJSV8IGIIzK31ONgf018-1REd1ijRPq0Yp4e5QY8bnHBii8Uvut4kA0F0Jwt20VTgyB32VY_INgz9xz0P-IGTEsjgue2wsxlpJ1hcriBde7GyCZdv6qwQ5s365QdTnpnSpzExo5kfqEAqYPOfDE_2Ec0oDzZr16Ta8k",
    },
    {
      id: 5,
      time: "4:55 PM",
      type: "Person Climbing Fence",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMranBlAhOxWBXSscKT0hL_dK0qI0SQWr_160O-RcYnpOojOxO6lV2FVBk0QARGHo5zyuwGIHybvGgAYidvPl9BADSNjsvPyrvVdMiYcT8jokvvobEgNztrA3bGDdxJdOsV17kfSQR9pQEHa1ZmL0wWtXz0kTiHJ7U57iM7uH0yn1-Q0zgDhgdCfudsyIxxBnqJfDaBkf38T15XlchgGD9IRc3mzN4DTn1Nlvf5ListlHK_6Gg9QaNk2h03k06vzWeqq5260AEiks",
    },
    {
      id: 6,
      time: "5:30 PM",
      type: "Object Thrown Over Fence",
      description: "An object was thrown over the perimeter fence.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoFKpstcaMqvJwnc_-bxRXZYsiH2mLjlTLFiIRDytxgVBKxgqw2k-spbNzAQZwPQQBapKBgX2s75pXpxm3kBG9sySmZAtgG-yXvAeqkctLOrh_FpZNr_8K9MCUR3VdZLpIwzVaInmJ3K1bNyrEoOI1eUmqka_8RY1d7oUCwxOIR4RxCAQkcfFv-nun4vzuKXiRNXi5z5ILJRuzVHYq_u2h8Wfy5V4eUUSVIW5QmaOOySM_lrCkZa9GyDfqBGU3XCr-ubG75HiNqF0",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClipUrl, setActiveClipUrl] = useState("");
  const [activeTitle, setActiveTitle] = useState("");

  const getClipUrlFromStorage = (alert) => {
    try {
      const byId = window.localStorage.getItem(`alertClip:${alert.id}`);
      if (byId) return byId;
      const byKey = window.localStorage.getItem(
        `alertClip:${alert.type}:${alert.time}`
      );
      if (byKey) return byKey;
    } catch (e) {
      // no-op
    }
    // fallback demo clip sample
    return "https://www.w3schools.com/html/mov_bbb.mp4"; //TODO: replace real clip video
  };

  const handleAlertClick = (alert) => {
    const clipUrl = getClipUrlFromStorage(alert);
    setActiveClipUrl(clipUrl);
    setActiveTitle(`${alert.type} • ${alert.time}`);
    setIsModalOpen(true);
  };

  const renderAlertItem = (alert) => (
    <div key={alert.id} className="alert-item-container">
      <div
        className="alert-item-content"
        onClick={() => handleAlertClick(alert)}
        style={{ cursor: "pointer" }}
      >
        <div className="alert-text-section">
          <p className="alert-time">{alert.time}</p>
          <p className="alert-type">{alert.type}</p>
          <p className="alert-description">{alert.description}</p>
        </div>
        <div
          className="alert-image"
          style={{ backgroundImage: `url(${alert.image})` }}
        ></div>
      </div>
    </div>
  );

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
        
        <h3 className="alert-section-title">Today</h3>
        <div className="alert-list">
          {todayAlerts.map(renderAlertItem)}
        </div>

        <h3 className="alert-section-title">Yesterday</h3>
        <div className="alert-list">
          {yesterdayAlerts.map(renderAlertItem)}
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