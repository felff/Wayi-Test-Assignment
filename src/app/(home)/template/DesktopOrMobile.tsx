'use client';

import React, { useState } from 'react';
import Header from '@/app/(home)/components/Header';
import { TaskList } from '@/types/task';
import Table from '@/components/Table';

export interface Props {
  data: TaskList;
}

const DesktopOrMobile = (props: Props) => {
  const { data } = props;
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <main className="w-full">
      <Header
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Table tasks={data} />
    </main>
  );
};

export default DesktopOrMobile;
