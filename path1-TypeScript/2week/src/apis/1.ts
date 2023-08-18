/**
 * interface를 통해 타입 부여
 */

import { TodoDataBase } from '@/types/todo'
import axios from 'axios'

interface TodoApiProps {
  getTodo(): Promise<TodoDataBase>
}

export const TodoApi: TodoApiProps = {
  async getTodo() {
    const res = await axios.get('/')
    return res.data
  },
}
