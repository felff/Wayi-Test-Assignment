import React from 'react';
import Image from 'next/image';
import LineFloatingButton from '@/app/(my-app)/(home)/components/Line';

import { getLineID, getProducts } from '@/actions/payload';

const LandingWebsite = async () => {
  const items = [
    {
      image: '/test1.jpg',
      title: '酷炫商品 1',
      price: '199',
      description: '這是一個很棒的商品，提供極致體驗。',
    },
    {
      image: '/test2.jpg',
      title: '熱銷商品 2',
      price: '299',
      description: '滑鼠懸停就能看到這段描述內容！',
    },
    {
      image: '/test3.jpg',
      title: '限量商品 3',
      price: '399',
      description: '數量有限，售完為止，快來搶購！',
    },
    {
      image: '/test4.jpg',
      title: '經典商品 4',
      price: '499',
      description: '經典不敗，值得收藏的優質選擇。',
    },
    {
      image: '/test1.jpg',
      title: '酷炫商品 1',
      price: '199',
      description: '這是一個很棒的商品，提供極致體驗。',
    },
    {
      image: '/test2.jpg',
      title: '熱銷商品 2',
      price: '299',
      description: '滑鼠懸停就能看到這段描述內容！',
    },
    {
      image: '/test3.jpg',
      title: '限量商品 3',
      price: '399',
      description: '數量有限，售完為止，快來搶購！',
    },
    {
      image: '/test4.jpg',
      title: '經典商品 4',
      price: '499',
      description: '經典不敗，值得收藏的優質選擇。',
    },
    {
      image: '/test1.jpg',
      title: '酷炫商品 1',
      price: '199',
      description: '這是一個很棒的商品，提供極致體驗。',
    },
    {
      image: '/test2.jpg',
      title: '熱銷商品 2',
      price: '299',
      description: '滑鼠懸停就能看到這段描述內容！',
    },
    {
      image: '/test3.jpg',
      title: '限量商品 3',
      price: '399',
      description: '數量有限，售完為止，快來搶購！',
    },
    {
      image: '/test4.jpg',
      title: '經典商品 4',
      price: '499',
      description: '經典不敗，值得收藏的優質選擇。',
    },
  ];
  const id = await getLineID();
  const products = await getProducts();
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
        {products.docs.map((item, index) => (
          <div
            key={index}
            className="relative group bg-slate-700 border border-slate-700 overflow-hidden shadow-lg rounded-lg"
          >
            <div className="relative aspect-[4/4] bg-gradient-to-br overflow-hidden group">
              <Image
                src={item.image.url}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 bg-gradient-to-br space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                {item.name}
              </h2>
              <p className="text-lg font-medium text-amber-600">現貨數量：1</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </section>
      <LineFloatingButton
        lineIdUrl={`https://line.me/ti/p/${id.docs[0]?.lineId}`}
      />
    </main>
  );
};

export default LandingWebsite;
