'use client';

import React, { useState } from 'react';
import Header from '@/app/(home)/components/Header';
import { AddTask, TaskPreview } from '@/types/task';
import Table from '@/components/Table';
import AddListContent from '../components/AddListContent';
import {
  addNewTask,
  deleteTask,
  editTask,
  updateTaskState,
} from '@/actions/task';
import { useTaskListPagination } from '@/hooks/useTaskListPagination';

const DesktopOrMobile = () => {
  const [showCompleted, setShowCompleted] = useState(true);

  const {
    isLoading,
    pageData,
    currentPage,
    isFirstPage,
    isLastPage,
    goToNextPage,
    goToPrevPage,
    updateTasks,
  } = useTaskListPagination();

  const handleAddTask = async (newTaskData: AddTask) => {
    await addNewTask(newTaskData);
    await updateTasks();
  };

  const onTaskDelete = async (taskId: number) => {
    await deleteTask(taskId);
    await updateTasks();
  };

  const onTaskEdit = async (taskId: number, updatedTask: TaskPreview) => {
    await editTask(taskId, updatedTask);
    await updateTasks();
  };

  const onTaskStateUpdate = async (taskId: number) => {
    await updateTaskState(taskId);
    await updateTasks();
  };

  const handleCheckboxChange = (checked: boolean) => {
    setShowCompleted(checked);
  };

  const filteredTasks = pageData.tasksData.filter(
    (task) => showCompleted || !task.is_completed,
  );

  return (
    <main className="w-full flex flex-col gap-3">
      <Header
        showCompleted={showCompleted}
        handleCheckboxChange={handleCheckboxChange}
      />
      <AddListContent addTask={handleAddTask} />
      <Table
        loading={isLoading}
        tasks={filteredTasks}
        currentPage={currentPage}
        hasNextPage={!isLastPage}
        hasPrevPage={!isFirstPage}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
        onTaskDelete={onTaskDelete}
        onTaskEdit={onTaskEdit}
        onTaskStateUpdate={onTaskStateUpdate}
      />
    </main>
  );
};

export default DesktopOrMobile;
