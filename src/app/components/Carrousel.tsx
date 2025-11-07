import React, { useEffect, useRef } from 'react'
import LeftArrowIcon from "@/svg/left-arrow-svgrepo-com.svg"
import RightArrowIcon from "@/svg/right-arrow-svgrepo-com.svg"
import { useProducts } from '../hooks/useProducts';
import ProductCardCarrousel from './ProductCardCarrousel';
import productStore from '../store/productStore';
import Loading from './Loading/Loading';

export default function Carrousel() {
  // hooks
  const { getProducts } = useProducts()

  // stores
  const products = productStore((state) => state.products).slice(-8)

  // Scrolling logic
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Vertical scroll to horizontal on the carrousel
  useEffect(() => {
    getProducts()
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  if (products.length === 0) {
    return (
      <Loading />
    )
  }

  return (
    <div className='h-110 px-20 relative w-full flex items-center'>
      <button className='absolute left-3 top-1/2 -translate-y-1/2' onClick={() => scroll("left")}>
        <LeftArrowIcon width={50} height={50} className="cursor-pointer fill-[var(--lightgray)] hover:scale-110 duration-200"/>
      </button>

      <div ref={scrollRef} className="h-full flex gap-20 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory" style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] flex-shrink-0 snap-center flex items-center justify-center">
            <ProductCardCarrousel product={product} />
          </div>
        ))}
      </div>

      <button className='absolute right-3 top-1/2 -translate-y-1/2' onClick={() => scroll("right")}>
        <RightArrowIcon width={50} height={50} className="cursor-pointer fill-[var(--lightgray)] hover:scale-110 duration-200"/>
      </button>
    </div>
  )
}
