# OMNi Frontend

## 기술 스택

- React 18
- JavaScript
- Vite
- CSS3 

## 주요 기능

#### **✋ INITIAL PAGE**
- 매장 이름 등록
- 매장별 감지할 이벤트 설명문 입력
- 카메라 연결 및 모니터링 진입 버튼

#### **🫵 MAIN PAGE**
- 온라인 영상 스트림 (Monitoring target)
- 감지된 이벤트에 대한 알람
- 최근 감지된 이벤트 구간 미리보기

#### **👉 Alert History**
- 감지된 이벤트 구간 로그
- 감지된 이벤트 구간 평가 (Feedback for continuous learning)

#### **✋ Event History**
- 새로 감지할 이벤트 등록
- 발생한 이벤트 분석 대시보드


## 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── App.tsx          # 메인 애플리케이션 컴포넌트
├── App.css          # 애플리케이션 스타일
├── main.tsx         # 애플리케이션 진입점
└── index.css        # 전역 스타일
```
