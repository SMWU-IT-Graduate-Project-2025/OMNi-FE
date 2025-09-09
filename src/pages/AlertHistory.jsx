import React, { useState } from "react";
import "./AlertHistory.css";
import Header from "../components/Header.jsx";
import ClipModal from "../components/ClipModal";

const AlertHistory = ({ onPageChange }) => {
  const [todayAlerts] = useState([
    {
      id: 1,
      time: "10:03 PM",
      type: "실내흡연",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrum01m46BXlnCB4gnxa_DJU5U8FsGiJEzhz1_smTRrpSTvxViK1swoF_SWk35P8etIKm1AOxs4icS-54zBOOur9rvu0o2S9XTubBIJ4Ql8TVka3oWp57J46UGQA__avvdETO6kdtDm37UMaLjpLEsReKXj5HfQ0msvgAVb2-jUoQ6DFL9ZTYgHAJPnHzw7hPv3jVCYYRewT9VwCyGD3tJJNr4XG4IUGQPm3MSncCTz0rIZwBhUxzWDmBMASPHXnofe7Qp-UVPRlw",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2NDksImV4cCI6MTc1ODk0MjY0OX0.9s2bF5Z8dHR5mybya9LA42Mw2QAAoAGxaPJUgGXOSWg", 
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS5tcDQiLCJpYXQiOjE3NTYzNTE4NjUsImV4cCI6MTc1ODk0Mzg2NX0.EvCFTB24qAEFgr-grDLR9I0LTV2RkQuYQbQNfwX448w"
    },
    {
      id: 2,
      time: "11:47 AM",
      type: "쓰러짐",
      description: "camera #1",
      //   description: "Unusual movement detected near the main entrance.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWpSKcLeuxWkEL1HkTfCuJ6v4ktpGKRvtyKfjPTLuq-509RYDsFo2IsZHgS18wXnXyrOY0wRSKooMiPkhRwS3ZNTKo6o3Fo8LUeoij1gtRKcTk7IxzB1b7_D-eKoBminJd0kKPSPugkKK92TIZ73Cj1xifuInN4NFAnZM0Q8nDJ8B1T7_6MXkt3BIor9bJL0mTqiUg43D3Ot8Pu8XfY3fKctqy4Cmb-oeDS8G4mcElifTlx4clMXJXz13JEROOSkfdZrNGoCqL2rM",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2MzcsImV4cCI6MTc1ODk0MjYzN30.9uehBKfO8aHOWveVlxk-BXYvTfgoK5zk06_39pdzfPo",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS5tcDQiLCJpYXQiOjE3NTYzNTE4NTAsImV4cCI6MTc1ODk0Mzg1MH0.U8BzbqndzV0ZVp_NRZvN5Rt8-e8SAMmaqJLV7U7BhgU"
    },
    {
      id: 3,
      time: "10:55 AM",
      type: "파손손상",
      description: "camera #2",
      //   description: "A package was left unattended in the lobby.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxCFNVvt152j6wYZgr4YTMH4VgkNbzHWK_i4lQv7nYT9EMH2WFvxoqf7MAWuY1UAk539WtfbuHuo5I_VmB_0ZomUcvlrPvhDi2JZKCMW7LLnJZVp2kl4L_DbWCyC2eUby_H22Rb3COG-lWrCXiitRd-p3flZ72WTC0vEJmJmC2xP76E83fMMT3X1D9eHHQGpw65YLOYN3UcQTAbUoAZ_HKfxXYQsWZEyx6LATBGyIc1b-AORU1aW1wl2fKZvVIJkBOp6Q7yo_EUHc",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLWltYWdlLnBuZyIsImlhdCI6MTc1NjM1MDYwOCwiZXhwIjoxNzU4OTQyNjA4fQ._xhs8Nb5vcsBvQQQD4VGbmGX4z87oN2A7lUoCNdcmuQ", 
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLm1wNCIsImlhdCI6MTc1NjM1MTgzNCwiZXhwIjoxNzU4OTQzODM0fQ.brd2-X3qWU0OzFSeblH95h5vwEnti-f7oNSIVBv3G1Y"
    },
    {
      id: 4,
      time: "02:38 AM",
      type: "절도도난",
      description: "camera #2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgATzq8jv--hx3YZKcPAqopLCBb9ZxTObm5iufsGoHhN0hdt1So5Y47bTDN45wnQ9_7qcdRp9XLAFVEwPMxhY_iuVVTq--tH9MX3gAMf2XwJSV8IGIIzK31ONgf018-1REd1ijRPq0Yp4e5QY8bnHBii8Uvut4kA0F0Jwt20VTgyB32VY_INgz9xz0P-IGTEsjgue2wsxlpJ1hcriBde7GyCZdv6qwQ5s365QdTnpnSpzExo5kfqEAqYPOfDE_2Ec0oDzZr16Ta8k",//   description: "A vehicle was detected approaching the main gate.",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUwMjY5LCJleHAiOjE3NTg5NDIyNjl9.gPHHFnp9pK4Q_Ypvm6o4QvYX2n2ozYYKIUwIcSAhHgw", 
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEubXA0IiwiaWF0IjoxNzU2MzUxODEzLCJleHAiOjE3NTg5NDM4MTN9.lq8evAmNAN_YKjzPFKk8lSeIA5DS3kHUuqTMqVvcxXo"
    },
  ]);

  const [yesterdayAlerts] = useState([

    {
      id: 5,
      time: "4:55 PM",
      type: "유기방치",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMranBlAhOxWBXSscKT0hL_dK0qI0SQWr_160O-RcYnpOojOxO6lV2FVBk0QARGHo5zyuwGIHybvGgAYidvPl9BADSNjsvPyrvVdMiYcT8jokvvobEgNztrA3bGDdxJdOsV17kfSQR9pQEHa1ZmL0wWtXz0kTiHJ7U57iM7uH0yn1-Q0zgDhgdCfudsyIxxBnqJfDaBkf38T15XlchgGD9IRc3mzN4DTn1Nlvf5ListlHK_6Gg9QaNk2h03k06vzWeqq5260AEiks",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2FiYW5kb25tZW50LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUzNjAzLCJleHAiOjE3NTg5NDU2MDN9.2F9gwzcoRxkS1pYZ0ths_O-VBuHBDCJDZaLPUFSvpAg",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2FiYW5kb25tZW50LTEubXA0IiwiaWF0IjoxNzU2MzUzNjg1LCJleHAiOjE3NTg5NDU2ODV9.OcDYCAN7x9mxJhn95Ju7nPvmIxmk5befyy4UWLAA54w",
    },
    {
      id: 6,
      time: "3:30 PM",
      type: "방화",
      description: "camera #3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoFKpstcaMqvJwnc_-bxRXZYsiH2mLjlTLFiIRDytxgVBKxgqw2k-spbNzAQZwPQQBapKBgX2s75pXpxm3kBG9sySmZAtgG-yXvAeqkctLOrh_FpZNr_8K9MCUR3VdZLpIwzVaInmJ3K1bNyrEoOI1eUmqka_8RY1d7oUCwxOIR4RxCAQkcfFv-nun4vzuKXiRNXi5z5ILJRuzVHYq_u2h8Wfy5V4eUUSVIW5QmaOOySM_lrCkZa9GyDfqBGU3XCr-ubG75HiNqF0",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/arson-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2Fyc29uLTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUzNzEzLCJleHAiOjE3NTg5NDU3MTN9.ducr0LumDQQmV-VLeerQvagoLE9ayNRmuHvztt0Rxkg",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/arson-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2Fyc29uLTEubXA0IiwiaWF0IjoxNzU2MzUzNzUzLCJleHAiOjE3NTg5NDU3NTN9.KGSTsnXQCmnH0s0qx_Odb-tT17WZlYcMVcHsNtpM5fk",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClipUrl, setActiveClipUrl] = useState("");
  const [activeTitle, setActiveTitle] = useState("");
  const [hoveredAlertId, setHoveredAlertId] = useState(null);

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

  // const getClipUrlFromStorage = (alert) => {
  //   try {
  //     const byId = window.localStorage.getItem(`alertClip:${alert.id}`);
  //     if (byId) return byId;
  //     const byKey = window.localStorage.getItem(
  //       `alertClip:${alert.type}:${alert.time}`
  //     );
  //     if (byKey) return byKey;
  //   } catch (e) {
  //     // no-op
  //   }
  //   // modify url
  //   return "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2FiYW5kb25tZW50LTEubXA0IiwiaWF0IjoxNzU2MjE5OTI3LCJleHAiOjE3NTg4MTE5Mjd9.6J6s43VMfdKIO4W8OUq1GGePWDFKQC86jWEXsLOkMds"; //TODO: replace real clip video
  // };

  const handleAlertClick = (alert) => {
    // const clipUrl = getClipUrlFromStorage(alert);
    setActiveClipUrl(alert.videoUrl);
    setActiveTitle(`${alert.type} • ${alert.time}`);
    setIsModalOpen(true);
  };

  const renderAlertItem = (alert) => {
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
            boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: isHovered ? 10 : 1,
            position: "relative"
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
          {todayAlerts.map(renderAlertItem)}
        </div>

        <h3 className="alert-section-title">This Month</h3>
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