import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const imgMap = {
  robot: ['https://images.unsplash.com/photo-1531650661554-d18434743ef1', 'https://images.unsplash.com/photo-1558060370-d644479cb6f7'],
  doll: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1', 'https://images.unsplash.com/photo-1555448248-2571daf6344b'],
  car: ['https://images.unsplash.com/photo-1594732832278-abd644401426', 'https://images.unsplash.com/photo-1594930511826-64571db11660'],
  education: ['https://images.unsplash.com/photo-1585366119957-e9730b6d0f60', 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a'],
  boardgame: ['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09', 'https://images.unsplash.com/photo-1611996575749-79a3be236c34']
};

// 샘플 상세 페이지용 긴 이미지 (세로로 긴 제품 소개 이미지 시뮬레이션)
const detailImgUrl = "https://images.unsplash.com/photo-1531650661554-d18434743ef1?w=1000&q=80";

const coreProducts = [
  { id: 'rb-01', name: '헬로카봇 스톰 X 5단 합체', price: 65000, originalPrice: 82000, category: 'robot', brand: '초이락', manufacturer: '손오공', ageRange: '37개월 이상' },
  { id: 'rb-02', name: '또봇 V 캡틴폴리스', price: 42000, originalPrice: 55000, category: 'robot', brand: '영실업', manufacturer: '영실업', ageRange: '36개월 이상' },
  { id: 'dl-01', name: '캐치! 티니핑 마법의 하우스', price: 89000, originalPrice: 95000, category: 'doll', brand: 'SAMG', manufacturer: '토이저러스협력', ageRange: '4세 이상' },
  { id: 'cr-01', name: '타요 컨트롤 주차타워 세트', price: 49000, originalPrice: 62000, category: 'car', brand: '아이코닉스', manufacturer: '미미월드', ageRange: '3세 이상' },
  { id: 'ed-01', name: '레고 듀플로 세계 동물 탐험', price: 85000, originalPrice: 110000, category: 'education', brand: 'LEGO', manufacturer: '레고코리아', ageRange: '2세 이상' }
];

async function main() {
  console.log('--- 최신 상세 데이터 시딩 시작 ---');

  const hashedPassword = await bcrypt.hash('toypangpang2026', 10);
  await prisma.user.deleteMany({ where: { username: 'toypangpangadmin' } });
  await prisma.user.create({
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

  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.product.deleteMany({});

  for (const p of coreProducts) {
    const images = imgMap[p.category as keyof typeof imgMap];
    await prisma.product.create({
      data: {
        ...p,
        image: `${images[0]}?w=800&q=80`,
        detailImage: detailImgUrl,
        description: `${p.name}은 우리 아이들의 창의력과 즐거움을 위해 설계된 대한민국 대표 완구입니다. KC인증을 받은 안전한 상품입니다.`,
        rating: 4.8,
        reviewCount: 1500,
        isPangPang: true
      }
    });
  }

  const brands = {
    robot: ['또봇', '미니특공대', '메카드볼', '카봇'],
    doll: ['콩순이', '시크릿쥬쥬', '실바니안', '하츄핑'],
    car: ['타요', '폴리', '브루더', '핫휠'],
    education: ['레고', '맥포머스', '코딩펫', '핑크퐁'],
    boardgame: ['루미큐브', '할리갈리', '인생게임', '모노폴리']
  };

  for (let i = 1; i <= 100; i++) {
    const catKeys = ['robot', 'doll', 'car', 'education', 'boardgame'];
    const cat = catKeys[i % 5] as keyof typeof brands;
    const brandList = brands[cat];
    const brandName = brandList[i % brandList.length];
    
    const images = imgMap[cat];
    const selectedImg = images[i % images.length];

    await prisma.product.create({
      data: {
        id: `full-${i}`,
        name: `[인기] ${brandName} 시리즈 ${i}`,
        price: 30000 + (i * 500),
        originalPrice: 45000 + (i * 500),
        image: `${selectedImg}?w=800&q=80`,
        detailImage: detailImgUrl,
        description: `고급스러운 디자인과 튼튼한 내구성을 갖춘 ${brandName} 신상품입니다.`,
        category: cat,
        brand: brandName,
        manufacturer: '(주)토이팡팡협력사',
        ageRange: '3세 이상',
        rating: 4.0 + Math.random(),
        reviewCount: Math.floor(Math.random() * 3000),
        isPangPang: i % 2 === 0
      }
    });
  }
  console.log('✅ 상세 페이지 데이터 포함 시딩 완료!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
