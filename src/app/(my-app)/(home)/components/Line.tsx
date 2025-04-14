'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

interface ILineButtonProps {
  lineIdUrl: string; // ex: "https://line.me/ti/p/xxxx"
  isMobile?: boolean;
}

const LineFloatingButton = ({
  lineIdUrl,
  isMobile = false,
}: ILineButtonProps) => {
  const widgetPosition = isMobile
    ? 'fixed bottom-14 right-1'
    : 'fixed bottom-1 right-1';

  const handleClick = () => {
    window.open(lineIdUrl, '_blank');
  };

  return (
    <div onClick={handleClick} className={cn('z-50', widgetPosition)}>
      <button className="relative text-[13px] backdrop-blur bg-slate-500/60 rounded-2xl border-green-600 text-white w-24 h-24 shadow-lg flex flex-col justify-center items-center font-bold px-2 gap-2">
        <Image src={'/Line.png'} alt={'line'} width={40} height={40} />
        點擊聯絡老師
      </button>
    </div>
  );
};

export default LineFloatingButton;
