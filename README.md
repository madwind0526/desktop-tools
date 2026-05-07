# 🔧 Desktop Tools

한국어 기반 데스크탑 유틸리티 앱 — Electron으로 제작

![Platform](https://img.shields.io/badge/platform-Windows-blue)
![Electron](https://img.shields.io/badge/Electron-28-47848F?logo=electron)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📦 다운로드 (설치 불필요)

👉 **[최신 버전 다운로드](https://github.com/madwind0526/desktop-tools/releases/latest)**

1. `Desktop-Tools-win32-x64.zip` 다운로드
2. 압축 해제
3. `Desktop-Tools.exe` 실행

> Windows 10 이상 (x64) 필요

---

## 🛠️ 포함 도구

| 도구 | 설명 |
|------|------|
| 🧮 **계산기** | 일반 / 공학 모드, 키보드 지원, 계산 이력 |
| 💱 **환율 변환기** | 실시간 환율 (23개 통화), KRW 기준 |
| 📏 **도량형 변환기** | 길이·넓이·부피·무게·온도·속도·진수 변환 |
| 📅 **D-Day 계산기** | 경과일 / 남은일 / 날짜 오프셋 계산 |
| 🌙 **음력/양력 변환기** | 양력↔음력 상호 변환, 간지·띠 표시 |
| ⏰ **알람 / 타이머** | 세그먼트 방식 타이머, 다중 알람 관리 |

---

## ✨ 주요 기능

- 🌙 **다크 / 라이트 모드** 토글 (사이드바 하단)
- ⌨️ **키보드 단축키** 지원 (계산기, 타이머 등)
- 💾 **설정 자동 저장** (알람, 테마 등 localStorage 유지)
- 🖥️ **프레임리스 윈도우** (커스텀 타이틀바)

---

## 🚀 개발 환경 실행

### 사전 요구사항
- [Node.js](https://nodejs.org) 18 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/madwind0526/desktop-tools.git
cd desktop-tools

# 패키지 설치
npm install

# 개발 모드 실행
npm run dev
```

### Windows 실행파일 빌드

```bash
npx electron-packager . "Desktop-Tools" --platform=win32 --arch=x64 --out=dist-packager --ignore="^/dist$" --ignore="^/dist-packager" --ignore="^/\.git"
```

---

## 🏗️ 프로젝트 구조

```
desktop-tools/
├── electron/
│   ├── main.js          # Electron 메인 프로세스
│   └── preload.js       # Context Bridge
├── server/
│   └── server.js        # Express API 서버 (포트 3001)
│                        # - 환율: open.er-api.com
│                        # - 음력: korean-lunar-calendar
└── public/
    ├── index.html       # 앱 쉘 (사이드바 + iframe 레이아웃)
    ├── css/
    │   └── common.css   # 공통 디자인 시스템
    └── tools/
        ├── calculator/  # 계산기
        ├── currency/    # 환율 변환기
        ├── unit/        # 도량형 변환기
        ├── dday/        # D-Day 계산기
        ├── lunar/       # 음력/양력 변환기
        └── alarm/       # 알람/타이머
```

---

## 🎨 디자인 시스템

- **다크 테마**: 검정(#000) 기반, 보라 계열 액센트(#7c6af7)
- **라이트 테마**: 밝은 회색(#f5f7fa) 기반
- **폰트**: Malgun Gothic / Noto Sans KR

---

## 📡 API

| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/rates` | 전체 환율 조회 (KRW 기준, 5분 캐시) |
| `GET /api/lunar/to-lunar?year=&month=&day=` | 양력 → 음력 변환 |
| `GET /api/lunar/to-solar?year=&month=&day=&leap=` | 음력 → 양력 변환 |

---

## 📄 License

MIT
