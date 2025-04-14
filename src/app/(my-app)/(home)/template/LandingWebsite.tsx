'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import LineFloatingButton from '@/app/(my-app)/(home)/components/Line';
import { JsonObject, PaginatedDocs, TypeWithID } from 'payload';
import { Product } from '@payload-types';
import * as Progress from '@radix-ui/react-progress';

const PAGE_SIZE = 12;

const Loader = ({ hasMore }: { hasMore: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!hasMore) return;
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 100);
    return () => clearInterval(timer);
  }, [hasMore]);

  return (
    <div className="flex flex-col items-center justify-center text-white text-center py-10 bg-slate-950 space-y-4">
      {hasMore ? (
        <>
          <Progress.Root
            value={progress}
            className="relative overflow-hidden bg-slate-700 rounded-full w-64 h-3"
          >
            <Progress.Indicator
              className="bg-blue-600 w-full h-full transition-all duration-200"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </>
      ) : (
        <span className="text-xl font-bold">已載入全部商品</span>
      )}
    </div>
  );
};

const LandingWebsite = ({
  id,
  products,
}: {
  id: PaginatedDocs<JsonObject & TypeWithID>;
  products: PaginatedDocs<Product>;
}) => {
  const [product, setProduct] = useState<any[]>(products.docs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(products.hasNextPage);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (page === 1) {
      setPage(2);
      return;
    }
    const loadProducts = async () => {
      const res: Response = await fetch(
        `/api/products?page=${page}&limit=${PAGE_SIZE}`,
      );
      const data = (await res.json()) as PaginatedDocs<Product>;
      setProduct((prev) => [...prev, ...data.docs]);
      setHasMore(data.hasNextPage);
    };
    loadProducts();
  }, [page]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  return (
    <main>
      <header
        className="relative h-[300px]  sm:h-[600px] bg-cover bg-center z-50"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            歡迎來到我們的網站
          </h1>
        </div>
      </header>
      {/* 商品展示區 */}
      <div className="py-3 text-[30px] text-center text-white bg-slate-950">
        展品展示
      </div>
      <section className="w-full px-2 sm:px-72 py-10 grid grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-900">
        {product.map((item, index) => (
          <main
            key={index}
            className="relative group bg-slate-700 border border-slate-700 overflow-hidden shadow-lg rounded-lg"
          >
            <div className="relative aspect-[4/4] bg-gradient-to-br overflow-hidden group">
              <Image
                src={item.image.sizes.small.url}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 bg-gradient-to-br space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                {item.name}
              </h2>
              <p className="text-lg font-medium text-amber-600">
                現貨數量：{item.quantity}
              </p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
              <p className="text-sm">{item.description}</p>
            </div>
          </main>
        ))}
      </section>
      <div
        ref={loaderRef}
        className="text-white text-center py-10 bg-slate-950"
      >
        <Loader hasMore={hasMore} />
      </div>
      <LineFloatingButton lineIdUrl={id?.docs?.[0]?.lineId} />
    </main>
  );
};

export default LandingWebsite;
