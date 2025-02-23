'use client';

import React, { useState } from 'react';
import Header from '@/app/(home)/components/Header';
import { AddTask, TaskList } from '@/types/task';
import Table from '@/components/Table';
import AddListContent from '../components/AddListContent';
import { addNewTask, getTaskList } from '@/actions/task';

export interface Props {
  initialData: TaskList;
}

const DesktopOrMobile = (props: Props) => {
  const { initialData } = props;
  const [tasks, setTasks] = useState<TaskList>(initialData);
  const [showCompleted, setShowCompleted] = useState(true);

  const updateTasks = async () => {
    const { data }: { data: TaskList } = await getTaskList();
    setTasks(data);
  };

  const handleAddTask = async (newTaskData: AddTask) => {
    await addNewTask(newTaskData);
    await updateTasks();
  };

  const handleCheckboxChange = (checked: boolean) => {
    setShowCompleted(checked);
  };

  const filteredTasks = tasks.filter(
    (task) => showCompleted || !task.is_completed,
  );

  return (
    <main className="w-full flex flex-col gap-3">
      <Header
        showCompleted={showCompleted}
        handleCheckboxChange={handleCheckboxChange}
      />
      <AddListContent addTask={handleAddTask} />
      <Table tasks={filteredTasks} />
    </main>
  );
};

export default DesktopOrMobile;
