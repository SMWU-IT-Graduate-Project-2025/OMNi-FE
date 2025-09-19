import React, { useContext } from "react";
import "./Header.css";
import { StoreContext } from "../StoreContext";

const Header = ({ onPageChange }) => {
  const { storeName } = useContext(StoreContext);
  const handlePageClick = (pageName) => {
    console.log(`Header: Click detected for ${pageName}`);
    console.log(`Header: onPageChange function exists:`, !!onPageChange);
    console.log(`Header: onPageChange function type:`, typeof onPageChange);
    
    if (onPageChange && typeof onPageChange === 'function') {
      console.log(`Header: Calling onPageChange with ${pageName}`);
      onPageChange(pageName);
    } else {
      console.error("Header: onPageChange is not a valid function");
    }
  };

  const handleEventDBClick = () => {
    console.log("Header: Event DB clicked!");
    handlePageClick("event-db");
  };

  console.log(`Header: Component rendered with onPageChange:`, !!onPageChange);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
            <div 
              className="header-logo" 
              onClick={() => handlePageClick("home")}
              style={{ 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
                <img 
                  src="/logo-final-omni_full.png" 
                  alt="OMNi Logo" 
                  className="header-logo-img" 
                  style={{ height: '45px', width: 'auto', paddingLeft: '10px', paddingBottom: '7px' }}
                />
                <span style={{ 
                  fontSize: '26px', 
                  fontWeight: '1000',
                  color: '#333',
                  whiteSpace: 'nowrap'
                }}>
                  for {storeName || "SMIT"}
                </span>
            </div>
          
        </div>
        <nav className="header-nav">
          <span 
            className="header-nav-item" 
            onClick={() => handlePageClick("monitoring")}
            style={{ cursor: "pointer" }}
          >
            <b>Monitoring</b>
          </span>
          <span 
            className="header-nav-item" 
            onClick={() => handlePageClick("alert-history")}
            style={{ cursor: "pointer" }}
          >
            <b>Alert History</b>
          </span>
          <span 
            className="header-nav-item" 
            onClick={handleEventDBClick}
            style={{ cursor: "pointer" }}
          >
            <b>Event DB</b>
          </span>
          {/* <span className="header-nav-item">
            <b>Testbed</b>
            </span> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;