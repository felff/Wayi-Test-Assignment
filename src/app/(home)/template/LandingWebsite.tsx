import React from 'react';
import Image from 'next/image';
import LineFloatingButton from '@/app/(home)/components/Line';

interface ILandingWebsiteProps {}

const LandingWebsite = (props: ILandingWebsiteProps) => {
  const {} = props;

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

  const Marquee = ({ items }: { items: string[] }) => {
    return (
      <div className="relative overflow-hidden whitespace-nowrap py-3">
        <div className="animate-marquee inline-block min-w-full">
          {items.map((item, index) => (
            <span
              key={index}
              className=" text-lg font-medium mx-8 inline-block"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main>
      <header
        className="relative  h-[600px] bg-cover bg-center z-50"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            歡迎來到我們的網站
          </h1>
        </div>
      </header>
      <div className="py-5 flex flex-col items-center justify-center  ">
        <Marquee
          items={[
            '🔥 限時折扣中',
            '🚀 新品上市',
            '🎁 滿額贈好禮',
            '📦 免運費活動進行中',
          ]}
        />
      </div>
      {/* 商品展示區 */}
      <section className="w-full px-72 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-100">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative w-full h-80 bg-gradient-to-br from-black to-gray-400 overflow-hidden group">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5  bg-gradient-to-br from-white to-gray-400 space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight leading-snug">
                {item.title}
              </h2>
              <p className="text-lg font-medium text-amber-600">
                ${item.price}
              </p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </section>
      <LineFloatingButton lineIdUrl="https://line.me/ti/p/你的LineID" />
    </main>
  );
};

export default LandingWebsite;
