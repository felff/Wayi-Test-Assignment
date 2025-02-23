export const TaskType ={
  /** 已完成任務 */
    completed: 'completed',
  /** 未完成任務 */
    uncompleted: 'uncompleted',
  /** 所有任務 */
    all: 'all',
} as const // 使用 `as const` 避免對象被推斷為可變

export type TaskType = keyof typeof TaskType

export type Task = {
    id: number
    name: string
    description: string
    is_completed: boolean
    created_at: string
    updated_at: string
}

  // 定義 Task 列表的類型
export type TaskList = Task[]

export type AddTask= {
  is_completed: boolean
  created_at: string
  updated_at: string
  name: string
  description: string
}