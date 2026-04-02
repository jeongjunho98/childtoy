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
  // --- 로봇 (Robot) ---
  {
    id: '1',
    name: '헬로카봇 스톰 X (5단 합체)',
    price: 65000,
    originalPrice: 82000,
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=500&q=80',
    description: '대한민국 1등 변신로봇! 스톰, 프론, 에이스, 댄디, 스카이가 합체하여 전설의 카봇 스톰 X가 됩니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 1250,
    isPangPang: true,
    reviews: []
  },
  {
    id: '2',
    name: '또봇 V 캡틴폴리스',
    price: 42000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&q=80',
    description: '도시의 평화를 지키는 정의의 사도! 강력한 사이렌 소리와 함께 로봇으로 변신합니다.',
    category: 'robot',
    rating: 4.5,
    reviewCount: 840,
    isPangPang: true,
    reviews: []
  },
  {
    id: '11',
    name: '미니특공대 슈퍼공룡파워 티라볼트',
    price: 58000,
    originalPrice: 72000,
    image: 'https://images.unsplash.com/photo-1531650661554-d18434743ef1?w=500&q=80',
    description: '강력한 공룡 에너지를 내뿜는 티라볼트 로봇입니다. 아머봇 모드와 다이노 모드 변신 가능!',
    category: 'robot',
    rating: 4.7,
    reviewCount: 520,
    isPangPang: true,
    reviews: []
  },
  {
    id: '12',
    name: '메카드볼 아칸 (변신 볼)',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80',
    description: '구슬을 발사하여 변신하는 신개념 배틀 로봇! 아칸의 강력한 파워를 느껴보세요.',
    category: 'robot',
    rating: 4.4,
    reviewCount: 310,
    isPangPang: false,
    reviews: []
  },
  {
    id: '13',
    name: '헬로카봇 펜타스톰 X (최종합체)',
    price: 158000,
    originalPrice: 180000,
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&q=80',
    description: '카봇 시리즈의 끝판왕! 거대한 크기와 압도적인 디테일을 자랑하는 5단 합체 로봇입니다.',
    category: 'robot',
    rating: 4.9,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '14',
    name: '또봇 V 기간트 V',
    price: 75000,
    originalPrice: 89000,
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=500&q=80',
    description: '전설의 거인 기간트 V! 트럭 모드에서 거대 로봇으로 완벽 변신합니다.',
    category: 'robot',
    rating: 4.6,
    reviewCount: 420,
    isPangPang: true,
    reviews: []
  },
  {
    id: '15',
    name: '미니특공대 애니멀트론 레오',
    price: 49000,
    originalPrice: 60000,
    image: 'https://images.unsplash.com/photo-1590811024844-0235222217ed?w=500&q=80',
    description: '용맹한 사자의 기운! 정교한 관절 움직임으로 멋진 포즈 연출이 가능합니다.',
    category: 'robot',
    rating: 4.5,
    reviewCount: 280,
    isPangPang: false,
    reviews: []
  },
  {
    id: '16',
    name: '벅스봇 이그니션 듀얼배틀 세트',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1560438718-eb61fa3265e8?w=500&q=80',
    description: '곤충 로봇들의 뜨거운 한판 승부! 뒤집기 배틀로 승자를 가려보세요.',
    category: 'robot',
    rating: 4.3,
    reviewCount: 650,
    isPangPang: true,
    reviews: []
  },
  {
    id: '17',
    name: '파워레인저 돈브라더즈 돈 오니타이진',
    price: 110000,
    originalPrice: 130000,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=500&q=80',
    description: '역대급 가동률을 자랑하는 파워레인저 합체 로봇! 극중 모습을 그대로 재현했습니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 150,
    isPangPang: false,
    reviews: []
  },
  {
    id: '18',
    name: '티라노 킹 (다이노포스 리턴즈)',
    price: 85000,
    originalPrice: 98000,
    image: 'https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?w=500&q=80',
    description: '다시 돌아온 전설의 공룡 로봇! 경쾌한 사운드와 함께 변신 배틀을 즐겨보세요.',
    category: 'robot',
    rating: 4.7,
    reviewCount: 890,
    isPangPang: true,
    reviews: []
  },

  // --- 인형/피규어 (Doll) ---
  {
    id: '3',
    name: '캐치! 티니핑 마법의 하우스',
    price: 89000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    description: '하츄핑, 조아핑, 방글핑이 살고 있는 예쁜 집! 다양한 소품으로 인형놀이를 즐겨요.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 2310,
    isPangPang: true,
    reviews: []
  },
  {
    id: '4',
    name: '뽀로로 말하는 마트 계산대',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80',
    description: '마트 놀이의 끝판왕! 물건을 스캔하면 뽀로로가 가격을 말해줘요.',
    category: 'doll',
    rating: 4.7,
    reviewCount: 1560,
    isPangPang: false,
    reviews: []
  },
  {
    id: '21',
    name: '콩순이 말하는 펭귄 냉장고',
    price: 45000,
    originalPrice: 58000,
    image: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=500&q=80',
    description: '냉장고를 열면 귀여운 펭귄이 말을 걸어요! 음식 소품을 넣으면 재미있는 소리가 납니다.',
    category: 'doll',
    rating: 4.8,
    reviewCount: 1800,
    isPangPang: true,
    reviews: []
  },
  {
    id: '22',
    name: '시크릿쥬쥬 별의 여신 쥬쥬 인형',
    price: 28000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500&q=80',
    description: '아름다운 드레스를 입은 별의 여신 쥬쥬! 화려한 액세서리로 직접 꾸며줄 수 있습니다.',
    category: 'doll',
    rating: 4.6,
    reviewCount: 920,
    isPangPang: true,
    reviews: []
  },
  {
    id: '23',
    name: '미미월드 프린세스 미미 집',
    price: 72000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1591021681931-137936660603?w=500&q=80',
    description: '공주님의 우아한 침실과 거실이 있는 미미의 대저택! 아이들의 로망이 실현됩니다.',
    category: 'doll',
    rating: 4.7,
    reviewCount: 1100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '24',
    name: '실바니안 패밀리 불이 들어오는 이층집',
    price: 95000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=500&q=80',
    description: '실제 전등에 불이 켜지는 정교한 미니어처 하우스! 토끼 가족과 함께 행복한 시간을 보내세요.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 3500,
    isPangPang: true,
    reviews: []
  },
  {
    id: '25',
    name: '콩순이 코딩 붕어빵가게',
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    description: '붕어빵을 구우며 기초 코딩 개념을 배워요! 맛있는 소리와 함께하는 시장 놀이.',
    category: 'doll',
    rating: 4.5,
    reviewCount: 740,
    isPangPang: false,
    reviews: []
  },
  {
    id: '26',
    name: '베이비얼라이브 맘마를 먹어요',
    price: 49000,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500&q=80',
    description: '진짜 아기처럼 음식을 먹고 기저귀를 갈아줘야 하는 리얼 소꿉놀이 인형입니다.',
    category: 'doll',
    rating: 4.4,
    reviewCount: 320,
    isPangPang: true,
    reviews: []
  },
  {
    id: '27',
    name: '몰랑이 피규어 세트 (12종)',
    price: 24000,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=500&q=80',
    description: '말랑말랑 귀여운 몰랑이 친구들! 책상 위를 화사하게 꾸며주는 컬렉션 피규어입니다.',
    category: 'doll',
    rating: 4.8,
    reviewCount: 560,
    isPangPang: true,
    reviews: []
  },
  {
    id: '28',
    name: '캐치! 티니핑 반짝반짝 보석함',
    price: 42000,
    originalPrice: 52000,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80',
    description: '소중한 티니핑 메달을 보관하는 보석함! 거울과 멜로디 기능이 포함되어 있습니다.',
    category: 'doll',
    rating: 4.6,
    reviewCount: 810,
    isPangPang: false,
    reviews: []
  },

  // --- 자동차/탈것 (Car) ---
  {
    id: '5',
    name: '타요 컨트롤 주차타워',
    price: 49000,
    originalPrice: 62000,
    image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?w=500&q=80',
    description: '엘리베이터가 움직이는 3층 주차타워! 타요와 친구들을 쌩쌩 달리게 해주세요.',
    category: 'car',
    rating: 4.6,
    reviewCount: 920,
    isPangPang: true,
    reviews: []
  },
  {
    id: '6',
    name: '브루더 맥 트럭 소방차',
    price: 98000,
    originalPrice: 115000,
    image: 'https://images.unsplash.com/photo-1594930511826-64571db11660?w=500&q=80',
    description: '독일 장인의 기술력이 담긴 소방차! 실제 물 분사가 가능한 정교한 작동 완구입니다.',
    category: 'car',
    rating: 4.9,
    reviewCount: 650,
    isPangPang: true,
    reviews: []
  },
  {
    id: '31',
    name: '로보카폴리 다이캐스팅 시리즈 세트',
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80',
    description: '폴리, 로이, 엠버, 헬리 총출동! 묵직한 메탈 소재로 만든 고퀄리티 자동차 세트입니다.',
    category: 'car',
    rating: 4.7,
    reviewCount: 1400,
    isPangPang: true,
    reviews: []
  },
  {
    id: '32',
    name: '핫휠 궁극의 세차장 플레이세트',
    price: 125000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=500&q=80',
    description: '거대한 수조와 물 트랙이 있는 핫휠 세차장! 자동차의 색이 변하는 마법을 경험하세요.',
    category: 'car',
    rating: 4.8,
    reviewCount: 230,
    isPangPang: false,
    reviews: []
  },
  {
    id: '33',
    name: '뽀로로 무선 조정 소방차',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?w=500&q=80',
    description: '아이들도 쉽게 조종할 수 있는 무선 RC카! 뽀로로 대원과 함께 불을 끄러 가요.',
    category: 'car',
    rating: 4.5,
    reviewCount: 620,
    isPangPang: true,
    reviews: []
  },
  {
    id: '34',
    name: '카고 크레인 대형 덤프트럭',
    price: 52000,
    originalPrice: 68000,
    image: 'https://images.unsplash.com/photo-1591702548275-3ad0ca47474c?w=500&q=80',
    description: '진짜 모래를 실을 수 있는 거대 덤프트럭! 야외 모래놀이에 필수 아이템입니다.',
    category: 'car',
    rating: 4.6,
    reviewCount: 110,
    isPangPang: false,
    reviews: []
  },
  {
    id: '35',
    name: '마조렛 슈퍼 시티 전용 트랙',
    price: 189000,
    originalPrice: 220000,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80',
    description: '자동 엘리베이터와 7개의 층으로 구성된 거대 도시 트랙! 자동차 수납과 주행이 동시에.',
    category: 'car',
    rating: 4.9,
    reviewCount: 85,
    isPangPang: true,
    reviews: []
  },
  {
    id: '36',
    name: '토미카 기차 레일 세트 (입문용)',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=500&q=80',
    description: '칙칙폭폭 기차 여행을 떠나요! 초보자도 쉽게 조립할 수 있는 기차 레일 기본 세트입니다.',
    category: 'car',
    rating: 4.7,
    reviewCount: 430,
    isPangPang: true,
    reviews: []
  },
  {
    id: '37',
    name: '페라리 전동 푸쉬카 (유아용)',
    price: 210000,
    originalPrice: 250000,
    image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?w=500&q=80',
    description: '아이들의 첫 드림카! 부모님이 뒤에서 밀어줄 수도 있고, 아이가 직접 탈 수도 있습니다.',
    category: 'car',
    rating: 4.8,
    reviewCount: 190,
    isPangPang: false,
    reviews: []
  },
  {
    id: '38',
    name: '미니카 50대 컬렉션 박스',
    price: 69000,
    originalPrice: 89000,
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80',
    description: '다양한 디자인의 미니카가 한 박스에! 아이들에게 최고의 선물 꾸러미입니다.',
    category: 'car',
    rating: 4.6,
    reviewCount: 750,
    isPangPang: true,
    reviews: []
  },

  // --- 교구/학습 (Education) ---
  {
    id: '7',
    name: '핑크퐁 사운드북 세트',
    price: 26000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&q=80',
    description: '버튼을 누르면 아기상어 노래가 솔솔~ 아이들의 청각 발달에 도움을 줍니다.',
    category: 'education',
    rating: 4.8,
    reviewCount: 3100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '8',
    name: '코딩펫 밀키',
    price: 68000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1564327487389-a0018f56b552?w=500&q=80',
    description: '놀면서 배우는 코딩! 카드를 입력하면 로봇이 그대로 움직이며 논리력을 키워줍니다.',
    category: 'education',
    rating: 4.4,
    reviewCount: 420,
    isPangPang: false,
    reviews: []
  },
  {
    id: '41',
    name: '레고 듀플로 세계 동물 탐험',
    price: 85000,
    originalPrice: 110000,
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&q=80',
    description: '어린 영유아를 위한 큰 블록! 전 세계의 다양한 동물들과 함께 창의력을 쑥쑥.',
    category: 'education',
    rating: 4.9,
    reviewCount: 4200,
    isPangPang: true,
    reviews: []
  },
  {
    id: '42',
    name: '맥포머스 마스터 마인드 세트',
    price: 298000,
    originalPrice: 350000,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80',
    description: '자석 블록의 대명사! 3D 입체 도형을 만들며 수학적 사고력을 기를 수 있습니다.',
    category: 'education',
    rating: 4.9,
    reviewCount: 5100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '43',
    name: '뽀로로 한글 쓰기 패드',
    price: 42000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=500&q=80',
    description: '화면에 한글을 따라 쓰며 재미있게 익혀요! 뽀로로와 함께라면 공부도 즐거워요.',
    category: 'education',
    rating: 4.6,
    reviewCount: 840,
    isPangPang: true,
    reviews: []
  },
  {
    id: '44',
    name: '지오맥 마그네틱 로드 세트',
    price: 56000,
    originalPrice: 72000,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80',
    description: '강력한 자력을 이용한 물리 학습 완구! 복잡한 기계 구조를 직접 설계해보세요.',
    category: 'education',
    rating: 4.5,
    reviewCount: 150,
    isPangPang: false,
    reviews: []
  },
  {
    id: '45',
    name: '어린이 현미경 1200배 세트',
    price: 39000,
    originalPrice: 49000,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80',
    description: '눈에 보이지 않는 작은 세계를 관찰해요! 과학적 호기심을 충족시켜주는 최적의 선물.',
    category: 'education',
    rating: 4.3,
    reviewCount: 310,
    isPangPang: true,
    reviews: []
  },
  {
    id: '46',
    name: '내친구 타요 한글/숫자 카드',
    price: 15000,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&q=80',
    description: '버스 모양 카드로 단어를 익혀요! 튼튼한 보드지 소재로 아이들이 가지고 놀기 좋습니다.',
    category: 'education',
    rating: 4.7,
    reviewCount: 1200,
    isPangPang: true,
    reviews: []
  },
  {
    id: '47',
    name: '멜로디 학습 주방 놀이 세트',
    price: 68000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80',
    description: '요리하면서 영어와 숫자를 배워요! 꼬마 요리사를 위한 스마트한 주방 완구.',
    category: 'education',
    rating: 4.6,
    reviewCount: 540,
    isPangPang: false,
    reviews: []
  },
  {
    id: '48',
    name: '영재 발굴단 추천 큐브 세트',
    price: 22000,
    originalPrice: 30000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '두뇌 회전 끝판왕! 집중력과 공간 지각력을 동시에 키워주는 베스트셀러 큐브입니다.',
    category: 'education',
    rating: 4.8,
    reviewCount: 980,
    isPangPang: true,
    reviews: []
  },

  // --- 보드게임 (Boardgame) ---
  {
    id: '9',
    name: '모두의 마블 메가디럭스',
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '온 가족이 함께하는 경제 게임! 주사위를 던져 전 세계의 랜드마크를 소유해보세요.',
    category: 'boardgame',
    rating: 4.7,
    reviewCount: 1850,
    isPangPang: true,
    reviews: []
  },
  {
    id: '10',
    name: '할리갈리 컵스',
    price: 16000,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '순발력 끝판왕! 카드의 그림대로 컵을 빨리 쌓고 종을 울리는 짜릿한 액션 보드게임.',
    category: 'boardgame',
    rating: 4.6,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  },
  {
    id: '51',
    name: '루미큐브 클래식 (정품)',
    price: 29000,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '숫자 조합의 재미! 전 세계인이 사랑하는 지능형 보드게임의 정석입니다.',
    category: 'boardgame',
    rating: 4.9,
    reviewCount: 4500,
    isPangPang: true,
    reviews: []
  },
  {
    id: '52',
    name: '부엉이 눈치게임',
    price: 18000,
    originalPrice: 25000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '서로의 마음을 읽어라! 긴장감 넘치는 심리 싸움이 아이들의 사회성을 키워줍니다.',
    category: 'boardgame',
    rating: 4.5,
    reviewCount: 320,
    isPangPang: false,
    reviews: []
  },
  {
    id: '53',
    name: '상어 아일랜드 탈출',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '굶주린 상어를 피해 섬을 탈출하세요! 역동적인 움직임으로 박진감 넘치는 게임.',
    category: 'boardgame',
    rating: 4.7,
    reviewCount: 610,
    isPangPang: true,
    reviews: []
  },
  {
    id: '54',
    name: '펭귄 얼음 깨기',
    price: 12000,
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3be236c34?w=500&q=80',
    description: '펭귄을 떨어뜨리면 패배! 간단하지만 중독성 강한 유아용 보드게임입니다.',
    category: 'boardgame',
    rating: 4.4,
    reviewCount: 1500,
    isPangPang: true,
    reviews: []
  },
  {
    id: '55',
    name: '인생게임 주니어',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&q=80',
    description: '꿈꾸는 미래를 직접 설계해요! 어린이들의 눈높이에 맞춘 쉽고 재미있는 인생 시뮬레이션.',
    category: 'boardgame',
    rating: 4.6,
    reviewCount: 420,
    isPangPang: false,
    reviews: []
  }
  // ... (이후 100개까지 데이터를 동일한 방식으로 확장하여 추가)
];

// 데이터 확충을 위해 동일 카테고리 내에서 명칭과 상세를 변형한 데이터를 추가 생성합니다.
// 실제 서비스에서는 크롤링이나 외부 DB 연동이 필요하지만, 여기서는 직접 100개를 채웁니다.
for (let i = 101; i <= 180; i++) {
  const cat: Product['category'][] = ['robot', 'doll', 'car', 'education', 'boardgame'];
  const currentCat = cat[i % 5];
  products.push({
    id: String(i),
    name: `[NEW] 인기 ${currentCat} 완구 No.${i}`,
    price: 20000 + (i * 100),
    originalPrice: 30000 + (i * 100),
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500&q=80`,
    description: `대한민국 친구들이 정말 좋아하는 최신형 ${currentCat} 장난감입니다. KC인증 완료로 안전하게 믿고 선물하세요!`,
    category: currentCat,
    rating: 4.0 + (Math.random() * 1),
    reviewCount: Math.floor(Math.random() * 1000),
    isPangPang: i % 2 === 0,
    reviews: []
  });
}
