'use client';

import React, { useEffect, useState } from 'react';
import LineFloatingButton from '@/app/(my-app)/(home)/components/Line';
import { JsonObject, PaginatedDocs, TypeWithID } from 'payload';
import { Media, Product } from '@payload-types';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_SIZE = 12;

const Loader = ({ hasMore }: { hasMore: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-5 bg-slate-900">
      {hasMore ? (
        <div className="flex flex-col items-start space-y-3">
          <div className="flex gap-4">
            <Skeleton className="h-[125px] w-[150px] rounded-xl bg-white/30" />
            <Skeleton className="h-[125px] w-[150px] rounded-xl bg-white/30" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-white/30" />
            <Skeleton className="h-4 w-[200px] bg-white/30" />
          </div>
        </div>
      ) : (
        <span className="text-xl font-bold text-white pb-20">
          已載入全部商品
        </span>
      )}
    </div>
  );
};

// 產品卡片組件，將產品展示邏輯抽出來
const ProductCard = ({ item }: { item: Product }) => {
  const img = item.image as Media;
  return (
    <div className="relative group bg-slate-700 border border-slate-700 overflow-hidden shadow-lg rounded-lg">
      <div className="relative aspect-[4/4] bg-gradient-to-br overflow-hidden group">
        <Image
          src={img.url || ''}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 bg-gradient-to-br space-y-2">
        <h2 className="text-sm sm:text-xl font-bold text-white tracking-tight leading-snug">
          {item.name}
        </h2>
        <p className="text-sm sm:text-lg font-medium text-amber-600">
          現貨數量：{item.quantity}
        </p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
        <p className="text-sm">{item.description}</p>
      </div>
    </div>
  );
};

// 接收初始產品數據作為props
const LandingWebsite = ({
  id,
  initialProducts,
  hasNextPage,
}: {
  id: PaginatedDocs<JsonObject & TypeWithID>;
  initialProducts?: Product[];
  hasNextPage?: boolean;
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [page, setPage] = useState(
    initialProducts && initialProducts.length > 0 ? 2 : 1,
  );
  const [hasMore, setHasMore] = useState(
    hasNextPage !== undefined ? hasNextPage : true,
  );
  const [isLoading, setIsLoading] = useState(false);

  // 使用 react-intersection-observer 替代自定義 IntersectionObserver
  const { ref: loaderRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      console.log('hasNextPage', hasNextPage);
      loadMoreProducts();
    }
  }, [inView, hasMore]);
  // 加載更多產品的函數
  const loadMoreProducts = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?page=${page}&limit=${PAGE_SIZE}`,
      );
      const data = (await res.json()) as PaginatedDocs<Product>;
      // 使用函數式更新來確保狀態更新正確
      setProducts((prev) => [...prev, ...data.docs]);
      setHasMore(data.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <header
        className="relative aspect-[6/4] bg-cover bg-bottom z-50"
        style={{ backgroundImage: "url('/bgs.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            德運閣泰梵文化
          </h1>
        </div>
      </header>

      {/* 商品展示區 */}
      <div className="py-3 text-[20px] sm:text-[30px] text-center text-white bg-amber-950 font-bold">
        產品展示
      </div>

      <section className="w-full px-2 sm:px-72 py-10 grid grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-900">
        {products.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </section>
      <div ref={loaderRef} className="text-white text-center">
        <Loader hasMore={hasMore} />
      </div>
      <LineFloatingButton lineIdUrl={id?.docs?.[0]?.lineId} />
    </main>
  );
};

export default LandingWebsite;
