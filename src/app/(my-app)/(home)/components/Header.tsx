import React from 'react';
import Checkbox from '@/components/Checkbox';

export interface HeaderProps {
  showCompleted: boolean;
  handleCheckboxChange: (checked: boolean) => void;
}

const Header = (props: HeaderProps) => {
  const { showCompleted, handleCheckboxChange } = props;
  return (
    <main className="w-full flex items-center gap-8">
      <section className="flex gap-6">
        <h1 className="text-2xl font-bold">Task List</h1>
      </section>
      <section className="flex items-center gap-2">
        <Checkbox
          isChecked={showCompleted}
          onCheckboxChange={handleCheckboxChange}
        />
        <h3 className="text-xl font-bold text-blue-200">
          {!showCompleted ? '隱藏已完成任務' : '顯示已完成任務'}
        </h3>
      </section>
    </main>
  );
};

export default Header;
