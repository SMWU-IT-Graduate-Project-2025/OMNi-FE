import React, { useContext, useState, useEffect } from "react";
import "./AlertHistory.css";
import Header from "../components/Header";
import { StoreContext } from "../StoreContext";
import ClipModal from "../components/ClipModal";
import supabase from "../lib/supabase";

console.log("📄 AlertHistory: 전역 Supabase 클라이언트 사용");




// Fallback 데이터 (데이터베이스 연결 실패 시 사용)
const FALLBACK_ALERTS = [
    {
      id: 1,
      time: "10:03 PM",
      type: "실내흡연",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrum01m46BXlnCB4gnxa_DJU5U8FsGiJEzhz1_smTRrpSTvxViK1swoF_SWk35P8etIKm1AOxs4icS-54zBOOur9rvu0o2S9XTubBIJ4Ql8TVka3oWp57J46UGQA__avvdETO6kdtDm37UMaLjpLEsReKXj5HfQ0msvgAVb2-jUoQ6DFL9ZTYgHAJPnHzw7hPv3jVCYYRewT9VwCyGD3tJJNr4XG4IUGQPm3MSncCTz0rIZwBhUxzWDmBMASPHXnofe7Qp-UVPRlw",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2NDksImV4cCI6MTc1ODk0MjY0OX0.9s2bF5Z8dHR5mybya9LA42Mw2QAAoAGxaPJUgGXOSWg", 
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/smoking-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3Ntb2tpbmctMS5tcDQiLCJpYXQiOjE3NTYzNTE4NjUsImV4cCI6MTc1ODk0Mzg2NX0.EvCFTB24qAEFgr-grDLR9I0LTV2RkQuYQbQNfwX448w",
    feedback: null,
    occurredAt: new Date().toISOString()
    },
    {
      id: 2,
      time: "11:47 AM",
      type: "쓰러짐",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWpSKcLeuxWkEL1HkTfCuJ6v4ktpGKRvtyKfjPTLuq-509RYDsFo2IsZHgS18wXnXyrOY0wRSKooMiPkhRwS3ZNTKo6o3Fo8LUeoij1gtRKcTk7IxzB1b7_D-eKoBminJd0kKPSPugkKK92TIZ73Cj1xifuInN4NFAnZM0Q8nDJ8B1T7_6MXkt3BIor9bJL0mTqiUg43D3Ot8Pu8XfY3fKctqy4Cmb-oeDS8G4mcElifTlx4clMXJXz13JEROOSkfdZrNGoCqL2rM",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS1pbWFnZS5wbmciLCJpYXQiOjE3NTYzNTA2MzcsImV4cCI6MTc1ODk0MjYzN30.9uehBKfO8aHOWveVlxk-BXYvTfgoK5zk06_39pdzfPo",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/fall-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2ZhbGwtMS5tcDQiLCJpYXQiOjE3NTYzNTE4NTAsImV4cCI6MTc1ODk0Mzg1MH0.U8BzbqndzV0ZVp_NRZvN5Rt8-e8SAMmaqJLV7U7BhgU",
    feedback: null,
    occurredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 어제
    },
    {
      id: 3,
      time: "10:55 AM",
      type: "파손손상",
      description: "camera #2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxCFNVvt152j6wYZgr4YTMH4VgkNbzHWK_i4lQv7nYT9EMH2WFvxoqf7MAWuY1UAk539WtfbuHuo5I_VmB_0ZomUcvlrPvhDi2JZKCMW7LLnJZVp2kl4L_DbWCyC2eUby_H22Rb3COG-lWrCXiitRd-p3flZ72WTC0vEJmJmC2xP76E83fMMT3X1D9eHHQGpw65YLOYN3UcQTAbUoAZ_HKfxXYQsWZEyx6LATBGyIc1b-AORU1aW1wl2fKZvVIJkBOp6Q7yo_EUHc",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLWltYWdlLnBuZyIsImlhdCI6MTc1NjM1MDYwOCwiZXhwIjoxNzU4OTQyNjA4fQ._xhs8Nb5vcsBvQQQD4VGbmGX4z87oN2A7lUoCNdcmuQ", 
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/damage-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2RhbWFnZS0xLm1wNCIsImlhdCI6MTc1NjM1MTgzNCwiZXhwIjoxNzU4OTQzODM0fQ.brd2-X3qWU0OzFSeblH95h5vwEnti-f7oNSIVBv3G1Y",
    feedback: null,
    occurredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 이틀 전
    },
    {
      id: 4,
      time: "02:38 AM",
      type: "절도도난",
      description: "camera #2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgATzq8jv--hx3YZKcPAqopLCBb9ZxTObm5iufsGoHhN0hdt1So5Y47bTDN45wnQ9_7qcdRp9XLAFVEwPMxhY_iuVVTq--tH9MX3gAMf2XwJSV8IGIIzK31ONgf018-1REd1ijRPq0Yp4e5QY8bnHBii8Uvut4kA0F0Jwt20VTgyB32VY_INgz9xz0P-IGTEsjgue2wsxlpJ1hcriBde7GyCZdv6qwQ5s365QdTnpnSpzExo5kfqEAqYPOfDE_2Ec0oDzZr16Ta8k",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUwMjY5LCJleHAiOjE3NTg5NDIyNjl9.gPHHFnp9pK4Q_Ypvm6o4QvYX2n2ozYYKIUwIcSAhHgw", 
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/theft-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL3RoZWZ0LTEubXA0IiwiaWF0IjoxNzU2MzUxODEzLCJleHAiOjE3NTg5NDM4MTN9.lq8evAmNAN_YKjzPFKk8lSeIA5DS3kHUuqTMqVvcxXo",
    feedback: null,
    occurredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 사흘 전
    },
    {
      id: 5,
      time: "4:55 PM",
      type: "유기방치",
      description: "camera #1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMranBlAhOxWBXSscKT0hL_dK0qI0SQWr_160O-RcYnpOojOxO6lV2FVBk0QARGHo5zyuwGIHybvGgAYidvPl9BADSNjsvPyrvVdMiYcT8jokvvobEgNztrA3bGDdxJdOsV17kfSQR9pQEHa1ZmL0wWtXz0kTiHJ7U57iM7uH0yn1-Q0zgDhgdCfudsyIxxBnqJfDaBkf38T15XlchgGD9IRc3mzN4DTn1Nlvf5ListlHK_6Gg9QaNk2h03k06vzWeqq5260AEiks",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2FiYW5kb25tZW50LTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUzNjAzLCJleHAiOjE3NTg5NDU2MDN9.2F9gwzcoRxkS1pYZ0ths_O-VBuHBDCJDZaLPUFSvpAg",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/abandonment-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2FiYW5kb25tZW50LTEubXA0IiwiaWF0IjoxNzU2MzUzNjg1LCJleHAiOjE3NTg5NDU2ODV9.OcDYCAN7x9mxJhn95Ju7nPvmIxmk5befyy4UWLAA54w",
    feedback: null,
    occurredAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 나흘 전
    },
    {
      id: 6,
      time: "3:30 PM",
      type: "방화",
      description: "camera #3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoFKpstcaMqvJwnc_-bxRXZYsiH2mLjlTLFiIRDytxgVBKxgqw2k-spbNzAQZwPQQBapKBgX2s75pXpxm3kBG9sySmZAtgG-yXvAeqkctLOrh_FpZNr_8K9MCUR3VdZLpIwzVaInmJ3K1bNyrEoOI1eUmqka_8RY1d7oUCwxOIR4RxCAQkcfFv-nun4vzuKXiRNXi5z5ILJRuzVHYq_u2h8Wfy5V4eUUSVIW5QmaOOySM_lrCkZa9GyDfqBGU3XCr-ubG75HiNqF0",
      thumbUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/arson-1-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2Fyc29uLTEtaW1hZ2UucG5nIiwiaWF0IjoxNzU2MzUzNzEzLCJleHAiOjE3NTg5NDU3MTN9.ducr0LumDQQmV-VLeerQvagoLE9ayNRmuHvztt0Rxkg",
      videoUrl: "https://cspfqqyuamxurtsvgypt.supabase.co/storage/v1/object/sign/existing-samples/arson-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YzFkNmZkMC02ZWYzLTQ0ZWEtOWYxZS03ZTQ0ZjkxNGEwNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJleGlzdGluZy1zYW1wbGVzL2Fyc29uLTEubXA0IiwiaWF0IjoxNzU2MzUzNzUzLCJleHAiOjE3NTg5NDU3NTN9.KGSTsnXQCmnH0s0qx_Odb-tT17WZlYcMVcHsNtpM5fk",
    feedback: null,
    occurredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 닷새 전
  }
];

const AlertHistory = ({ onPageChange }) => {
  const { storeName } = useContext(StoreContext);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  
  // 데이터베이스에서 알림 데이터 가져오기
  const fetchAlerts = async () => {
    console.log("\n" + "=".repeat(50));
    console.log("📊 알림 데이터 가져오기 시작");
    console.log("=".repeat(50));
    
    if (!supabase) {
      console.warn("⚠️ Supabase 클라이언트가 초기화되지 않았습니다.");
      console.log("📋 Fallback 데이터를 사용합니다.");
      console.log("=".repeat(50) + "\n");
      setAlerts(FALLBACK_ALERTS);
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      console.log("🔍 데이터베이스 쿼리 실행 중...");
      console.log("📋 쿼리 정보:");
      console.log("   - 테이블: alerts (전체 레코드)");
      console.log("   - 조인: events, cameras, alert_media, alert_feedback");
      console.log("   - 정렬: occurred_at DESC (최신순)");
      
      const startTime = Date.now();

      // alerts 테이블 전체 레코드를 occurred_at 기준 내림차순으로 가져오기
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          *,
          events!inner (
            id,
            name,
            name_ko,
            description
          ),
          cameras (id, type, enabled),
          alert_media (
            id,
            thumbnail_url,
            clip_url,
            start_ts,
            end_ts
          ),
          alert_feedback (
            id,
            label
          )
        `)
        .order('occurred_at', { ascending: false }); // 최근 순으로 정렬 (상단에 최신 알림 표시)

      const endTime = Date.now();
      const queryTime = endTime - startTime;

      if (error) {
        console.error("❌ 데이터베이스 쿼리 실패:");
        console.error("   - 오류 코드:", error.code);
        console.error("   - 오류 메시지:", error.message);
        console.error("   - 상세 정보:", error.details);
        throw error;
      }

      console.log("✅ 데이터베이스 쿼리 성공!");
      console.log("📊 쿼리 결과:");
      console.log("   - 실행 시간:", queryTime + "ms");
      console.log("   - 조회된 레코드 수:", data ? data.length : 0);

      // 데이터가 없거나 빈 배열인 경우 fallback 사용
      if (!data || data.length === 0) {
        console.warn("⚠️ 데이터베이스에서 데이터를 찾을 수 없습니다.");
        console.log("📋 Fallback 데이터를 사용합니다.");
        console.log("=".repeat(50) + "\n");
        setAlerts(FALLBACK_ALERTS);
        setUsingFallback(true);
        return;
      }

      console.log("🔄 데이터 변환 중...");
      
      // 데이터를 UI에 맞게 변환 (event_id를 통해 events.name_ko로 이벤트 타입 매칭)
      const formattedAlerts = data.map(alert => {
        const media = alert.alert_media?.[0]; // 첫 번째 미디어 사용
        const feedback = alert.alert_feedback?.[0]; // 첫 번째 피드백 사용
        const event = alert.events; // event_id를 통해 조인된 events 테이블 데이터
        const camera = alert.cameras; // camera_id를 통해 조인된 cameras 테이블 데이터
        
        const occurredDate = new Date(alert.occurred_at);
        
        // 한국어 요일 매핑
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const weekday = weekdays[occurredDate.getDay()];
        
        // 날짜 형식: 2025-09-11 (목)
        const dateStr = occurredDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedDate = `${dateStr} (${weekday})`;
        
        // 시간 형식: 16:15 (24시간 형식)
        const timeStr = occurredDate.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        
        return {
          id: alert.id,
          time: timeStr,
          date: formattedDate,
          type: event?.name_ko || event?.name || "알 수 없는 이벤트", // event_id → events.name_ko 매칭
          description: `camera #${alert.camera_id || '0'} `,
          image: media?.thumbnail_url || "https://via.placeholder.com/150x100?text=No+Image",
          thumbUrl: media?.thumbnail_url,
          videoUrl: media?.clip_url,
          feedback: feedback?.label || null,
          occurredAt: alert.occurred_at,
          maxScore: alert.max_score,
          eventId: alert.event_id,
          cameraId: alert.camera_id,
          orgId: alert.org_id
        };
      });

      console.log("✅ 데이터 변환 완료!");
      console.log("📊 변환된 데이터:");
      console.log("   - 총 알림 수:", formattedAlerts.length);
      
      // cameras 레코드 상태 확인
      const camerasWithData = formattedAlerts.filter(alert => alert.description.includes('(-)') === false);
      const camerasWithoutData = formattedAlerts.filter(alert => alert.description.includes('(-)'));
      
      console.log("   - 카메라 정보 상태:");
      console.log(`     - 카메라 정보 있음: ${camerasWithData.length}개`);
      console.log(`     - 카메라 정보 없음: ${camerasWithoutData.length}개`);
      
      console.log("   - 이벤트 타입별 분포:");
      
      // 이벤트 타입별 통계
      const eventTypeStats = {};
      formattedAlerts.forEach(alert => {
        eventTypeStats[alert.type] = (eventTypeStats[alert.type] || 0) + 1;
      });
      
      Object.entries(eventTypeStats).forEach(([type, count]) => {
        console.log(`     - ${type}: ${count}개`);
      });
      
      console.log("📋 상태: 정상 모드로 동작");
      console.log("=".repeat(50) + "\n");

      setAlerts(formattedAlerts);
      setUsingFallback(false);
    } catch (err) {
      console.error("❌ 알림 데이터 가져오기 중 오류 발생:");
      console.error("   - 오류 타입:", err.name);
      console.error("   - 오류 메시지:", err.message);
      console.error("   - 스택 트레이스:", err.stack);
      console.log("📋 Fallback 데이터를 사용합니다.");
      console.log("=".repeat(50) + "\n");
      
      // 에러 발생 시 fallback 데이터 사용
      setAlerts(FALLBACK_ALERTS);
      setUsingFallback(true);
      setError(`데이터베이스 연결 실패: ${err.message}. Fallback 데이터를 표시합니다.`);
    } finally {
      setLoading(false);
    }
  };


  // 피드백 처리 함수
  const handleFeedback = async (alertId, feedback) => {
    // 로컬 상태 업데이트 (항상 실행)
    setAlerts(prev =>
        prev.map(alert =>
        alert.id === alertId ? { ...alert, feedback } : alert
      )
    );

    // Fallback 모드이거나 Supabase가 없는 경우 로컬 상태만 업데이트
    if (usingFallback || !supabase) {
      console.log(`Fallback 모드: 피드백 "${feedback}"이 로컬에만 저장됩니다.`);
      return;
    }

    try {
      console.log(`🔍 피드백 저장 시도: alert_id=${alertId}, feedback="${feedback}"`);
      
      // 기존 피드백이 있는지 확인
      const { data: existingFeedback, error: selectError } = await supabase
        .from('alert_feedback')
        .select('id')
        .eq('alert_id', alertId)
        .single();

      if (selectError && selectError.code !== 'PGRST116') { // PGRST116은 "no rows returned" 오류
        console.error('기존 피드백 조회 중 오류:', selectError);
        throw selectError;
      }

      if (existingFeedback) {
        console.log('기존 피드백 업데이트 중...');
        // 기존 피드백 업데이트
        const { error } = await supabase
          .from('alert_feedback')
          .update({ label: feedback })
          .eq('alert_id', alertId);

        if (error) {
          console.error('피드백 업데이트 오류:', error);
          throw error;
        }
        console.log('✅ 피드백 업데이트 성공');
    } else {
        console.log('새 피드백 생성 중...');
        // 새 피드백 생성
        const { error } = await supabase
          .from('alert_feedback')
          .insert({
            alert_id: alertId,
            label: feedback
          });

        if (error) {
          console.error('피드백 생성 오류:', error);
          throw error;
        }
        console.log('✅ 피드백 생성 성공');
      }

      console.log(`✅ 피드백 "${feedback}"이 데이터베이스에 저장되었습니다.`);

    } catch (err) {
      console.error('❌ 피드백 저장 중 오류 발생:', err);
      console.error('   - 오류 코드:', err.code);
      console.error('   - 오류 메시지:', err.message);
      console.error('   - 상세 정보:', err.details);
      console.warn('⚠️ 피드백은 로컬에만 저장되었습니다.');
      
      // RLS 정책 관련 오류인 경우 추가 안내
      if (err.code === '42501') {
        console.warn('🔐 Row Level Security (RLS) 정책으로 인해 피드백 저장이 차단되었습니다.');
        console.warn('💡 해결 방법:');
        console.warn('   1. Supabase 대시보드에서 alert_feedback 테이블의 RLS 정책 확인');
        console.warn('   2. INSERT/UPDATE 권한이 있는지 확인');
        console.warn('   3. 또는 Service Role Key 사용 (개발 환경에서만)');
      }
    }
  };

  // Supabase 연결 테스트 함수
  const testSupabaseConnection = async () => {
    console.log("\n" + "=".repeat(30));
    console.log("🔍 데이터베이스 연결 테스트 시작");
    console.log("=".repeat(30));
    
    if (!supabase) {
      console.log("❌ Supabase 클라이언트가 초기화되지 않음");
      console.log("📋 상태: Fallback 모드로 동작");
      console.log("=".repeat(30) + "\n");
      return false;
    }

    try {
      console.log("📍 연결 정보:");
      console.log("   - URL:", supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "없음");
      console.log("   - Key:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "없음");
      console.log("   - 테스트 테이블: events");
      
      const startTime = Date.now();
      
      // 간단한 연결 테스트 (events 테이블 조회)
      const { data, error } = await supabase
        .from('events')
        .select('id, name, name_ko')
        .limit(1);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (error) {
        console.error("❌ 데이터베이스 연결 실패:");
        console.error("   - 오류 코드:", error.code);
        console.error("   - 오류 메시지:", error.message);
        console.error("   - 상세 정보:", error.details);
        console.log("📋 상태: Fallback 모드로 동작");
        console.log("=".repeat(50) + "\n");
        return false;
      }

      console.log("✅ 데이터베이스 연결 성공!");
      console.log("📊 연결 정보:");
      console.log("   - 응답 시간:", responseTime + "ms");
      console.log("   - 테스트 결과:", data ? `${data.length}개 레코드 조회` : "데이터 없음");
      if (data && data.length > 0) {
        console.log("   - 샘플 데이터:", data[0]);
      }
      console.log("📋 상태: 정상 모드로 동작");
      console.log("=".repeat(50) + "\n");
      return true;
    } catch (err) {
      console.error("❌ 연결 테스트 중 예외 발생:");
      console.error("   - 오류 타입:", err.name);
      console.error("   - 오류 메시지:", err.message);
      console.error("   - 스택 트레이스:", err.stack);
      console.log("📋 상태: Fallback 모드로 동작");
      console.log("=".repeat(50) + "\n");
      return false;
    }
  };

  // 테이블 권한 확인 함수
  const checkTablePermissions = async () => {
    console.log("\n" + "=".repeat(50));
    console.log("🔐 테이블 조회 권한 확인 시작");
    console.log("=".repeat(50));
    
    const tables = [
      { name: 'alerts', description: '알림 데이터' },
      { name: 'events', description: '이벤트 타입' },
      { name: 'cameras', description: '카메라 정보' },
      { name: 'alert_media', description: '알림 미디어' },
      { name: 'alert_feedback', description: '알림 피드백' }
    ];
    
    const permissionResults = {};
    
    for (const table of tables) {
      try {
        console.log(`🔍 ${table.name} 테이블 권한 확인 중...`);
        const startTime = Date.now();
        
        const { data, error } = await supabase
          .from(table.name)
          .select('*')
          .limit(1);
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (error) {
          console.error(`❌ ${table.name} 테이블 접근 실패:`);
          console.error(`   - 오류 코드: ${error.code}`);
          console.error(`   - 오류 메시지: ${error.message}`);
          console.error(`   - 상세 정보: ${error.details}`);
          permissionResults[table.name] = {
            success: false,
            error: error,
            responseTime: responseTime
          };
        } else {
          console.log(`✅ ${table.name} 테이블 접근 성공!`);
          console.log(`   - 응답 시간: ${responseTime}ms`);
          console.log(`   - 샘플 데이터: ${data && data.length > 0 ? '있음' : '없음'}`);
          if (data && data.length > 0) {
            console.log(`   - 샘플 레코드:`, data[0]);
          }
          permissionResults[table.name] = {
            success: true,
            data: data,
            responseTime: responseTime
          };
        }
      } catch (err) {
        console.error(`❌ ${table.name} 테이블 권한 확인 중 예외 발생:`);
        console.error(`   - 오류 타입: ${err.name}`);
        console.error(`   - 오류 메시지: ${err.message}`);
        permissionResults[table.name] = {
          success: false,
          error: err,
          responseTime: 0
        };
      }
    }
    
    console.log("\n📊 권한 확인 결과 요약:");
    console.log("=".repeat(30));
    Object.entries(permissionResults).forEach(([tableName, result]) => {
      const status = result.success ? "✅ 성공" : "❌ 실패";
      const time = result.responseTime ? `${result.responseTime}ms` : "N/A";
      console.log(`   ${tableName}: ${status} (${time})`);
    });
    
    const successCount = Object.values(permissionResults).filter(r => r.success).length;
    const totalCount = Object.keys(permissionResults).length;
    
    console.log(`\n📋 전체 결과: ${successCount}/${totalCount} 테이블 접근 가능`);
    console.log("=".repeat(50) + "\n");
    
    return permissionResults;
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    console.log("\n" + "=".repeat(50));
    console.log("🚀 AlertHistory 컴포넌트 마운트됨");
    console.log("=".repeat(50));
    console.log("🔍 useEffect 실행 시작...");
    console.log("📋 Supabase 클라이언트 상태:", supabase ? "초기화됨" : "초기화되지 않음");
    
    // 직접 연결 테스트 실행
    const runConnectionTest = async () => {
      console.log("\n" + "=".repeat(50));
      console.log("🔍 데이터베이스 연결 테스트 시작");
      console.log("=".repeat(50));
      
      if (!supabase) {
        console.log("❌ Supabase 클라이언트가 초기화되지 않음");
        console.log("📋 상태: Fallback 모드로 동작");
        console.log("=".repeat(50) + "\n");
        fetchAlerts();
        return false;
      }

      try {
        console.log("📍 연결 정보:");
        console.log("   - URL:", supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "없음");
        console.log("   - Key:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "없음");
        console.log("   - 테스트 테이블: events");
        
        const startTime = Date.now();
        
        // 간단한 연결 테스트 (events 테이블 조회)
        const { data, error } = await supabase
          .from('events')
          .select('id, name, name_ko')
          .limit(1);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (error) {
          console.error("❌ 데이터베이스 연결 실패:");
          console.error("   - 오류 코드:", error.code);
          console.error("   - 오류 메시지:", error.message);
          console.error("   - 상세 정보:", error.details);
          console.log("📋 상태: Fallback 모드로 동작");
          console.log("=".repeat(50) + "\n");
          fetchAlerts();
          return false;
        }

        console.log("✅ 데이터베이스 연결 성공!");
        console.log("📊 연결 정보:");
        console.log("   - 응답 시간:", responseTime + "ms");
        console.log("   - 테스트 결과:", data ? `${data.length}개 레코드 조회` : "데이터 없음");
        if (data && data.length > 0) {
          console.log("   - 샘플 데이터:", data[0]);
        }
        console.log("📋 상태: 정상 모드로 동작");
        console.log("=".repeat(50) + "\n");
        
        // 테이블 권한 확인 후 데이터 가져오기
        const permissionResults = await checkTablePermissions();
        const criticalTables = ['alerts', 'events', 'cameras'];
        const criticalTableAccess = criticalTables.every(table => permissionResults[table]?.success);
        
        if (!criticalTableAccess) {
          console.warn("⚠️ 필수 테이블 접근 권한이 없습니다. Fallback 모드로 전환합니다.");
          fetchAlerts();
          return false;
        }
        
        console.log("✅ 모든 필수 테이블 접근 권한 확인 완료!");
        fetchAlerts();
        return true;
      } catch (err) {
        console.error("❌ 연결 테스트 중 예외 발생:");
        console.error("   - 오류 타입:", err.name);
        console.error("   - 오류 메시지:", err.message);
        console.error("   - 스택 트레이스:", err.stack);
        console.log("📋 상태: Fallback 모드로 동작");
        console.log("=".repeat(50) + "\n");
        fetchAlerts();
        return false;
      }
    };

    // 연결 테스트 실행
    runConnectionTest();
  }, []);

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

  // 날짜별로 알림을 그룹화하는 함수 (occurred_at 기준으로 이미 정렬된 데이터 사용)
  const groupAlertsByDate = (alerts) => {
    console.log("\n" + "=".repeat(50));
    console.log("📅 알림 그룹핑 시작");
    console.log("=".repeat(50));
    console.log("📊 입력 데이터:", alerts.length, "개");
    
    if (alerts.length > 0) {
      console.log("🔍 첫 번째 알림 데이터 샘플:");
      console.log("   - ID:", alerts[0].id);
      console.log("   - occurredAt:", alerts[0].occurredAt);
      console.log("   - type:", alerts[0].type);
      console.log("   - description:", alerts[0].description);
    }
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    console.log("📅 날짜 기준:");
    console.log("   - 오늘:", today.toDateString());
    console.log("   - 어제:", yesterday.toDateString());
    console.log("   - 이번 달 시작:", thisMonth.toDateString());
    
    const groups = {
      today: [],
      yesterday: [],
      thisMonth: [],
      older: [] // 이번 달 이전 데이터를 위한 그룹 추가
    };
    
    // occurred_at 기준으로 내림차순 정렬된 데이터를 날짜별로 그룹화
    alerts.forEach((alert, index) => {
      const alertDate = new Date(alert.occurredAt);
      
      console.log(`🔍 알림 ${index + 1} 처리:`, alertDate.toDateString());
      
      if (alertDate.toDateString() === today.toDateString()) {
        groups.today.push(alert);
        console.log("   → 오늘 그룹에 추가");
      } else if (alertDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(alert);
        console.log("   → 어제 그룹에 추가");
      } else if (alertDate >= thisMonth && alertDate.toDateString() !== today.toDateString() && alertDate.toDateString() !== yesterday.toDateString()) {
        groups.thisMonth.push(alert);
        console.log("   → 이번 달 그룹에 추가");
      } else {
        groups.older.push(alert);
        console.log("   → 이전 데이터 그룹에 추가");
      }
    });
    
    console.log("📊 그룹핑 결과:");
    console.log("   - 오늘:", groups.today.length, "개");
    console.log("   - 어제:", groups.yesterday.length, "개");
    console.log("   - 이번 달:", groups.thisMonth.length, "개");
    console.log("   - 이전 데이터:", groups.older.length, "개");
    console.log("=".repeat(50) + "\n");
    
    return groups;
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
            <p className="alert-description">{alert.description}</p>
            {/* <p className="alert-time">{alert.date} | {alert.time}</p> */}
            <p className="alert-type">{alert.type}</p>
            
            <p className="alert-date">{alert.date} | {alert.time}</p>
          </div>
          <div
            className="alert-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>

          <div className="alert-feedback">
          {alert.feedback ? (
            <span>
              {alert.feedback === "good" ? "☑️ 정상 탐지 확인됨" : "🚩 오탐 의견 제출되었습니다."}
            </span>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedback(alert.id, "good");
                }}
              >
                👍 Good
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedback(alert.id, "bad");
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

  // 데이터를 날짜별로 그룹화
  const groupedAlerts = groupAlertsByDate(alerts);

  return (
    <div className="alert-history-root">
      <Header onPageChange={onPageChange} />
      <div className="alert-history-content">
        <div className="alert-header-section">
          <div className="alert-header-text">
            <p className="alert-main-title">Alerts</p>
            <p className="alert-subtitle">Review and manage triggered alarms</p>
            {usingFallback && (
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '1rem', 
                backgroundColor: '#fff3cd', 
                border: '1px solid #ffeaa7', 
                borderRadius: '4px',
                fontSize: '0.9rem',
                color: '#856404'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  ⚠️ 데이터베이스 연결이 불가능하여 샘플 데이터를 표시합니다.
                </div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  문제를 확인하고 개발 서버를 재시작 하세요.
                </div>
              </div>
            )}
          </div>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>알림 데이터를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <p>오류가 발생했습니다: {error}</p>
            <button onClick={fetchAlerts} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
              다시 시도
            </button>
          </div>
        ) : (
          <>
            {groupedAlerts.today.length > 0 && (
              <>
                <h3 className="alert-section-title">Today ({groupedAlerts.today.length})</h3>
                <div className="alert-list">
                  {groupedAlerts.today.map(alert => renderAlertItem(alert))}
                </div>
              </>
            )}

            {groupedAlerts.yesterday.length > 0 && (
              <>
                <h3 className="alert-section-title">Yesterday ({groupedAlerts.yesterday.length})</h3>
                <div className="alert-list">
                  {groupedAlerts.yesterday.map(alert => renderAlertItem(alert))}
                </div>
              </>
            )}

            {groupedAlerts.thisMonth.length > 0 && (
              <>
                <h3 className="alert-section-title">This Month ({groupedAlerts.thisMonth.length})</h3>
        <div className="alert-list">
                  {groupedAlerts.thisMonth.map(alert => renderAlertItem(alert))}
        </div>
              </>
            )}

            {groupedAlerts.older.length > 0 && (
              <>
                <h3 className="alert-section-title">Earlier ({groupedAlerts.older.length})</h3>
        <div className="alert-list">
                  {groupedAlerts.older.map(alert => renderAlertItem(alert))}
                </div>
              </>
            )}

            {alerts.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>표시할 알림이 없습니다.</p>
        </div>
            )}
          </>
        )}
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