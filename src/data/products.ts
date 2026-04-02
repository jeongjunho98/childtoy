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
  {
    id: '1',
    name: '헬로카봇 스톰 X (5단 합체 로봇)',
    price: 65000,
    originalPrice: 82000,
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=500&q=80',
    description: '대한민국 대표 변신 로봇! 5대의 자동차가 합체하여 거대한 스톰 X로 변신합니다. 정교한 디테일과 튼튼한 내구성을 자랑합니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 1250,
    isPangPang: true,
    reviews: [
      { id: 'r1', userName: '로봇왕', rating: 5, content: '아들이 하루종일 이것만 가지고 놀아요. 합체가 정말 정교하네요!', date: '2024-03-20' }
    ]
  },
  {
    id: '2',
    name: '또봇 V 캡틴폴리스',
    price: 42000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&q=80',
    description: '정의의 수호자 캡틴폴리스! 경찰차에서 멋진 로봇으로 변신하는 또봇 V 시리즈의 베스트셀러입니다.',
    category: 'robot',
    rating: 4.5,
    reviewCount: 840,
    isPangPang: true,
    reviews: []
  },
  {
    id: '3',
    name: '캐치! 티니핑 마법의 하우스',
    price: 89000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    description: '티니핑 친구들이 모두 모였다! 반짝반짝 빛나는 마법의 하우스에서 아이들의 상상력을 키워주세요.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 2310,
    isPangPang: true,
    reviews: [
      { id: 'r2', userName: '핑구맘', rating: 5, content: '우리 공주님이 너무 좋아해요. 구성품이 알차서 만족스럽습니다.', date: '2024-03-25' }
    ]
  },
  {
    id: '4',
    name: '뽀로로 말하는 마트 계산대',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80',
    description: '뽀로로와 함께하는 신나는 시장 놀이! 실제 계산기 소리와 뽀로로 목소리가 나와 아이들이 정말 좋아합니다.',
    category: 'doll',
    rating: 4.7,
    reviewCount: 1560,
    isPangPang: false,
    reviews: []
  },
  {
    id: '5',
    name: '타요 컨트롤 주차타워',
    price: 49000,
    originalPrice: 62000,
    image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?w=500&q=80',
    description: '꼬마버스 타요와 친구들의 전용 주차타워! 엘리베이터와 슬라이드로 박진감 넘치는 주행 놀이가 가능합니다.',
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
    description: '독일 명품 완구 브루더! 실제 소방차를 1:16 비율로 정교하게 재현했습니다. 물 분사 기능까지 포함되어 있습니다.',
    category: 'car',
    rating: 4.9,
    reviewCount: 650,
    isPangPang: true,
    reviews: []
  },
  {
    id: '7',
    name: '핑크퐁 상어가족 사운드북 5종',
    price: 26000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&q=80',
    description: '전 세계가 사랑하는 아기상어! 즐거운 노래와 함께 한글, 영어, 숫자를 재미있게 배울 수 있는 사운드북 세트입니다.',
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
    image: 'https://images.unsplash.com/photo-1564327487389-a0018f56b552?w=500&q=80',
    description: '우리 아이 첫 코딩 친구! 귀여운 밀키와 함께 놀면서 논리적 사고력을 키워주는 스마트 교육 완구입니다.',
    category: 'education',
    rating: 4.4,
    reviewCount: 420,
    isPangPang: false,
    reviews: []
  },
  {
    id: '9',
    name: '모두의 마블 메가디럭스',
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '온 가족이 함께 즐기는 국민 보드게임! 랜드마크를 건설하고 세계를 여행하며 경제 관념을 익힐 수 있습니다.',
    category: 'boardgame',
    rating: 4.7,
    reviewCount: 1850,
    isPangPang: true,
    reviews: []
  },
  {
    id: '10',
    name: '할리갈리 컵스 (액션 보드게임)',
    price: 16000,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '순발력 끝판왕! 카드의 그림대로 컵을 가장 먼저 쌓고 종을 울려보세요. 아이들의 집중력 향상에 큰 도움을 줍니다.',
    category: 'boardgame',
    rating: 4.6,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  }
];
