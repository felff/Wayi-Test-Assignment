import { cn } from '@/lib/utils';
import { Task, TaskList, TaskPreview } from '@/types/task';
import Arrow from '@/assets/arrow.svg';
import React, { useState } from 'react';

interface TaskTableProps {
  tasks: TaskList;
  loading: boolean;
  currentPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onTaskStateUpdate: (taskId: number) => Promise<void>;
  onTaskDelete: (taskId: number) => Promise<void>;
  onTaskEdit: (taskId: number, updatedTask: TaskPreview) => Promise<void>;
}

const Table = (props: TaskTableProps) => {
  const {
    tasks,
    loading,
    currentPage,
    hasNextPage,
    hasPrevPage,
    onTaskDelete,
    onTaskStateUpdate,
    onNextPage,
    onPrevPage,
    onTaskEdit,
  } = props;

  return (
    <main>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="border border-gray-300 text-slate-400 text-xl font-bold">
            <th className="text-left p-2 border border-gray-300">任務名稱</th>
            <th className="text-left p-2 border border-gray-300">描述</th>
            <th className="text-left p-2 border border-gray-300">創建時間</th>
            <th className="text-left p-2 border border-gray-300">更新時間</th>
            <th className="text-left p-2 border border-gray-300">完成狀態</th>
            <th className="text-left p-2 border border-gray-300">操作</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onUpdateTaskState={onTaskStateUpdate}
                onDeleteTask={onTaskDelete}
                onEditTask={onTaskEdit}
              />
            ))}
        </tbody>
      </table>
      {loading && (
        <section className="w-full h-80 flex items-center justify-center border border-gray-300">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-400"></div>
        </section>
      )}
      <section className="w-full flex gap-2 ml-auto">
        <div
          className={cn(
            'flex size-10 rotate-180 items-center justify-center',
            !hasPrevPage ? 'cursor-default' : 'cursor-pointer',
          )}
          onClick={onPrevPage}
        >
          <Arrow color={!hasPrevPage ? '#51516A' : 'white'} />
        </div>
        <div className="flex items-center justify-center rounded-lg text-lg font-bold ">
          <div className="w-[2.969rem] text-center text-white">
            {currentPage}
          </div>
        </div>
        <div
          className={cn(
            'flex size-10 items-center justify-center',
            !hasNextPage ? 'cursor-default' : 'cursor-pointer',
          )}
          onClick={onNextPage}
        >
          <Arrow color={!hasNextPage ? '#51516A' : 'white'} />
        </div>
      </section>
    </main>
  );
};

interface TaskRowProps {
  task: Task;
  onUpdateTaskState: (taskId: number) => Promise<void>;
  onDeleteTask: (taskId: number) => Promise<void>;
  onEditTask: (taskId: number, updatedTask: TaskPreview) => Promise<void>;
}

const TaskRow: React.ElementType<TaskRowProps> = ({
  task,
  onUpdateTaskState,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description,
  });

  const formattedUpdatedDate = new Date(task.updated_at).toLocaleString();
  const formattedCreatedDate = new Date(task.created_at).toLocaleString();

  const handleSaveEdit = async () => {
    await onEditTask(task.id, {
      ...editedTask,
      updated_at: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  return (
    <tr className="border border-gray-300">
      <td className="text-left p-2 border border-gray-300 font-bold">
        {isEditing ? (
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            className="bg-black placeholder-gray-500 text-gray-400 outline-none p-2 border rounded"
          />
        ) : (
          task.name
        )}
      </td>
      <td className="text-left p-2 border border-gray-300">
        {isEditing ? (
          <input
            type="text"
            value={editedTask.description || ''}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="bg-black placeholder-gray-500 text-gray-400 outline-none p-2 border rounded"
          />
        ) : (
          task.description || '-'
        )}
      </td>
      <td className="text-left p-2 border border-gray-300">
        {formattedUpdatedDate}
      </td>
      <td className="text-left p-2 border border-gray-300">
        {formattedCreatedDate}
      </td>
      <td className="text-left p-2 border border-gray-300">
        {task.is_completed ? '已完成' : '未完成'}
      </td>
      <td className="text-left p-2 border border-gray-300 flex">
        <button
          onClick={() => onUpdateTaskState(task.id)}
          className="mr-2 p-1 bg-slate-500 text-white rounded"
        >
          {task.is_completed ? '改未完成' : '改已完成'}
        </button>

        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="mr-2 p-1 bg-slate-600 text-white rounded"
          >
            確認
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mr-2 p-1 bg-slate-600 text-white rounded"
          >
            編輯
          </button>
        )}

        <button
          className="p-1 bg-red-600 text-white rounded"
          onClick={() => onDeleteTask(task.id)}
        >
          刪除
        </button>
      </td>
    </tr>
  );
};

export default Table;
