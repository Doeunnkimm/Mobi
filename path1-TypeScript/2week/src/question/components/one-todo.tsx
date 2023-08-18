import { TodoDataBase, TodoEnum, todoTypeIs } from '@/types/todo'
interface Props {
  todo: TodoDataBase
}

const OneTodo: React.FC<Props> = ({ todo }) => {
  const todoTypeIsDaily = todoTypeIs(TodoEnum.DAILY)
  const todoTypeIsWeekly = todoTypeIs(TodoEnum.WEEKLY)
  const todoTypeIsMonthly = todoTypeIs(TodoEnum.MONTHLY)

  // 즉시 실행 함수
  const TODO = (() => {
    if (todoTypeIsDaily(todo)) {
      const { type, title, content } = todo
      return { type, title, content }
    }

    if (todoTypeIsMonthly(todo)) {
      const { type, goal } = todo
      return { type, goal }
    }

    if (todoTypeIsWeekly(todo)) {
      const { type, total } = todo
      return { type, total }
    }
  })()

  return (
    <>
      <h2>{TODO?.type}</h2>
      <hr />

      <section>
        {/* DAILY */}
        <h3>{TODO?.title}</h3>
        <p>{TODO?.content}</p>

        {/* WEEKLY */}
        <h3>{JSON.stringify(TODO?.total)}</h3>

        {/* MONTHLY */}
        <h3>{TODO?.goal}</h3>
      </section>
    </>
  )
}
export default OneTodo
