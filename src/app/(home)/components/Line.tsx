'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface ILineButtonProps {
  lineIdUrl: string; // ex: "https://line.me/ti/p/xxxx"
  isMobile?: boolean;
}

const CONSTANTS = {
  BUTTON_WIDTH: 80,
  DRAG_OFFSET: 36,
  DRAG_EDGE_MARGIN: 4,
};

const LineFloatingButton = ({
  lineIdUrl,
  isMobile = false,
}: ILineButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    hasDragged: false,
    startPos: { x: 0, y: 0 },
  });

  const widgetPosition = isMobile
    ? 'fixed bottom-14 right-1'
    : 'fixed bottom-1 right-1';

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStateRef.current = {
      isDragging: true,
      hasDragged: false,
      startPos: { x: e.clientX, y: e.clientY },
    };
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!dragStateRef.current.isDragging || !buttonRef.current) return;

    const parent = buttonRef.current.parentElement;
    const parentRect = parent?.getBoundingClientRect();
    if (!parentRect) return;

    const rightPosition =
      parentRect.width - (e.clientX - parentRect.left + CONSTANTS.DRAG_OFFSET);
    const bottomPosition =
      window.innerHeight - (e.clientY + CONSTANTS.DRAG_OFFSET);

    const clampedRight = Math.max(
      CONSTANTS.DRAG_EDGE_MARGIN,
      Math.min(rightPosition, parentRect.width - CONSTANTS.BUTTON_WIDTH),
    );
    const clampedBottom = Math.max(
      CONSTANTS.DRAG_EDGE_MARGIN,
      Math.min(bottomPosition, window.innerHeight - CONSTANTS.BUTTON_WIDTH),
    );

    gsap.to(buttonRef.current, {
      right: clampedRight,
      bottom: clampedBottom,
      duration: 0.1,
      ease: 'power1',
    });
  };

  const handlePointerUp = () => {
    dragStateRef.current.isDragging = false;
    setTimeout(() => {
      dragStateRef.current.hasDragged = false;
    }, 0);
  };

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleClick = () => {
    if (!dragStateRef.current.hasDragged) {
      window.open(lineIdUrl, '_blank');
    }
  };

  return (
    <div
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className={cn('z-50', widgetPosition)}
    >
      <Button
        variant="ghost"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-20 h-20 shadow-lg"
      >
        {/* LINE logo SVG */}
        <Image src={'/Line.png'} alt={'line'} width={500} height={500} />
      </Button>
    </div>
  );
};

export default LineFloatingButton;
