import React, { useContext, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./EventDB.css";
import Header from "../components/Header.jsx";
import { StoreContext } from "../StoreContext";

const COLORS = [
  "#e9c46a",
  "#FC806A", 
  "#4a90a0",
  "#8fbb8f",
  "#6ab8a0",
  "#7ab8d7"
];

const EventDB = ({ onPageChange }) => {
  const { storeName } = useContext(StoreContext);
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
    { name: "쓰러짐", value: 20 },
    { name: "절도", value: 27 },
    { name: "흡연", value: 40 },
    { name: "유기", value: 13}
  ]);

  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    if (newEventDescription.trim()) {
      console.log("New event registered:", newEventDescription);
      setNewEventDescription("");
    }
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
              <h2 className="section-title">Event Statistics </h2>
              <p className="section-subtitle">Analyze a store environment using frequency</p>
            </div>
            <div className="statistics-content">
              {eventStatistics.length === 0 ? (
                <div>통계 데이터가 없습니다.</div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={eventStatistics}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(1)}%`
                      }
                      stroke="#ffffff"
                      strokeWidth={2}
                      animationDuration={1000}
                      animationBegin={0}
                    >
                      {eventStatistics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                      iconType="circle"
                      wrapperStyle={{ 
                        fontSize: "14px",
                        fontFamily: '"Space Grotesk", "Noto Sans", sans-serif'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventDB; 