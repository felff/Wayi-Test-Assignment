import { axiosClient } from '@/services';
import { AddTask, TaskList, TaskPreview, TaskType } from '@/types/task';

export const getTaskList = async (
  page: number = 1,
  pageType: TaskType = TaskType.all,
) => {
  const params = {
    page: page,
    pageType: pageType,
  };

  const res = await axiosClient.get('/task', {
    params: params,
  });
  const tasks: { data: TaskList; total: number } = res.data;
  return { data: tasks.data, total: tasks.total };
};

export const addNewTask = async (newTaskData: AddTask) => {
  await axiosClient.post('/task', newTaskData);
};

export const editTask = async (taskId: number, editTaskData: TaskPreview) => {
  const url = `/task/${taskId}`;
  await axiosClient.put(url, editTaskData);
};

export const updateTaskState = async (taskId: number) => {
  const url = `/task/${taskId}`;
  await axiosClient.patch(url);
};

export const deleteTask = async (taskId: number) => {
  const url = `/task/${taskId}`;
  await axiosClient.delete(url);
};
