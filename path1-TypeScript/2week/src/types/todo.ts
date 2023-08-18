export enum TodoEnum {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export type TodoDataBase =
  | {
      type: TodoEnum.DAILY
      content: string
      title: string
    }
  | {
      type: TodoEnum.WEEKLY
      total: Date
    }
  | {
      type: TodoEnum.MONTHLY
      goal: string
    }

export type TodoType<T extends TodoEnum = TodoEnum> = Extract<
  TodoDataBase,
  { type: T }
>

// 고차함수 활용
export const todoTypeIs = <T extends TodoEnum>(type: T) => {
  return (todo: TodoDataBase): todo is TodoType<T> => todo.type === type
}
