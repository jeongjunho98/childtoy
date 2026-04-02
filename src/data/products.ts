export interface Review {
  id: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  color: string;
  tag: string | null;
  description: string;
  imageUrl: string;
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    title: "폭신폭신 곰돌이 인형", 
    price: "25,000", 
    color: "#FFB6C1", 
    tag: "BEST", 
    description: "최고급 면소재로 제작된 부드러운 곰돌이 인형입니다. 아이들이 잠잘 때 최고의 친구가 되어줄 거예요.",
    imageUrl: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&q=80",
    reviews: [
      { id: 'r1', userName: '도현맘', rating: 5, content: '너무 부드럽고 아이가 정말 좋아해요!', date: '2024-03-25' }
    ]
  },
  { 
    id: 2, 
    title: "블록 쌓기 레고 세트", 
    price: "45,000", 
    color: "#87CEEB", 
    tag: "매진임박", 
    description: "상상력을 자극하는 다양한 블록 세트입니다. 아이들의 창의력 발달에 아주 좋습니다.",
    imageUrl: "https://images.unsplash.com/photo-1585366119957-e5730b3d58e7?w=800&q=80",
    reviews: []
  },
  { 
    id: 3, 
    title: "무선 조종 슈퍼카", 
    price: "89,000", 
    color: "#FFD700", 
    tag: "HOT", 
    description: "강력한 모터와 빠른 속도를 자랑하는 무선 조종 슈퍼카입니다. 튼튼한 내구성으로 충격에 강합니다.",
    imageUrl: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&q=80",
    reviews: [
      { id: 'r2', userName: '민수아빠', rating: 4, content: '속도가 생각보다 빨라요. 밖에서 가지고 놀기 좋습니다.', date: '2024-03-20' }
    ]
  },
  { 
    id: 4, 
    title: "반짝반짝 요술봉", 
    price: "18,000", 
    color: "#DDA0DD", 
    tag: null, 
    description: "반짝이는 불빛과 신비로운 소리가 나는 요술봉입니다. 공주님 놀이 필수 아이템!",
    imageUrl: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=800&q=80",
    reviews: []
  },
  { 
    id: 5, 
    title: "공룡 탐험 피규어", 
    price: "32,000", 
    color: "#90EE90", 
    tag: "매진임박", 
    description: "실제 공룡의 모습을 정교하게 재현한 피규어 세트입니다. 공룡을 좋아하는 아이들에게 최고의 선물입니다.",
    imageUrl: "https://images.unsplash.com/photo-1558448291-20e39c42f494?w=800&q=80",
    reviews: []
  },
  { 
    id: 6, 
    title: "주방 놀이 풀세트", 
    price: "120,000", 
    color: "#F08080", 
    tag: "SALE", 
    description: "다양한 식기구와 모형 음식이 포함된 대형 주방 놀이 세트입니다. 역할 놀이를 통해 사회성을 길러주세요.",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80",
    reviews: []
  },
];
