import { Task, TaskList } from '@/types/task';
import React from 'react';

type TaskTableProps = {
  tasks: TaskList;
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
};

const Table = (props: TaskTableProps) => {
  const { tasks } = props;
  return (
    <div>
      <table className="mt-4 w-full border border-gray-300">
        <thead>
          <tr className="border border-gray-300 text-slate-400 text-xl font-bold">
            <th className="text-left p-2 border border-gray-300">任務名稱</th>
            <th className="text-left p-2 border border-gray-300">描述</th>
            <th className="text-left p-2 border border-gray-300">完成狀態</th>
            <th className="text-left p-2 border border-gray-300">操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border border-gray-300">
              <td className="text-left p-2 border border-gray-300 font-bold">
                {task.name}
              </td>
              <td className="text-left p-2 border border-gray-300">
                {task.description ? task.description : '-'}
              </td>
              <td className="text-left p-2 border border-gray-300">
                {task.is_completed ? '已完成' : '未完成'}
              </td>
              <td className="text-left p-2 border border-gray-300">
                <button className="mr-2 p-1 bg-blue-500 text-white rounded">
                  {task.is_completed ? '標記為未完成' : '標記為已完成'}
                </button>
                <button className="p-1 bg-red-500 text-white rounded">
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
