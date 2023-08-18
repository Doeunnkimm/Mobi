import { TodoDataBase } from '@/types/todo'

export const todoDailyMock = [
  {
    type: 'DAILY',
    content: 'TEST CONTENT1',
    title: 'TEST TITLE1',
  },
  {
    type: 'DAILY',
    content: 'TEST CONTENT2',
    title: 'TEST TITLE2',
  },
  {
    type: 'DAILY',
    content: 'TEST CONTENT3',
    title: 'TEST TITLE3',
  },
  {
    type: 'DAILY',
    content: 'TEST CONTENT4',
    title: 'TEST TITLE4',
  },
  {
    type: 'DAILY',
    content: 'TEST CONTENT5',
    title: 'TEST TITLE5',
  },
] as TodoDataBase[]

export const todoMonthlyMock = [
  {
    type: 'MONTHLY',
    goal: 'TEST GOAL1',
  },
  {
    type: 'MONTHLY',
    goal: 'TEST GOAL2',
  },
  {
    type: 'MONTHLY',
    goal: 'TEST GOAL3',
  },
  {
    type: 'MONTHLY',
    goal: 'TEST GOAL4',
  },
  {
    type: 'MONTHLY',
    goal: 'TEST GOAL5',
  },
] as TodoDataBase[]
