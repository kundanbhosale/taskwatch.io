import { idGenerate } from '@utils/idGenerate'
import dayjs from 'dayjs'
import { LocalDB, localDb, performMultiTableTransaction } from '.'
import { TaskBoard } from './taskboard'
import { TaskColumn } from './taskcolumns'
import { toast } from 'react-hot-toast'
import { Trash, addToTrash } from './trash'
import Dexie from 'dexie'

export type TaskItemsParams = Pick<
  TaskItem,
  'board_id' | 'page_id' | 'rank' | 'title' | 'status'
>

export class TaskItem {
  id!: string
  title!: string
  board_id!: string
  page_id?: string
  rank!: string
  status!: TaskColumn['id']
  assigned_to?: string
  created_at!: string
  updated_at!: string

  constructor({ title, board_id, rank, status, page_id }: TaskItemsParams) {
    this.id = idGenerate('task')
    this.title = title
    this.board_id = board_id
    this.rank = rank
    this.page_id = page_id
    this.status = status
    this.assigned_to = undefined
    this.created_at = dayjs().toISOString()
    this.updated_at = dayjs().toISOString()
  }
}

export const getTasksByBoardId = async (db: LocalDB, id: TaskBoard['id']) => {
  try {
    return await db.taskItems.where('board_id').equals(id).toArray()
  } catch (err) {
    console.error(err)
    toast.error('Failed to fetch tasks')
    return undefined
  }
}

export const addTaskItem = async (db: LocalDB, params: TaskItemsParams) => {
  try {
    const fields = ['title', 'board_id', 'rank', 'status']
    const hasNulls = fields.some((key) => !(params as any)[key])
    if (hasNulls) {
      throw Error('Invalid params')
    }

    const item = new TaskItem(params)
    await db.taskItems.add(item)

    return { ...item }
  } catch (err) {
    console.error(err)
    toast.error('Failed to add task')
    return undefined
  }
}

export const updateTaskItem = async (
  db: LocalDB,
  id: string,
  params: Partial<TaskItemsParams>
) => {
  try {
    return await db.taskItems.update(id, {
      ...params,
      updated_at: dayjs().toISOString(),
    })
  } catch (err) {
    console.error(err)
    toast.error('Failed to update task')
    return undefined
  }
}

export const deleteTaskItem = async (id: string) => {
  try {
    const data = await performMultiTableTransaction(
      'rw',
      { taskItems: localDb.taskItems, trash: localDb.trash },
      async (tables) => {
        const item = (await tables.taskItems.get(id)) as TaskItem | undefined
        if (!item) throw Error('Task not found!')

        const trash = await addToTrash(
          tables.trash as Dexie.Table<Trash, string>,
          {
            table: 'task_items',
            delete_id: item.id,
            data: item,
          }
        )
        await tables.taskItems.delete(id)
        return trash?.id
      }
    )

    return data
  } catch (err) {
    console.error(err)
    toast.error('Failed to delete task')
    return undefined
  }
}
