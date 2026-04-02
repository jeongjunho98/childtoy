import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// 실제 제품군에 최적화된 고화질 Unsplash 이미지 ID 리스트
const imgMap = {
  robot: [
    'https://images.unsplash.com/photo-1531650661554-d18434743ef1', // Robot
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7', // Toy robot
    'https://images.unsplash.com/photo-1546776310-eef45dd6d63c', // Blue robot
    'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc', // Sci-fi
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b'  // Action figure
  ],
  doll: [
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1', // Toy house
    'https://images.unsplash.com/photo-1555448248-2571daf6344b', // Plush
    'https://images.unsplash.com/photo-1591021681931-137936660603', // Dolls
    'https://images.unsplash.com/photo-1513151233558-d860c5398176', // Kitchen play
    'https://images.unsplash.com/photo-1515488764276-beab7607c1e6'  // Baby doll
  ],
  car: [
    'https://images.unsplash.com/photo-1594732832278-abd644401426', // Toy bus/car
    'https://images.unsplash.com/photo-1594930511826-64571db11660', // Fire truck
    'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f', // Track
    'https://images.unsplash.com/photo-1591702548275-3ad0ca47474c', // Excavator
    'https://images.unsplash.com/photo-1516937941344-00b4e0337589'  // Race car
  ],
  education: [
    'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60', // Lego
    'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a', // Magnets
    'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91', // Tablet/Pad
    'https://images.unsplash.com/photo-1544928147-79a2dbc1f389', // Sound book
    'https://images.unsplash.com/photo-1564327487389-a0018f56b552'  // Coding toy
  ],
  boardgame: [
    'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09', // Monopoly
    'https://images.unsplash.com/photo-1611996575749-79a3be236c34', // Cards
    'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5', // Miniature house
    'https://images.unsplash.com/photo-1601314002592-b846038d2eff', // Colorful game
    'https://images.unsplash.com/photo-1611891487122-207579d67d98'  // Chess/Strategy
  ]
};

const productsData = [
  // --- 고유 핵심 제품군 ---
  { id: 'rb-01', name: '헬로카봇 스톰 X 5단 합체', price: 65000, originalPrice: 82000, category: 'robot', description: '자동차 5대가 하나로! 거대한 스톰 X로 변신합니다.' },
  { id: 'rb-02', name: '또봇 V 캡틴폴리스', price: 42000, originalPrice: 55000, category: 'robot', description: '도시를 지키는 경찰차 변신 로봇입니다.' },
  { id: 'dl-01', name: '캐치! 티니핑 마법의 하우스', price: 89000, originalPrice: 95000, category: 'doll', description: '티니핑 친구들의 예쁜 집과 소품 세트.' },
  { id: 'cr-01', name: '타요 컨트롤 주차타워 세트', price: 49000, originalPrice: 62000, category: 'car', description: '엘리베이터가 작동하는 3층 주차타워.' },
  { id: 'ed-01', name: '레고 듀플로 세계 동물 탐험', price: 85000, originalPrice: 110000, category: 'education', description: '영유아 맞춤형 거대 블록 학습 세트.' },
  { id: 'bg-01', name: '모두의 마블 메가디럭스', price: 38000, originalPrice: 48000, category: 'boardgame', description: '온 가족이 즐기는 국민 경제 게임.' }
];

async function main() {
  console.log('--- DB 시딩 시작 ---');

  // 1. 관리자 계정 생성 (확실하게 업데이트)
  const hashedPassword = await bcrypt.hash('toypangpang2026', 10);
  
  // 기존 중복 관리자 제거
  await prisma.user.deleteMany({ where: { username: 'admin' } });
  await prisma.user.deleteMany({ where: { username: 'toypangpangadmin' } });

  const admin = await prisma.user.create({
    data: {
      username: 'toypangpangadmin',
      password: hashedPassword,
      name: '토이팡팡관리자',
      email: 'admin@toypang.com',
      phone: '010-4851-7984',
      address: '전라남도 나주시 중야1길 37',
      detailAddress: '대방엘리움1차아파트 106동 1401호',
      role: 'ADMIN'
    }
  });
  console.log('✅ 관리자 계정 생성 완료:', admin.username);

  // 2. 상품 데이터 초기화 및 생성
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('📦 상품 데이터 생성 중...');
  
  // 핵심 상품 시딩
  for (const p of productsData) {
    const images = imgMap[p.category as keyof typeof imgMap];
    await prisma.product.create({
      data: {
        ...p,
        image: `${images[0]}?w=800&q=80`,
        rating: 4.5 + Math.random() * 0.5,
        reviewCount: 100 + Math.floor(Math.random() * 5000),
        isPangPang: true
      }
    });
  }

  // 대한민국 인기 브랜드 기반 100개 확장 (중복 NO, 번호 NO)
  const brandNames = {
    robot: ['또봇 기간트 V', '미니특공대 티라볼트', '메카드볼 아칸', '파워레인저 돈브라더즈', '카봇 윙라이온', '바이클론즈 우르사', '지오메카 레오'],
    doll: ['콩순이 냉장고', '시크릿쥬쥬 별의여신', '실바니안 이층집', '미미 패션쇼', '아기상어 인형', '하츄핑 소파', '조아핑 침대'],
    car: ['타요 라니', '타요 가니', '로보카폴리 로이', '브루더 소방차', '핫휠 가라지', '토미카 레일', '페라리 푸쉬카'],
    education: ['레고 시티 소방서', '맥포머스 마스터', '코딩펫 밀키', '핑크퐁 한글가방', '뽀로로 코딩패드', '지오맥 마그네틱'],
    boardgame: ['루미큐브 클래식', '할리갈리 컵스', '인생게임 주니어', '클루 추리', '모노폴리 K-부동산', '펭귄 얼음깨기']
  };

  for (let i = 1; i <= 100; i++) {
    const categoryKeys = ['robot', 'doll', 'car', 'education', 'boardgame'];
    const cat = categoryKeys[i % 5] as keyof typeof brandNames;
    const names = brandNames[cat];
    const baseName = names[i % names.length];
    
    const prefixes = ['[정품] ', '[한정] ', '[인기] ', '✨ '];
    const suffixes = [' Pro', ' 플러스', ' 에디션', ''];
    const finalName = `${prefixes[i % 4]}${baseName}${suffixes[i % 4]}`;

    const images = imgMap[cat];
    const selectedImg = images[i % images.length];

    await prisma.product.create({
      data: {
        id: `uniq-${i}`,
        name: finalName,
        price: 30000 + (i * 500),
        originalPrice: 45000 + (i * 500),
        image: `${selectedImg}?w=800&q=80`,
        description: `대한민국 아이들이 가장 선호하는 ${baseName} 시리즈! 안전 검증을 마친 정품 완구입니다.`,
        category: cat,
        rating: 4.0 + Math.random() * 1,
        reviewCount: 50 + Math.floor(Math.random() * 2000),
        isPangPang: i % 2 === 0
      }
    });
  }

  console.log('✅ 모든 시딩이 완료되었습니다!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
