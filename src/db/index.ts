import Dexie, { TransactionMode } from 'dexie'
import { TaskBoard } from './taskboard'
import { TaskItem } from './taskitems'
import { TaskColumn } from './taskcolumns'
import { Page } from './pages'
import { Trash } from './trash'

export class LocalDB extends Dexie {
  taskBoards: Dexie.Table<TaskBoard, string>
  taskItems: Dexie.Table<TaskItem, string>
  taskColumns: Dexie.Table<TaskColumn, string>
  pages: Dexie.Table<Page, string>
  trash: Dexie.Table<Trash, string>
  constructor() {
    super('Kanban')
    this.version(1).stores({
      task_boards: 'id, updated_at',
      task_columns: 'id, board_id, updated_at',
      task_rows: 'id, board_id, updated_at',
      task_items: 'id, board_id, updated_at',
      pages: 'id, updated_at',
      trash: 'id, table, delete_id, updated_at',
    })
    this.taskBoards = this.table('task_boards')
    this.taskItems = this.table('task_items')
    this.taskColumns = this.table('task_columns')
    this.pages = this.table('pages')
    this.trash = this.table('trash')
  }
}

export const localDb = new LocalDB()

type TransactionWork<T> = (tables: {
  [key: string]: Dexie.Table<T, string>
}) => Promise<any>

type TransactionTables = {
  [key: string]: Dexie.Table<any, string>
}

export const performMultiTableTransaction = async <T>(
  mode: TransactionMode,
  tables: TransactionTables,
  work: TransactionWork<T>
): Promise<any> => {
  return await localDb.transaction(mode, Object.values(tables), async () => {
    return await work(tables)
  })
}
