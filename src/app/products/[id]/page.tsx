'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./product.module.css";
import homeStyles from "../../page.module.css";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const params = useParams();
  const { addToCart, cart } = useCart();
  
  const id = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return <div className="container">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <header className={homeStyles.header}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
          <nav className={homeStyles.nav}>
            <Link href="/">홈</Link>
            <Link href="/cart">장바구니 ({cart.length})</Link>
          </nav>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.detailWrapper}>
          <div 
            className={styles.imageArea} 
            style={{ backgroundColor: product.color }}
          >
            {product.title} 이미지
          </div>
          <div className={styles.infoArea}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>{product.price}원</p>
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.btnGroup}>
              <button 
                className={styles.cartBtn}
                onClick={() => addToCart(product)}
              >
                장바구니 담기
              </button>
              <button className={styles.buyBtn}>바로 구매하기</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
