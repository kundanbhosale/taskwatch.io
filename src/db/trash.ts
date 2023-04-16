import { idGenerate } from '@utils/idGenerate'
import dayjs from 'dayjs'
import { localDb, performMultiTableTransaction } from '.'
import { toast } from 'react-hot-toast'
import { TaskItem } from './taskitems'
import Dexie from 'dexie'

export type TrashParams = Pick<Trash, 'table' | 'delete_id' | 'data'>

export class Trash {
  id!: string
  table!: string
  delete_id!: string
  data!: Record<string, any>
  created_at!: string
  updated_at!: string

  constructor({ table, delete_id, data }: TrashParams) {
    this.id = idGenerate('trash')
    this.table = table
    this.delete_id = delete_id
    this.data = data
    this.created_at = dayjs().toISOString()
    this.updated_at = dayjs().toISOString()
  }
}

export const addToTrash = async (
  table: Dexie.Table<Trash, string>,
  params: TrashParams
) => {
  try {
    const trash = new Trash(params)
    await table.add(trash)
    return trash
  } catch (err) {
    console.error(err)
    toast.error('Failed adding to trash!')
    return undefined
  }
}

export const restoreTaskItem = async (id: Trash['id']) => {
  try {
    const data = await performMultiTableTransaction(
      'rw',
      { trash: localDb.trash, task: localDb.taskItems },
      async (tables) => {
        const trash = (await tables.trash.get(id)) as Trash | null
        if (!trash) throw Error('Trash not found!')
        await tables.task.add(trash.data)
        await tables.trash.delete(id)
        return trash.data
      }
    )
    return data as TaskItem
  } catch (err) {
    console.error(err)
    return undefined
  }
}
