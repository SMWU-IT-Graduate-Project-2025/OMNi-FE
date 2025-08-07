import React, { useState } from "react";
import "./EventDB.css";
import Header from "../components/Header";

const EventDB = ({ onPageChange }) => {
  const [newEventDescription, setNewEventDescription] = useState("");
  const [existingEvents] = useState([
    { id: 1, name: "쓰러짐", description: "사람이 쓰러지는 상황 감지" },
    { id: 2, name: "절도", description: "도난 행위 감지" },
    { id: 3, name: "흡연", description: "폭력 행위 감지" },
    { id: 4, name: "방화", description: "무단 침입 감지" },
    { id: 5, name: "유기", description: "화재 상황 감지" },
    { id: 6, name: "파손", description: "교통사고 감지" }
  ]);

  const [eventStatistics] = useState([
    { name: "쓰러짐", frequency: 35, color: "#2c5aa0" },
    { name: "절도", frequency: 25, color: "#3a7ca5" },
    { name: "흡연", frequency: 40, color: "#4a90a0" }
  ]);

  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    if (newEventDescription.trim()) {
      console.log("New event registered:", newEventDescription);
      setNewEventDescription("");
    }
  };

  const renderPieChart = () => {
    const total = eventStatistics.reduce((sum, stat) => sum + stat.frequency, 0);
    let currentAngle = 0;

    return (
      <div className="pie-chart-container">
        <svg className="pie-chart" viewBox="0 0 200 200">
          {eventStatistics.map((stat, index) => {
            const percentage = (stat.frequency / total) * 100;
            const angle = (percentage / 100) * 360;
            const radius = 80;
            const centerX = 100;
            const centerY = 100;
            
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
            const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
            const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
            const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${startX} ${startY}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'Z'
            ].join(' ');

            currentAngle += angle;

            return (
              <path
                key={index}
                d={pathData}
                fill={stat.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="pie-chart-legend">
          {eventStatistics.map((stat, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: stat.color }}
              ></div>
              <span className="legend-text">{stat.name}: {stat.frequency}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="event-db-root">
      <Header onPageChange={onPageChange} />
      <div className="event-db-content">
        {/* New Event Registration Section */}
        <section className="event-db-section new-event-section">
          <div className="section-header">
            <h2 className="section-title">New Event Registration</h2>
          </div>
          <form className="new-event-form" onSubmit={handleNewEventSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="event-description-input"
                placeholder="Enter the description of the new event..."
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
              />
              <button type="submit" className="submit-button">
                Enter
              </button>
            </div>
          </form>
        </section>

        {/* Main Content Area */}
        <div className="event-db-main-content">
          {/* Existing Events Section */}
          <section className="event-db-section existing-events-section">
            <div className="section-header">
              <h2 className="section-title">Existing Events</h2>
            </div>
            <div className="existing-events-list">
              {existingEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <span className="event-name">{event.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Event Statistics Section */}
          <section className="event-db-section statistics-section">
            <div className="section-header">
              <h2 className="section-title">Event Statistics (frequency)</h2>
            </div>
            <div className="statistics-content">
              {renderPieChart()}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventDB; 