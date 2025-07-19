# OMNi Frontend

OMNi는 카메라 기반 이벤트 감지 시스템을 위한 현대적인 웹 인터페이스입니다.

## 기능

#### **✋ INITIAL PAGE**
- 매장 이름 등록
- 매장별 감지할 이벤트 설명문 입력
- 카메라 연결

#### **👀 MAIN/Monitoring PAGE**
- 온라인 영상 스트림
- 감지된 이벤트에 대한 알람

## 기술 스택

- React 18
- TypeScript
- Vite
- CSS3 

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

## 디자인 특징

- 대각선 배경 레이아웃
- 3D 카메라 그래픽
- 실시간 입력 상태 표시
- 반응형 디자인
- 부드러운 애니메이션 효과
