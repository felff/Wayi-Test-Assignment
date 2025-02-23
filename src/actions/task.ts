'use server'

import { axiosClient } from "@/services"
import {AddTask, TaskType} from '@/types/task'

export const getTaskList =  async (page: number = 1, pageType: TaskType = TaskType.all)=>{
    const params = {
        page: page,
        pageType: pageType,
      }
      
    const res = await axiosClient.get('/task',{params: params})
    return res.data
}

export const addNewTask =  async (newTaskData: AddTask)=>{
  const res = await axiosClient.post('/task',newTaskData)
  return res.data
}