import { idGenerate } from '@utils/idGenerate'
import dayjs from 'dayjs'
import { LocalDB, localDb } from '.'
import { TaskBoard } from './taskboard'
import { toast } from 'react-hot-toast'
import { LexoRank } from 'lexorank'

export type TaskColumnsParams = Pick<
  TaskColumn,
  'board_id' | 'color' | 'rank' | 'title'
>

export class TaskColumn {
  id!: string
  title!: string
  board_id!: string
  color!: string
  rank!: string
  created_at!: string
  updated_at!: string

  constructor({ title, board_id, rank, color }: TaskColumnsParams) {
    this.id = idGenerate('task')
    this.title = title
    this.board_id = board_id
    this.rank = rank
    this.color = color
    this.created_at = dayjs().toISOString()
    this.updated_at = dayjs().toISOString()
  }
}

export const getTasksColumnsByBoardId = async (
  db: LocalDB,
  id: TaskBoard['id']
) => {
  try {
    return await db.taskColumns.where('board_id').equals(id).toArray()
  } catch (err) {
    console.error(err)
    toast.error('Failed to fetch columns')
    return undefined
  }
}

export const addTaskColumn = async (db: LocalDB, params: TaskColumnsParams) => {
  try {
    const fields = ['title', 'board_id', 'rank']
    const hasNulls = fields.some((key) => !(params as any)[key])
    if (hasNulls) {
      throw Error('Invalid params')
    }
    const col = new TaskColumn(params)
    await db.taskColumns.add(col)
    return { ...col }
  } catch (err) {
    console.error(err)
    toast.error('Failed to add column')
    return undefined
  }
}

export const addMultiTaskColumns = async (
  board_id: TaskBoard['id'] | undefined,
  columns: Array<Pick<TaskColumn, 'color' | 'title'>>,
  prevRank: string
) => {
  try {
    if (!board_id) throw Error('Board Id missing!')
    if (!prevRank) throw Error('Prev Rank missing!')
    let rank = prevRank
    const newCols = columns.map((col) => {
      if (!col.color || !col.title) throw Error('color / title missing!')
      rank = LexoRank.parse(rank).genNext().toString()
      return new TaskColumn({ ...col, rank, board_id })
    })
    await localDb.taskColumns.bulkAdd(newCols)
    return newCols
  } catch (err) {
    console.error(err)
    toast.error('Failed to add columns')
    return undefined
  }
}

export const updateTaskColumn = async (
  db: LocalDB,
  id: string,
  params: Omit<TaskColumnsParams, 'board_id'>
) => {
  try {
    return await db.taskColumns.update(id, {
      ...params,
      updated_at: dayjs().toISOString(),
    })
  } catch (err) {
    console.error(err)
    toast.error('Failed to update column')
    return undefined
  }
}

export const deleteTaskColumn = async (db: LocalDB, id: string) => {
  try {
    return await db.taskColumns.delete(id)
  } catch (err) {
    console.error(err)
    toast.error('Failed to delete column')
    return undefined
  }
}
