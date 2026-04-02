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

// 고화질 장난감 이미지 소스 (검증된 Unsplash ID)
const imgSources = {
  robot: [
    'https://images.unsplash.com/photo-1546776310-eef45dd6d63c',
    'https://images.unsplash.com/photo-1589254065878-42c9da997008',
    'https://images.unsplash.com/photo-1531650661554-d18434743ef1',
    'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc',
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b'
  ],
  doll: [
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1',
    'https://images.unsplash.com/photo-1555448248-2571daf6344b',
    'https://images.unsplash.com/photo-1591021681931-137936660603',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176',
    'https://images.unsplash.com/photo-1515488764276-beab7607c1e6'
  ],
  car: [
    'https://images.unsplash.com/photo-1594732832278-abd644401426',
    'https://images.unsplash.com/photo-1594930511826-64571db11660',
    'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f',
    'https://images.unsplash.com/photo-1591702548275-3ad0ca47474c',
    'https://images.unsplash.com/photo-1516937941344-00b4e0337589'
  ],
  education: [
    'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60',
    'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a',
    'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91',
    'https://images.unsplash.com/photo-1544928147-79a2dbc1f389',
    'https://images.unsplash.com/photo-1564327487389-a0018f56b552'
  ],
  boardgame: [
    'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09',
    'https://images.unsplash.com/photo-1611996575749-79a3be236c34',
    'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5',
    'https://images.unsplash.com/photo-1601314002592-b846038d2eff',
    'https://images.unsplash.com/photo-1611891487122-207579d67d98'
  ]
};

export const products: Product[] = [
  // --- 헬로카봇 ---
  {
    id: '1',
    name: '헬로카봇 스톰 X 5단 합체 로봇',
    price: 65000,
    originalPrice: 82000,
    image: `${imgSources.robot[0]}?w=500&q=80`,
    description: '대한민국 대표 변신 로봇! 5대의 자동차가 합체하여 거대한 스톰 X가 됩니다.',
    category: 'robot',
    rating: 4.8,
    reviewCount: 1250,
    isPangPang: true,
    reviews: []
  },
  {
    id: '2',
    name: '헬로카봇 펜타스톰 X 최종진화형',
    price: 158000,
    originalPrice: 180000,
    image: `${imgSources.robot[2]}?w=500&q=80`,
    description: '역대 카봇 중 가장 거대한 크기를 자랑하는 프리미엄 합체 로봇입니다.',
    category: 'robot',
    rating: 4.9,
    reviewCount: 2100,
    isPangPang: true,
    reviews: []
  },
  // --- 캐치! 티니핑 ---
  {
    id: '4',
    name: '캐치! 티니핑 마법의 하우스 플레이세트',
    price: 89000,
    originalPrice: 95000,
    image: `${imgSources.doll[0]}?w=500&q=80`,
    description: '티니핑 친구들의 아기자기한 집! 다양한 소품으로 인형놀이를 즐겨보세요.',
    category: 'doll',
    rating: 4.9,
    reviewCount: 2310,
    isPangPang: true,
    reviews: []
  },
  {
    id: '106',
    name: '캐치! 티니핑 미스틱 하트윙 마법패드',
    price: 68000,
    originalPrice: 75000,
    image: `${imgSources.doll[3]}?w=500&q=80`,
    description: '실제 티니핑을 캐치하는 인터랙티브 완구! 카메라와 게임 기능이 포함되어 있습니다.',
    category: 'doll',
    rating: 4.8,
    reviewCount: 1500,
    isPangPang: true,
    reviews: []
  }
];

// 대한민국 실제 제품명 리스트
const realProductNames = {
  robot: ['또봇 V 캡틴폴리스', '또봇 기간트 V', '미니특공대 슈퍼공룡파워 티라볼트', '미니특공대 애니멀트론 레오', '메카드볼 아칸', '파워레인저 돈브라더즈 돈 오니타이진', '지오메카 캡틴다이노', '카봇 윙라이온', '벅스봇 이그니션 배틀세트', '바이클론즈 우르사'],
  doll: ['콩순이 말하는 냉장고', '시크릿쥬쥬 별의여신 인형', '미미월드 프린세스 미미 대저택', '실바니안 불이 들어오는 이층집', '베이비얼라이브 맘마를 먹어요', '몰랑이 피규어 컬렉션', '뽀로로 마트 계산대 놀이', '핑크퐁 아기상어 봉제인형', '캐치 티니핑 봉제인형', '하프의 베이커리 하우스'],
  car: ['타요 컨트롤 주차타워', '타요 긴급출동 센터', '브루더 맥 트럭 소방차', '브루더 캣 대형 굴삭기', '로보카폴리 다이캐스팅 세트', '핫휠 가라지 세차장', '토미카 기차 레일 세트', '마조렛 슈퍼 시티 트랙', '뽀로로 무선 조정 소방차', '페라리 전동 푸쉬카'],
  education: ['레고 듀플로 세계 동물 탐험', '레고 시티 소방서', '맥포머스 마스터 마인드 세트', '코딩펫 밀키 스마트 로봇', '핑크퐁 상어가족 사운드북', '지오맥 마그네틱 로드', '어린이 과학 현미경 1200배', '뽀로로 한글 쓰기 패드', '자석 가베 블록 세트', '창의력 쑥쑥 모래놀이 세트'],
  boardgame: ['모두의 마블 메가디럭스', '할리갈리 컵스 액션게임', '루미큐브 클래식 정품', '상어 아일랜드 탈출 대작전', '인생게임 주니어 하스브로', '다비치 코드 숫자 추리게임', '젠가 클래식 우드게임', '스플렌더 주니어 경제게임', '펭귄 얼음 깨기', '우노 카드게임 리프레시']
};

// 총 120개까지 데이터 자동 확충 (번호 제거, 이미지 복구)
const categories: Product['category'][] = ['robot', 'doll', 'car', 'education', 'boardgame'];

for (let i = 1; i <= 120; i++) {
  // 이미 존재하는 ID(1, 2, 4, 106)는 건너뜀
  if (['1', '2', '4', '106'].includes(String(i))) continue;

  const currentCat = categories[i % 5];
  const nameList = realProductNames[currentCat];
  const baseName = nameList[i % nameList.length];
  
  // 제품명에 수식어를 붙여 다양성 확보 (No. 제거)
  const prefix = i % 3 === 0 ? '[정품] ' : (i % 3 === 1 ? '[인기] ' : '');
  const suffix = i % 2 === 0 ? ' (최신형)' : '';
  const finalName = `${prefix}${baseName}${suffix}`;

  // 유효한 이미지 소스 할당
  const sourceImages = imgSources[currentCat];
  const selectedImg = sourceImages[i % sourceImages.length];

  products.push({
    id: String(i),
    name: finalName,
    price: 28000 + (i * 350),
    originalPrice: 38000 + (i * 350),
    image: `${selectedImg}?w=500&q=80`,
    description: `대한민국 아이들이 가장 사랑하는 ${baseName} 시리즈! 안전한 소재로 제작되어 안심하고 가지고 놀 수 있습니다.`,
    category: currentCat,
    rating: 4.2 + (Math.random() * 0.7),
    reviewCount: 50 + Math.floor(Math.random() * 3000),
    isPangPang: i % 2 === 0,
    reviews: []
  });
}
