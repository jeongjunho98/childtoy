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
  // --- 헬로카봇 (Hello Carbot) ---
  {
    id: '1',
    name: '헬로카봇 스톰 X (5단 합체)',
    price: 65000,
    originalPrice: 82000,
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=500&q=80',
    description: '대한민국 대표 변신 로봇! 에이스, 프론, 댄디, 스카이, 스톰이 합체하여 탄생하는 전설의 카봇입니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 1250,
    isPangPang: true,
    reviews: []
  },
  {
    id: '2',
    name: '헬로카봇 펜타스톰 X (최종진화형)',
    price: 158000,
    originalPrice: 180000,
    image: 'https://images.unsplash.com/photo-1531650661554-d18434743ef1?w=500&q=80',
    description: '역대 카봇 중 가장 거대한 크기를 자랑하는 5단 합체 로봇의 결정판입니다.',
    category: 'robot',
    rating: 4.9,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '101',
    name: '헬로카봇 큐브 시계 (Ver.3)',
    price: 35000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1508615070457-7baade006f41?w=500&q=80',
    description: '카봇을 소환하는 필수 아이템! 화려한 사운드와 불빛으로 아이들의 영웅이 되어보세요.',
    category: 'robot',
    rating: 4.7,
    reviewCount: 850,
    isPangPang: true,
    reviews: []
  },
  {
    id: '102',
    name: '헬로카봇 윙라이온 (황금사자)',
    price: 92000,
    originalPrice: 110000,
    image: 'https://images.unsplash.com/photo-1590811024844-0235222217ed?w=500&q=80',
    description: '거대한 날개를 펼치는 황금 사자 카봇! 압도적인 존재감으로 아이들의 시선을 사로잡습니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 420,
    isPangPang: true,
    reviews: []
  },

  // --- 또봇 (Tobot) ---
  {
    id: '3',
    name: '또봇 V 캡틴폴리스',
    price: 42000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&q=80',
    description: '경찰차에서 멋진 로봇으로 변신! 도시의 평화를 지키는 캡틴폴리스입니다.',
    category: 'robot',
    rating: 4.5,
    reviewCount: 840,
    isPangPang: true,
    reviews: []
  },
  {
    id: '103',
    name: '또봇 V 기간트 V (3단 합체)',
    price: 75000,
    originalPrice: 89000,
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=500&q=80',
    description: '소방차, 구급차, 경찰차가 하나로! 기간트 V의 강력한 파워를 경험하세요.',
    category: 'robot',
    rating: 4.6,
    reviewCount: 310,
    isPangPang: false,
    reviews: []
  },
  {
    id: '104',
    name: '또봇 V 실버호크',
    price: 32000,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&q=80',
    description: '하늘을 가르는 은빛 매! 전투기 모드와 로봇 모드 변신이 자유로운 또봇입니다.',
    category: 'robot',
    rating: 4.4,
    reviewCount: 150,
    isPangPang: true,
    reviews: []
  },

  // --- 캐치! 티니핑 (Catch Teenieping) ---
  {
    id: '4',
    name: '캐치! 티니핑 마법의 하우스',
    price: 89000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    description: '하츄핑, 조아핑, 방글핑이 살고 있는 마법의 집! 아이들의 상상력을 자극하는 역할놀이 세트입니다.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 2310,
    isPangPang: true,
    reviews: []
  },
  {
    id: '105',
    name: '캐치! 티니핑 반짝반짝 보석함',
    price: 42000,
    originalPrice: 52000,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80',
    description: '소중한 티니핑 메달을 보관하세요! 거울과 예쁜 멜로디가 함께합니다.',
    category: 'doll',
    rating: 4.6,
    reviewCount: 810,
    isPangPang: false,
    reviews: []
  },
  {
    id: '106',
    name: '캐치! 티니핑 미스틱 하트윙 (Ver.3)',
    price: 68000,
    originalPrice: 75000,
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500&q=80',
    description: '티니핑을 캐치하는 마법의 하트윙! 실제 게임과 카메라 기능이 포함되어 있습니다.',
    category: 'doll',
    rating: 4.8,
    reviewCount: 1500,
    isPangPang: true,
    reviews: []
  },
  {
    id: '107',
    name: '캐치! 티니핑 하츄핑 봉제인형 (30cm)',
    price: 25000,
    originalPrice: 30000,
    image: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=500&q=80',
    description: '가장 사랑받는 하츄핑을 포근한 인형으로 만나보세요. 부드러운 촉감이 일품입니다.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 3200,
    isPangPang: true,
    reviews: []
  },

  // --- 뽀로로 & 타요 (Pororo & Tayo) ---
  {
    id: '5',
    name: '뽀로로 말하는 마트 계산대 놀이',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80',
    description: '물건을 스캔하면 가격을 말해주는 뽀로로 마트 계산대! 재미있는 시장 놀이를 즐겨요.',
    category: 'doll',
    rating: 4.7,
    reviewCount: 1560,
    isPangPang: false,
    reviews: []
  },
  {
    id: '108',
    name: '타요 컨트롤 주차타워 세트',
    price: 49000,
    originalPrice: 62000,
    image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?w=500&q=80',
    description: '엘리베이터가 오르락내리락! 타요와 친구들을 주차하고 쌩쌩 출발시켜보세요.',
    category: 'car',
    rating: 4.6,
    reviewCount: 920,
    isPangPang: true,
    reviews: []
  },
  {
    id: '109',
    name: '뽀로로 무선 조정 소방차 (RC카)',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1591702548275-3ad0ca47474c?w=500&q=80',
    description: '아이들의 첫 무선 자동차! 뽀로로 소방차와 함께 불을 끄러 가볼까요?',
    category: 'car',
    rating: 4.5,
    reviewCount: 620,
    isPangPang: true,
    reviews: []
  },
  {
    id: '110',
    name: '타요 긴급출동 센터 플레이세트',
    price: 58000,
    originalPrice: 72000,
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80',
    description: '경찰 타요와 소방차 친구들이 출동! 센터 문이 열리며 박진감 넘치는 놀이가 시작됩니다.',
    category: 'car',
    rating: 4.7,
    reviewCount: 1100,
    isPangPang: true,
    reviews: []
  },

  // --- 브루더 (Bruder) & 핫휠 ---
  {
    id: '6',
    name: '브루더 맥 트럭 소방차 (물 분사 가능)',
    price: 98000,
    originalPrice: 115000,
    image: 'https://images.unsplash.com/photo-1594930511826-64571db11660?w=500&q=80',
    description: '실제 소방차를 1:16 비율로 재현한 독일 명품 완구! 실제 물 분사 기능이 있습니다.',
    category: 'car',
    rating: 4.9,
    reviewCount: 650,
    isPangPang: true,
    reviews: []
  },
  {
    id: '111',
    name: '브루더 캣 대형 굴삭기 (CAT 정품)',
    price: 75000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1591702548275-3ad0ca47474c?w=500&q=80',
    description: '진짜 흙을 팔 수 있는 정교한 관절! 아이들의 모래놀이를 더욱 즐겁게 해줍니다.',
    category: 'car',
    rating: 4.8,
    reviewCount: 320,
    isPangPang: true,
    reviews: []
  },
  {
    id: '112',
    name: '핫휠 궁극의 가라지 세차장',
    price: 125000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=500&q=80',
    description: '거대 고릴라를 피해 자동차를 주차하세요! 색이 변하는 자동차와 거대 트랙 세트.',
    category: 'car',
    rating: 4.8,
    reviewCount: 450,
    isPangPang: false,
    reviews: []
  },

  // --- 레고 & 교구 (Lego & Education) ---
  {
    id: '7',
    name: '레고 듀플로 세계 동물 탐험',
    price: 85000,
    originalPrice: 110000,
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&q=80',
    description: '영유아를 위한 큰 블록! 전 세계 동물들과 함께 자연스럽게 학습하며 놀아요.',
    category: 'education',
    rating: 4.9,
    reviewCount: 4200,
    isPangPang: true,
    reviews: []
  },
  {
    id: '113',
    name: '맥포머스 마스터 마인드 (115pcs)',
    price: 298000,
    originalPrice: 350000,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80',
    description: '자석 블록의 끝판왕! 3D 입체 조형물을 만들며 수학적 사고력을 기릅니다.',
    category: 'education',
    rating: 4.9,
    reviewCount: 5100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '114',
    name: '코딩펫 밀키 (스마트 코딩 쥐)',
    price: 68000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1564327487389-a0018f56b552?w=500&q=80',
    description: '놀면서 배우는 첫 코딩! 카드를 입력하면 밀키가 그대로 길을 찾아갑니다.',
    category: 'education',
    rating: 4.4,
    reviewCount: 420,
    isPangPang: false,
    reviews: []
  },
  {
    id: '115',
    name: '핑크퐁 상어가족 사운드북 (5권)',
    price: 26000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&q=80',
    description: '전 세계가 사랑하는 아기상어 노래! 재미있는 이야기와 음악이 가득한 사운드북.',
    category: 'education',
    rating: 4.8,
    reviewCount: 3100,
    isPangPang: true,
    reviews: []
  },

  // --- 보드게임 (Boardgame) ---
  {
    id: '8',
    name: '모두의 마블 메가디럭스 에디션',
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '온 가족이 즐기는 국민 보드게임! 랜드마크를 짓고 세계 여행을 떠나보세요.',
    category: 'boardgame',
    rating: 4.7,
    reviewCount: 1850,
    isPangPang: true,
    reviews: []
  },
  {
    id: '116',
    name: '할리갈리 컵스 (액션 보드게임)',
    price: 16000,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '그림대로 컵을 빨리 쌓고 종을 울리세요! 아이들의 순발력과 집중력 향상.',
    category: 'boardgame',
    rating: 4.6,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '117',
    name: '루미큐브 클래식 (정품)',
    price: 29000,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '숫자 조합의 짜릿한 승부! 지능 개발 보드게임의 정석, 루미큐브입니다.',
    category: 'boardgame',
    rating: 4.9,
    reviewCount: 4500,
    isPangPang: true,
    reviews: []
  },
  {
    id: '118',
    name: '상어 아일랜드 탈출 대작전',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '뒤쫓아오는 상어를 피해 섬을 탈출하세요! 긴장감 넘치는 액션 보드게임.',
    category: 'boardgame',
    rating: 4.5,
    reviewCount: 520,
    isPangPang: false,
    reviews: []
  },
  {
    id: '119',
    name: '인생게임 주니어 (Hasbro)',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '어린이들의 눈높이에 맞춘 인생 설계 게임! 꿈과 희망을 키워주는 베스트셀러.',
    category: 'boardgame',
    rating: 4.6,
    reviewCount: 380,
    isPangPang: true,
    reviews: []
  }
];

// 나머지 100개 이상의 데이터를 실제 제품명 기반으로 추가합니다.
const names = {
  robot: ['미니특공대 슈퍼공룡파워', '메카드볼 아칸', '파워레인저 돈브라더즈', '카봇 프론 경찰차', '또봇 델타트론', '지오메카 캡틴다이노', '바이클론즈 우르사'],
  doll: ['콩순이 냉장고', '시크릿쥬쥬 별의여신', '미미월드 프린세스 미미', '실바니안 이층집', '베이비얼라이브 맘마', '몰랑이 피규어', '포켓몬 테라리움'],
  car: ['로보카폴리 다이캐스팅', '토미카 기차세트', '마조렛 슈퍼시티', '실버릿 RC카', '뽀로로 주차장', '핑크퐁 자동차', '타요 세차장'],
  education: ['레고 시티 소방서', '지오맥 마그네틱', '과학 현미경 세트', '수학 보드게임', '한글 쓰기 패드', '어린이 코딩 로봇', '자석 가베'],
  boardgame: ['다비치 코드', '젠가 클래식', '스플렌더 주니어', '펭귄 얼음깨기', '러시아워 교통정리', '도둑잡기 게임', '우노 카드게임']
};

for (let i = 200; i <= 300; i++) {
  const categories: Product['category'][] = ['robot', 'doll', 'car', 'education', 'boardgame'];
  const currentCat = categories[i % 5];
  const nameList = names[currentCat];
  const realName = nameList[i % nameList.length];
  
  products.push({
    id: String(i),
    name: `${realName} No.${i}`,
    price: 25000 + (i * 50),
    originalPrice: 35000 + (i * 50),
    image: `https://images.unsplash.com/photo-${1550000000000 + (i * 1000000)}?w=500&q=80`,
    description: `대한민국 아이들이 가장 선호하는 ${realName} 시리즈입니다. KC인증을 받은 안전한 정품 완구입니다.`,
    category: currentCat,
    rating: 4.0 + (Math.random() * 1),
    reviewCount: 100 + Math.floor(Math.random() * 2000),
    isPangPang: i % 2 === 0,
    reviews: []
  });
}
