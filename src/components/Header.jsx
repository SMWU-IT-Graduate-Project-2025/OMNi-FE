import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
            <div className="header-logo">
                {/* <img src="public/favicon.ico" alt="OMNi Logo" className="header-logo-img" width={30} height={30}/> */}
                <span className="header-service-name"> 🪬 OMNi : for SMIT</span>
            </div>
          
        </div>
        <nav className="header-nav">
          <span className="header-nav-item">Monitoring</span>
          <span className="header-nav-item">Alert History</span>
          <span className="header-nav-item">Event DB</span>
          <span className="header-nav-item">Camera Setting</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;