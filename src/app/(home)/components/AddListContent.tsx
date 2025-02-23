import { AddTask } from '@/types/task';
import React, { useState } from 'react';

const AddListContent = ({
  addTask,
}: {
  addTask: (newTaskData: AddTask) => Promise<void>;
}) => {
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTask = async () => {
    if (loading) return;
    if (!newTask.name.trim()) {
      setError('任務名稱為必填項');
      return;
    }
    setLoading(true);
    const newTaskData: AddTask = {
      ...newTask,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await addTask(newTaskData);
    setNewTask({ name: '', description: '' });
    setError('');
    setLoading(false);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <input
        type="text"
        placeholder="任務名稱"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        className="bg-black placeholder-gray-500 text-gray-400 outline-none p-2 border rounded"
      />
      <input
        type="text"
        placeholder="任務描述"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="bg-black placeholder-gray-500 text-gray-400 outline-none p-2 border rounded"
      />
      <button
        onClick={handleAddTask}
        className="p-2 bg-slate-500 text-white rounded"
      >
        新增任務
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AddListContent;
