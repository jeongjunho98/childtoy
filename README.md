# 토이팡팡 (ToyPangPang) 🎈🧸

대한민국 아이들과 부모님을 위한 전문 장난감 홈쇼핑 플랫폼입니다. 
아이들의 눈높이에 맞춘 감성적인 디자인과 실제 커머스 수준의 강력한 백엔드 시스템을 갖추고 있습니다.

**🔗 배포 주소**: [https://childtoy.vercel.app](https://childtoy.vercel.app)

---

## ✨ 주요 기능 (Key Features)

### 1. 아이 친화적인 UI/UX (Kid-Friendly Design)
- **파스텔톤 테마**: 솜사탕 블루, 베이비 핑크 등 정서적 안정감을 주는 색감 적용.
- **둥근 모서리 UI**: 모든 요소에 부드러운 라운딩 처리를 하여 친근감 부여.
- **쿠팡 스타일 레이아웃**: 상업용 쇼핑몰의 효율적인 정보 구조를 아이들의 감성으로 재해석.

### 2. 강력한 인증 시스템 (Security & Auth)
- **간편 로그인**: 네이버 및 카카오 계정을 통한 1초 연동 및 로그인 지원.
- **보안 강화**: `bcryptjs`를 이용한 비밀번호 암호화 및 `Zod`를 활용한 서버 사이드 데이터 검증.
- **관리자 세이프가드**: DB 초기화 상황에서도 마스터 계정 로그인을 보장하는 안전장치 구현.

### 3. 고도화된 쇼핑 경험 (Expert Commerce)
- **스마트 검색/필터**: 상품명 및 설명 기반의 실시간 검색과 카테고리별 필터링 기능.
- **팡팡배송 (Rocket Delivery)**: 무료 배송 및 내일 도착 보장 상품 별도 관리.
- **단독 구매 로직**: '바로 구매하기' 클릭 시 장바구니와 섞이지 않는 별도 결제 프로세스 구축.
- **상세 페이지 탭 시스템**: 상품상세, 긴 이미지 설명, 리뷰, 상품정보 고시를 탭으로 분리 제공.

### 4. 데이터베이스 및 인프라 (Persistence)
- **Prisma ORM**: 타입 안정성을 확보한 현대적인 DB 스키마 설계.
- **SQLite & PostgreSQL**: 개발 및 운영 환경에 맞춘 유연한 DB 엔진 연동.
- **Server Actions**: Next.js 14+ 최신 기술을 활용한 보안성 높은 데이터 통신.

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: Next.js (App Router), TypeScript, CSS Modules
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: SQLite (Local), PostgreSQL (Production)
- **Security**: bcryptjs, Zod
- **API**: Daum Postcode API (주소 검색)
- **Optimization**: Next/Image (LCP 개선), useMemo (필터링 성능 최적화)

---

## 🚀 시작하기 (Getting Started)

### 1. 환경 변수 설정
`.env` 파일을 생성하고 다음 정보를 입력합니다:
```env
DATABASE_URL="file:./dev.db"
```

### 2. 패키지 설치 및 DB 초기화
```bash
npm install
npx prisma migrate dev
npx prisma db seed
```

### 3. 개발 서버 실행
```bash
npm run dev
```

---

## 🔐 개발용 관리자 계정 (Admin Info)
- **아이디**: `toypangpangadmin`
- **비밀번호**: `toypangpang2026`
*(주의: 실제 운영 시 관리자 전용 기능을 통해서만 접근 가능)*

---

## 📋 상품 정보 고시 및 안내
- **대표이사**: 정준호
- **주소**: 전라남도 나주시 중야1길 37 대방엘리움1차아파트 106동 1401호
- **고객센터**: 010-4851-7984 (평일 09:00 ~ 18:00)
- **무통장 입금**: 기업은행 971-018442-02-019 (예금주: 정준호)

---
© 2026 ToyPangPang. All rights reserved.
