import React from 'react';
import Checkbox from '@/components/Checkbox';

export interface HeaderProps {
  isChecked: boolean;
  handleCheckboxChange: (checked: boolean) => void;
}

const Header = (props: HeaderProps) => {
  const { isChecked, handleCheckboxChange } = props;
  return (
    <main className="w-full flex justify-between items-center">
      <section className="w-full flex gap-6">
        <h1 className="text-2xl font-bold">Task List</h1>
        <button className="p-1 bg-blue-500 text-white rounded">新增任務</button>
      </section>
      <section className="w-1/4 flex items-center gap-2">
        <Checkbox
          isChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        <h3 className="text-xl font-bold text-blue-200">
          {isChecked ? '隱藏已完成任務' : '顯示已完成任務'}
        </h3>
      </section>
    </main>
  );
};

export default Header;
