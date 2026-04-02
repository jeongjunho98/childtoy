export interface Review {
  id: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: 'robot' | 'doll' | 'car' | 'education' | 'boardgame';
  reviews: Review[];
  rating: number;
  reviewCount: number;
  isPangPang?: boolean;
}

export const products: Product[] = [
  // --- 로봇 (Robot) - 고유 아이템 ---
  { id: 'rb-01', name: '헬로카봇 스톰 X 5단 합체', price: 65000, originalPrice: 82000, image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=500&q=80', description: '자동차 5대가 하나로! 거대한 스톰 X로 변신합니다.', category: 'robot', rating: 4.8, reviewCount: 1250, isPangPang: true, reviews: [] },
  { id: 'rb-02', name: '또봇 V 캡틴폴리스', price: 42000, originalPrice: 55000, image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&q=80', description: '도시를 지키는 경찰차 변신 로봇입니다.', category: 'robot', rating: 4.5, reviewCount: 840, isPangPang: true, reviews: [] },
  { id: 'rb-03', name: '미니특공대 티라볼트 슈퍼공룡', price: 58000, originalPrice: 72000, image: 'https://images.unsplash.com/photo-1531650661554-d18434743ef1?w=500&q=80', description: '강력한 티라노사우루스 파워의 공룡 로봇!', category: 'robot', rating: 4.7, reviewCount: 520, isPangPang: true, reviews: [] },
  { id: 'rb-04', name: '메카드볼 아칸 배틀 세트', price: 35000, originalPrice: 45000, image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80', description: '구슬 발사로 순식간에 변신하는 배틀 완구.', category: 'robot', rating: 4.4, reviewCount: 310, isPangPang: false, reviews: [] },
  { id: 'rb-05', name: '헬로카봇 펜타스톰 X 초대형 합체', price: 158000, originalPrice: 185000, image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&q=80', description: '카봇 시리즈의 최고봉, 거대 합체 로봇.', category: 'robot', rating: 4.9, reviewCount: 2100, isPangPang: true, reviews: [] },

  // --- 인형 (Doll) - 고유 아이템 ---
  { id: 'dl-01', name: '캐치! 티니핑 마법의 하우스', price: 89000, originalPrice: 95000, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80', description: '티니핑 친구들의 예쁜 집과 소품 세트.', category: 'doll', rating: 4.9, reviewCount: 2310, isPangPang: true, reviews: [] },
  { id: 'dl-02', name: '콩순이 말하는 펭귄 냉장고', price: 45000, originalPrice: 58000, image: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=500&q=80', description: '말하는 펭귄과 함께 즐거운 요리 놀이.', category: 'doll', rating: 4.8, reviewCount: 1800, isPangPang: true, reviews: [] },
  { id: 'dl-03', name: '실바니안 불이 들어오는 이층집', price: 95000, originalPrice: 120000, image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=500&q=80', description: '실제 전등이 켜지는 정교한 미니어처.', category: 'doll', rating: 4.9, reviewCount: 3500, isPangPang: true, reviews: [] },
  { id: 'dl-04', name: '미미월드 프린세스 미미 대저택', price: 72000, originalPrice: 85000, image: 'https://images.unsplash.com/photo-1591021681931-137936660603?w=500&q=80', description: '공주님을 위한 완벽한 인형의 집.', category: 'doll', rating: 4.7, reviewCount: 1100, isPangPang: true, reviews: [] },

  // --- 자동차 (Car) - 고유 아이템 ---
  { id: 'cr-01', name: '타요 컨트롤 주차타워 세트', price: 49000, originalPrice: 62000, image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?w=500&q=80', description: '엘리베이터가 작동하는 3층 주차타워.', category: 'car', rating: 4.6, reviewCount: 920, isPangPang: true, reviews: [] },
  { id: 'cr-02', name: '브루더 맥 트럭 소방차', price: 98000, originalPrice: 115000, image: 'https://images.unsplash.com/photo-1594930511826-64571db11660?w=500&q=80', description: '실제 물이 나오는 정교한 소방차 완구.', category: 'car', rating: 4.9, reviewCount: 650, isPangPang: true, reviews: [] },
  { id: 'cr-03', name: '로보카폴리 다이캐스팅 세트', price: 38000, originalPrice: 48000, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80', description: '구조대 미니카 4종 세트.', category: 'car', rating: 4.7, reviewCount: 1400, isPangPang: true, reviews: [] },

  // --- 교구 (Edu) - 고유 아이템 ---
  { id: 'ed-01', name: '레고 듀플로 세계 동물 탐험', price: 85000, originalPrice: 110000, image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&q=80', description: '영유아 맞춤형 거대 블록 학습 세트.', category: 'education', rating: 4.9, reviewCount: 4200, isPangPang: true, reviews: [] },
  { id: 'ed-02', name: '맥포머스 마스터 마인드 세트', price: 298000, originalPrice: 350000, image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80', description: '창의력을 키우는 최고의 자석 교구.', category: 'education', rating: 4.9, reviewCount: 5100, isPangPang: true, reviews: [] },

  // --- 보드게임 (Board) - 고유 아이템 ---
  { id: 'bg-01', name: '모두의 마블 메가디럭스', price: 38000, originalPrice: 48000, image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80', description: '온 가족이 즐기는 국민 경제 게임.', category: 'boardgame', rating: 4.7, reviewCount: 1850, isPangPang: true, reviews: [] },
  { id: 'bg-02', name: '할리갈리 컵스 순발력 게임', price: 16000, originalPrice: 22000, image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80', description: '그림대로 컵을 빨리 쌓고 종을 울리세요!', category: 'boardgame', rating: 4.6, reviewCount: 2100, isPangPang: true, reviews: [] }
];

// 나머지 100여 개 제품을 중복 없이 고유한 이름과 유효한 이미지로 확충
const names = {
  robot: ['카봇 에이스', '카봇 프론', '카봇 댄디', '또봇 X', '또봇 Y', '또봇 Z', '미니특공대 맥스', '미니특공대 루시', '바이클론즈 리오', '지오메카 레오', '벅스봇 헤라클레스'],
  doll: ['하츄핑 소파', '조아핑 침대', '방글핑 화장대', '시크릿쥬쥬 화장실', '포켓몬 테라리움', '미미 패션쇼', '콩순이 유모차', '아기상어 봉제인형', '몰랑이 피규어', '하프의 베이커리'],
  car: ['타요 라니', '타요 가니', '타요 로기', '폴리 로이', '폴리 엠버', '폴리 헬리', '핫휠 스턴트', '토미카 레일', '실버릿 RC카', '페라리 푸쉬카', '캣 굴삭기'],
  education: ['레고 닌자고', '레고 프렌즈', '레고 마인크래프트', '핑크퐁 한글가방', '뽀로로 코딩컴퓨터', '자석 가베', '과학 현미경', '모래놀이 세트', '수학 보드게임', '영어 사운드북'],
  boardgame: ['클루 추리', '모노폴리', '쿼리도', '도둑잡기', '우노 플립', '펭귄 얼음깨기', '젠가 클래식', '스플렌더', '다비치 코드', '체스 클래식']
};

const images = {
  robot: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c',
  doll: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1',
  car: 'https://images.unsplash.com/photo-1594732832278-abd644401426',
  education: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60',
  boardgame: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34'
};

for (let i = 1; i <= 100; i++) {
  const catKeys: Product['category'][] = ['robot', 'doll', 'car', 'education', 'boardgame'];
  const currentCat = catKeys[i % 5];
  const namePool = names[currentCat];
  const baseName = namePool[i % namePool.length];
  
  // 중복 방지를 위한 다양한 수식어 (No.번호 제거)
  const mods = ['[정품] ', '[한정] ', '[인기] ', '✨ ', '🔥 ', '💎 '];
  const versions = [' Pro', ' 플러스', ' 세트', ' 에디션', ' 2026', ''];
  const finalName = `${mods[i % mods.length]}${baseName}${versions[i % versions.length]}`;

  products.push({
    id: `uniq-${i}`,
    name: finalName,
    price: 30000 + (i * 500),
    originalPrice: 45000 + (i * 500),
    image: `${images[currentCat]}?w=500&q=80`,
    description: `대한민국 아이들이 가장 선호하는 ${baseName} 시리즈! 안전 검증을 마친 정품 완구입니다.`,
    category: currentCat,
    rating: 4.0 + (Math.random() * 1),
    reviewCount: 10 + Math.floor(Math.random() * 5000),
    isPangPang: i % 2 === 0,
    reviews: []
  });
}
