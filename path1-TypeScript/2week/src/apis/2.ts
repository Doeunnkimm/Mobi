/**
 * 제네릭을 통해 타입 부여
 */

import type { TodoDataBase } from '@/types/todo'
import axios from 'axios'

export const TodoApi = {
  async getTodo() {
    return await axios.get<TodoDataBase>('/')
  },
}
