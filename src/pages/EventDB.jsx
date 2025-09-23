import React, { useContext, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./EventDB.css";
import Header from "../components/header.jsx";
import { StoreContext } from "../StoreContext";
import supabase from "../lib/supabase";

const COLORS = [
  "#ba4c9c",
  "#FC806A", 
  "#e9c46a",
  "#8fbb8f",
  "#6ab8a0",
  "#4a90a0",
  "#725CAD",
  "#96A78D",
  "#F6DC43"
];

const EventDB = ({ onPageChange }) => {
  const { storeName, selectedEvent } = useContext(StoreContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null); // 호버된 이벤트 상태 추가
  const [existingEvents] = useState([
    { id: 1, name: "쓰러짐", description: "사람이 쓰러지는 상황 감지" },
    { id: 2, name: "절도도난", description: "상품 도난 행위 감지" },
    { id: 3, name: "실내흡연", description: "매장내 흡연 감지" },
    { id: 4, name: "방화", description: "무단 침입 감지" },
    { id: 5, name: "유기방치", description: "물품 유기 감지" },
    { id: 6, name: "파손손상", description: "장비 파손/파괴 감지" }
  ]);

  const [eventStatistics, setEventStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 모델 피드백 관련 상태
  const [feedbackStatistics, setFeedbackStatistics] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);

  // 실제 alert 데이터를 기반으로 통계 생성
  const fetchEventStatistics = async () => {
    console.log("\n" + "=".repeat(50));
    console.log("📊 EventDB: 이벤트 통계 데이터 가져오기 시작");
    console.log("=".repeat(50));
    
    if (!supabase) {
      console.warn("⚠️ Supabase 클라이언트가 초기화되지 않았습니다.");
      console.log("📋 Fallback 통계 데이터를 사용합니다.");
      console.log("=".repeat(50) + "\n");
      setEventStatistics([
        { name: "쓰러짐", value: 20 },
        { name: "절도", value: 27 },
        { name: "흡연", value: 40 },
        { name: "유기", value: 13}
      ]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("🔍 이벤트 통계 쿼리 실행 중...");
      console.log("📋 쿼리 정보:");
      console.log("   - 테이블: alerts (event_id별 그룹화)");
      console.log("   - 조인: events (이벤트 이름 가져오기)");
      console.log("   - 집계: COUNT(*)");
      
      const startTime = Date.now();

      // alerts 테이블에서 event_id별로 그룹화하여 통계 생성
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          event_id,
          events!inner (
            name_ko,
            name
          )
        `);

      const endTime = Date.now();
      const queryTime = endTime - startTime;

      if (error) {
        console.error("❌ 이벤트 통계 쿼리 실패:");
        console.error("   - 오류 코드:", error.code);
        console.error("   - 오류 메시지:", error.message);
        console.error("   - 상세 정보:", error.details);
        throw error;
      }

      console.log("✅ 이벤트 통계 쿼리 성공!");
      console.log("📊 쿼리 결과:");
      console.log("   - 실행 시간:", queryTime + "ms");
      console.log("   - 조회된 레코드 수:", data ? data.length : 0);

      // 데이터가 없거나 빈 배열인 경우 fallback 사용
      if (!data || data.length === 0) {
        console.warn("⚠️ 데이터베이스에서 데이터를 찾을 수 없습니다.");
        console.log("📋 Fallback 통계 데이터를 사용합니다.");
        console.log("=".repeat(50) + "\n");
        setEventStatistics([
          { name: "쓰러짐", value: 20 },
          { name: "절도", value: 27 },
          { name: "흡연", value: 40 },
          { name: "유기", value: 13}
        ]);
        setLoading(false);
        return;
      }

      console.log("🔄 통계 데이터 변환 중...");
      
      // event_id별로 그룹화하여 카운트
      const eventCounts = {};
      data.forEach(alert => {
        const eventName = alert.events?.name_ko || alert.events?.name || "알 수 없는 이벤트";
        eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;
      });

      // 차트 데이터 형식으로 변환하고 점유율 순서대로 정렬
      const chartData = Object.entries(eventCounts)
        .map(([name, value]) => ({
          name,
          value
        }))
        .sort((a, b) => b.value - a.value); // 점유율(값) 내림차순 정렬

      console.log("✅ 통계 데이터 변환 완료!");
      console.log("📊 변환된 통계:");
      console.log("   - 총 이벤트 타입 수:", chartData.length);
      chartData.forEach(item => {
        console.log(`   - ${item.name}: ${item.value}개`);
      });
      console.log("=".repeat(50) + "\n");

      setEventStatistics(chartData);
    } catch (err) {
      console.error("❌ 이벤트 통계 가져오기 중 오류 발생:");
      console.error("   - 오류 타입:", err.name);
      console.error("   - 오류 메시지:", err.message);
      console.error("   - 스택 트레이스:", err.stack);
      console.log("📋 Fallback 통계 데이터를 사용합니다.");
      console.log("=".repeat(50) + "\n");
      
      // 에러 발생 시 fallback 데이터 사용
      setEventStatistics([
        { name: "쓰러짐", value: 20 },
        { name: "절도", value: 27 },
        { name: "흡연", value: 40 },
        { name: "유기", value: 13}
      ]);
      setError(`데이터베이스 연결 실패: ${err.message}. Fallback 데이터를 표시합니다.`);
    } finally {
      setLoading(false);
    }
  };

  // 모델 피드백 통계 데이터 가져오기
  const fetchFeedbackStatistics = async () => {
    console.log("\n" + "=".repeat(50));
    console.log("📊 EventDB: 모델 피드백 통계 데이터 가져오기 시작");
    console.log("=".repeat(50));
    
    if (!supabase) {
      console.warn("⚠️ Supabase 클라이언트가 초기화되지 않았습니다.");
      console.log("📋 Fallback 피드백 통계 데이터를 사용합니다.");
      console.log("=".repeat(50) + "\n");
      setFeedbackStatistics([
        { name: "정상 탐지", value: 73, color: "#59AC77" },
        { name: "오탐", value: 27, color: "#cf6451" },
        { name: "피드백 없음", value: 45, color: "#ba4c9c" }
      ]);
      setFeedbackLoading(false);
      return;
    }

    try {
      setFeedbackLoading(true);
      setFeedbackError(null);

      console.log("🔍 모델 피드백 통계 쿼리 실행 중...");
      console.log("📋 쿼리 정보:");
      console.log("   - 테이블: alerts, alert_feedback");
      console.log("   - 전체 피드백 통계 집계");
      
      const startTime = Date.now();

      // 전체 alerts와 alert_feedback을 조인하여 피드백 통계 생성
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          id,
          alert_feedback (
            label
          )
        `);

      const endTime = Date.now();
      const queryTime = endTime - startTime;

      if (error) {
        console.error("❌ 모델 피드백 통계 쿼리 실패:");
        console.error("   - 오류 코드:", error.code);
        console.error("   - 오류 메시지:", error.message);
        console.error("   - 상세 정보:", error.details);
        throw error;
      }

      console.log("✅ 모델 피드백 통계 쿼리 성공!");
      console.log("📊 쿼리 결과:");
      console.log("   - 실행 시간:", queryTime + "ms");
      console.log("   - 조회된 레코드 수:", data ? data.length : 0);

      // 데이터가 없거나 빈 배열인 경우 fallback 사용
      if (!data || data.length === 0) {
        console.warn("⚠️ 데이터베이스에서 피드백 데이터를 찾을 수 없습니다.");
        console.log("📋 Fallback 피드백 통계 데이터를 사용합니다.");
        console.log("=".repeat(50) + "\n");
        setFeedbackStatistics([
          { name: "정상 탐지", value: 73, color: "#59AC77" },
          { name: "오탐", value: 27, color: "#cf6451" },
          { name: "피드백 없음", value: 45, color: "#ba4c9c" }
        ]);
        setFeedbackLoading(false);
        return;
      }

      console.log("🔄 피드백 통계 데이터 변환 중...");
      
      // 전체 피드백 통계 집계
      let goodCount = 0;
      let badCount = 0;
      let noFeedbackCount = 0;
      
      data.forEach(alert => {
        const feedback = alert.alert_feedback?.[0]?.label; // 첫 번째 피드백 사용
        
        if (feedback === "good") {
          goodCount++;
        } else if (feedback === "bad") {
          badCount++;
        } else {
          noFeedbackCount++;
        }
      });

      // 차트 데이터 형식으로 변환
      const chartData = [
        { name: "정상 탐지", value: goodCount, color: "#59AC77" },
        { name: "오탐", value: badCount, color: "#cf6451" },
        { name: "피드백 없음", value: noFeedbackCount, color: "#b0b0b0" }
      ];

      console.log("✅ 피드백 통계 데이터 변환 완료!");
      console.log("📊 변환된 피드백 통계:");
      console.log("   - 정상 탐지:", goodCount, "개");
      console.log("   - 오탐:", badCount, "개");
      console.log("   - 피드백 없음:", noFeedbackCount, "개");
      console.log("   - 총 알림 수:", data.length, "개");
      console.log("=".repeat(50) + "\n");

      setFeedbackStatistics(chartData);
    } catch (err) {
      console.error("❌ 모델 피드백 통계 가져오기 중 오류 발생:");
      console.error("   - 오류 타입:", err.name);
      console.error("   - 오류 메시지:", err.message);
      console.error("   - 스택 트레이스:", err.stack);
      console.log("📋 Fallback 피드백 통계 데이터를 사용합니다.");
      console.log("=".repeat(50) + "\n");
      
      // 에러 발생 시 fallback 데이터 사용
      setFeedbackStatistics([
        { name: "정상 탐지", value: 73, color: "#59AC77" },
        { name: "오탐", value: 27, color: "#cf6451" },
        { name: "피드백 없음", value: 45, color: "#ba4c9c" }
      ]);
      setFeedbackError(`데이터베이스 연결 실패: ${err.message}. Fallback 데이터를 표시합니다.`);
    } finally {
      setFeedbackLoading(false);
    }
  };

  // 컴포넌트 마운트 시 통계 데이터 가져오기
  useEffect(() => {
    console.log("\n" + "=".repeat(50));
    console.log("🚀 EventDB 컴포넌트 마운트됨");
    console.log("=".repeat(50));
    console.log("🔍 useEffect 실행 시작...");
    console.log("📋 Supabase 클라이언트 상태:", supabase ? "초기화됨" : "초기화되지 않음");
    
    fetchEventStatistics();
    fetchFeedbackStatistics();
  }, []);

  return (
    <div className="event-db-root">
      <Header onPageChange={onPageChange} />
      <div className="event-db-content">
        {/* Main Content Area */}
        <div className="event-db-main-content">
          {/* First Row */}
          <div className="event-db-first-row">
            {/* Existing Events Section */}
            <section className="event-db-section existing-events-section">
              <div className="section-header">
                <h2 className="section-title">Existing Events</h2>
              </div>
              <div className="existing-events-list">
                {existingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="event-item"
                    onMouseEnter={() => setHoveredEvent(event.name)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: hoveredEvent === event.name ? 'scale(1.05)' : 'scale(1)',
                      backgroundColor: hoveredEvent === event.name ? '#f0f2ff' : 'transparent',
                      color: hoveredEvent === event.name ? '#7180CB' : '#666'
                    }}
                  >
                    <span className="event-name">{event.name}</span>
                  </div>
                ))}
                {selectedEvent && (
                  <div 
                    className="event-item selected-event tooltip-container"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <span className="event-name selected-event-name">
                      선택된 데모 이벤트: {selectedEvent.label}
                    </span>
                    {showTooltip && (
                      <div className="custom-tooltip">
                        <div className="tooltip-content">
                          {selectedEvent.value}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Event Statistics Section */}
            <section className="event-db-section statistics-section">
              <div className="section-header">
                <h2 className="section-title">Detected Event Statistics </h2>
                <p className="section-subtitle">Analyze a store environment using frequency</p>
              </div>
              <div className="statistics-content">
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>이벤트 통계를 불러오는 중...</p>
                  </div>
                ) : error ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                    <p>오류가 발생했습니다: {error}</p>
                    <button onClick={fetchEventStatistics} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                      다시 시도
                    </button>
                  </div>
                ) : eventStatistics.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>통계 데이터가 없습니다.</p>
                  </div>
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
                        activeIndex={eventStatistics.findIndex(entry => hoveredEvent === entry.name)}
                        activeShape={{
                          outerRadius: 140,
                          stroke: "#ffffff",
                          strokeWidth: 3
                        }}
                      >
                        {eventStatistics.map((entry, index) => {
                          const isHovered = hoveredEvent === entry.name;
                          const isNotHovered = hoveredEvent && hoveredEvent !== entry.name;
                          
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                isHovered 
                                  ? COLORS[index % COLORS.length] // 호버된 이벤트는 원래 색상
                                  : isNotHovered 
                                    ? "#e0e0e0" // 호버되지 않은 이벤트는 회색
                                    : COLORS[index % COLORS.length] // 호버가 없을 때는 원래 색상
                              }
                              style={{
                                filter: isHovered ? 'brightness(1.2)' : isNotHovered ? 'brightness(0.7)' : 'brightness(1)',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          );
                        })}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value}회`, name]}
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
                        payload={eventStatistics.map((entry, index) => {
                          const isHovered = hoveredEvent === entry.name;
                          const isNotHovered = hoveredEvent && hoveredEvent !== entry.name;
                          
                          return {
                            value: entry.name,
                            type: "circle",
                            color: isHovered 
                              ? COLORS[index % COLORS.length]
                              : isNotHovered 
                                ? "#e0e0e0"
                                : COLORS[index % COLORS.length],
                            style: {
                              opacity: isNotHovered ? 0.5 : 1,
                              transition: 'all 0.3s ease'
                            }
                          };
                        })}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </section>
          </div>

          {/* Second Row */}
          <div className="event-db-second-row">
            {/* Model Feedback Section */}
            <section className="event-db-section feedback-section">
              <div className="section-header">
                <h2 className="section-title">Model Feedback</h2>
                <p className="section-subtitle">Evaluate and analyze model performance by user feedback</p>
              </div>
              <div className="feedback-content">
                {feedbackLoading ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>모델 피드백 통계를 불러오는 중...</p>
                  </div>
                ) : feedbackError ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                    <p>오류가 발생했습니다: {feedbackError}</p>
                    <button onClick={fetchFeedbackStatistics} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                      다시 시도
                    </button>
                  </div>
                ) : feedbackStatistics.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>피드백 데이터가 없습니다.</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={feedbackStatistics}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [`${value}개`, name]}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      {/* <Legend 
                        wrapperStyle={{ 
                          fontSize: "14px",
                          fontFamily: '"Space Grotesk", "Noto Sans", sans-serif'
                        }}
                      /> */}
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]}
                      >
                        {feedbackStatistics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDB; 