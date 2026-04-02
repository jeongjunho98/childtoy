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
  originalPrice?: number; // 정가 (할인 전 가격)
  image: string;
  description: string;
  category: 'robot' | 'doll' | 'car' | 'education' | 'boardgame';
  reviews: Review[];
  rating: number; // 평균 별점
  reviewCount: number; // 리뷰 수
  isPangPang?: boolean; // 팡팡배송 (로켓배송 급)
}

export const products: Product[] = [
  // 로봇 카테고리
  {
    id: '1',
    name: '헬로카봇 스톰 X (5단 합체)',
    price: 65000,
    originalPrice: 82000,
    image: 'https://images.unsplash.com/photo-1531650661554-d18434743ef1?w=500&q=80',
    description: '변신 자동차 로봇의 제왕! 5단 합체 스톰 X입니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 1250,
    isPangPang: true,
    reviews: [
      { id: 'r1', userName: '로봇왕', rating: 5, content: '아이들이 너무 좋아해요! 합체하는 재미가 있네요.', date: '2024-03-20' }
    ]
  },
  {
    id: '2',
    name: '또봇 V 캡틴폴리스 (특수경찰)',
    price: 42000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80',
    description: '정의로운 경찰 로봇 또봇 V 캡틴폴리스입니다.',
    category: 'robot',
    rating: 4.5,
    reviewCount: 840,
    isPangPang: true,
    reviews: []
  },
  // 인형/피규어 카테고리
  {
    id: '3',
    name: '캐치! 티니핑 하우스 (NEW)',
    price: 89000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500&q=80',
    description: '아이들의 아이돌! 티니핑들이 모여 사는 예쁜 하우스입니다.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 2310,
    isPangPang: true,
    reviews: [
      { id: 'r2', userName: '핑구맘', rating: 5, content: '티니핑 지옥이지만 아이가 행복해하니 만족합니다.', date: '2024-03-25' }
    ]
  },
  {
    id: '4',
    name: '뽀로로 말하는 마트 계산대 놀이',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    description: '뽀로로와 함께 즐거운 마트 놀이를 즐겨보세요.',
    category: 'doll',
    rating: 4.7,
    reviewCount: 1560,
    isPangPang: false,
    reviews: []
  },
  // 자동차/탈것 카테고리
  {
    id: '5',
    name: '타요 컨트롤 주차타워 세트',
    price: 49000,
    originalPrice: 62000,
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80',
    description: '꼬마버스 타요와 친구들의 신나는 주차타워 놀이!',
    category: 'car',
    rating: 4.6,
    reviewCount: 920,
    isPangPang: true,
    reviews: []
  },
  {
    id: '6',
    name: '브루더 맥 트럭 소방차 (독일 정품)',
    price: 98000,
    originalPrice: 115000,
    image: 'https://images.unsplash.com/photo-1594930511826-64571db11660?w=500&q=80',
    description: '실제 소방차를 그대로 재현한 정교한 브루더 소방차입니다.',
    category: 'car',
    rating: 4.9,
    reviewCount: 650,
    isPangPang: true,
    reviews: []
  },
  // 교구/학습 카테고리
  {
    id: '7',
    name: '핑크퐁 사운드북 세트 (5권)',
    price: 26000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&q=80',
    description: '상어가족과 함께 노래하며 배우는 사운드북 5종 세트.',
    category: 'education',
    rating: 4.8,
    reviewCount: 3100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '8',
    name: '코딩펫 밀키 (스마트 코딩 로봇)',
    price: 68000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80',
    description: '귀여운 햄스터 로봇과 함께 배우는 첫 코딩 놀이!',
    category: 'education',
    rating: 4.4,
    reviewCount: 420,
    isPangPang: false,
    reviews: []
  },
  // 보드게임 카테고리
  {
    id: '9',
    name: '모두의 마블 메가디럭스 에디션',
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '온 가족이 함께 즐기는 국민 보드게임 모두의 마블!',
    category: 'boardgame',
    rating: 4.7,
    reviewCount: 1850,
    isPangPang: true,
    reviews: []
  },
  {
    id: '10',
    name: '할리갈리 컵스 (액션 게임)',
    price: 16000,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '빠른 손놀림이 생명! 순발력을 기르는 할리갈리 컵스입니다.',
    category: 'boardgame',
    rating: 4.6,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  }
];
