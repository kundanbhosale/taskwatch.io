import { idGenerate } from '@utils/idGenerate'
import dayjs from 'dayjs'
import { LocalDB } from '.'
import { toast } from 'react-hot-toast'

export type TaskBoardParams = {
  title: TaskBoard['title']
  summary?: TaskBoard['summary']
}
export class TaskBoard {
  id!: string
  title!: string
  summary?: string
  owner?: string
  updated_at!: string
  created_at!: string

  constructor({ title, summary }: TaskBoardParams) {
    this.id = idGenerate('board')
    this.title = title
    this.summary = summary || undefined
    this.owner = undefined
    this.created_at = dayjs().toISOString()
    this.updated_at = dayjs().toISOString()
  }
}

export const getAllBoards = async (db: LocalDB) => {
  try {
    return await db.taskBoards.toArray()
  } catch (err) {
    console.error(err)
    toast.error('Failed to fetch boards')
    return []
  }
}

export const getTaskboard = async (db: LocalDB, id: TaskBoard['id']) => {
  try {
    return await db.taskBoards.get(id)
  } catch (err) {
    console.error(err)
    toast.error('Failed to fetch board')
    return undefined
  }
}

export const addTaskBoard = async (db: LocalDB, params: TaskBoardParams) => {
  try {
    return await db.taskBoards.add(new TaskBoard(params))
  } catch (err) {
    console.error(err)
    toast.error('Failed to add board')
    return undefined
  }
}

export const updateTaskBoard = async (
  db: LocalDB,
  id: string,
  params: TaskBoardParams
) => {
  try {
    return await db.taskBoards.update(id, {
      ...params,
      updated_at: dayjs().toISOString(),
    })
  } catch (err) {
    console.error(err)
    toast.error('Failed to update board')
    return undefined
  }
}

export const deleteBoard = async (db: LocalDB, id: string) => {
  try {
    return await db.taskBoards.delete(id)
  } catch (err) {
    console.error(err)
    toast.error('Failed to delete board')
    return undefined
  }
}
