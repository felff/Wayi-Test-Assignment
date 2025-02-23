'use server'

import { axiosClient } from "@/services"
import {TaskType} from '@/types/task'

export const getTaskList =  async (page: number = 1, pageType: TaskType = TaskType.all)=>{
    const params = {
        page: page,
        pageType: pageType,
      }
      
    const res = await axiosClient.get('/task',{params: params})
    return res.data
}