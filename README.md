# 🎴 최애의 포토 — Frontend

포토카드를 등록·판매하고 포인트로 교환하는 웹 서비스

**🔗 [서비스 바로가기](https://my-favorite-photo-frontend.vercel.app)** · [Backend Repository](https://github.com/karrum5692/my-favorite-photo-backend)

---

## Tech Stack

**Core**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Styling**

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**Deployment**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**Convention**

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-42B983?style=flat-square)
![CodeRabbit](https://img.shields.io/badge/CodeRabbit-FF570A?style=flat-square)

---

## 주요 기능

| 기능 | 설명 |
|---|---|
| 유저/인증 | 회원가입, 로그인, 인증 세션 관리 |
| 마켓플레이스 | 포토카드 검색·조회·상세·판매 등록 |
| 포토카드 거래 | 구매 및 판매 |
| 포토카드 교환 | 양측 수락 기반 교환 로직 |
| 마이갤러리 | 유저 프로필, 보유 포토카드 목록 |
| 포인트 | 랜덤 포인트 지급, 포인트 관리 |
| 알림 | 거래·교환 이벤트 알림 |

---

## 팀 구성

| 팀원 | 역할 | 담당 기능 |
|---|---|---|
| 김상우 | 유저/인증 | 회원가입, 로그인, 인증 세션 구성 |
| 정다희 | 마켓플레이스 | 검색, 조회, 상세, 생성 |
| 임주연 | 포토카드 거래 | 구매/판매 기능 |
| 최광헌 | 포토카드 교환 | 양측 수락 로직 및 상태 관리 |
| 윤이준 | 마이갤러리, 포토카드 생성 | 유저 프로필, 포토 목록, 포인트 관리 |
| 심현수 | PM, 공통 기반 | 공통 모달, 헤더, 랜딩 페이지, 랜덤 포인트, 알림 |

---

## Getting Started

```bash
npm install
npm run dev
```

http://localhost:3000

`.env.local`

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BACKEND_URL=
```

---

## Branch Strategy

```
feature/* → dev → main
```

## Commit Convention

| Type | Description |
|---|---|
| feat | 기능 추가 |
| fix | 버그 수정 |
| style | 스타일 수정 |
| docs | 문서 수정 |
| refactor | 리팩토링 |
| chore | 설정 변경 |
