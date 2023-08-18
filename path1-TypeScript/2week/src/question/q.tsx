import { useEffect, useState } from 'react'

import { type TodoDataBase } from '@/types/todo'
import OneTodo from './components/one-todo'
import { todoDailyMock } from './mock'

const Q1Component: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoDataBase[]>([])

  useEffect(() => {
    setTodoList(todoDailyMock)
  }, [])

  return (
    <div>
      {todoList.map((todo, idx) => {
        return (
          <div key={idx}>
            <OneTodo todo={todo} />
          </div>
        )
      })}
    </div>
  )
}
export default Q1Component
