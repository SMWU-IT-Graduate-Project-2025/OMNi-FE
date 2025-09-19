import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트를 전역적으로 초기화
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("🔧 전역 Supabase 초기화 시작...");
console.log("📍 Supabase URL:", supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "❌ 설정되지 않음");
console.log("🔑 Supabase Key:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "❌ 설정되지 않음");

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("✅ 전역 Supabase 클라이언트 초기화 성공!");
    
    // 연결 테스트
    testConnection();
  } catch (error) {
    console.error("❌ 전역 Supabase 클라이언트 초기화 실패:", error);
  }
} else {
  console.warn("⚠️ Supabase 환경 변수가 설정되지 않았습니다. Fallback 모드로 동작합니다.");
}

// 연결 테스트 함수
async function testConnection() {
  try {
    console.log("🔍 전역 Supabase 연결 테스트 시작...");
    const { data, error } = await supabase
      .from('events')
      .select('id, name, name_ko')
      .limit(1);

    if (error) {
      console.error("❌ 전역 Supabase 연결 테스트 실패:", error);
    } else {
      console.log("✅ 전역 Supabase 연결 테스트 성공!");
      console.log("📊 테스트 결과:", data ? `${data.length}개 레코드 조회` : "데이터 없음");
    }
  } catch (err) {
    console.error("❌ 전역 Supabase 연결 테스트 중 오류:", err);
  }
}

export default supabase;
