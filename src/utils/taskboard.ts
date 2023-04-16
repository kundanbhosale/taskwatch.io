import { DraggableStyle, DropResult } from '@hello-pangea/dnd'
import React from 'react'
import { calLexoRank, sortByLexoRankAsc } from './lexoRank'
import produce from 'immer'
import {
  ITaskColumnForm,
  ITaskForm,
  SortTypes,
  TaskBoardContext,
} from '@typings/taskboard'
import {
  TaskItem,
  addTaskItem,
  deleteTaskItem,
  updateTaskItem,
} from '@db/taskitems'
import { localDb } from '../db'
import {
  TaskColumn,
  addTaskColumn,
  deleteTaskColumn,
  updateTaskColumn,
} from '@db/taskcolumns'
import { TaskBoard } from '@db/taskboard'
import { restoreToast } from '@components/customToasts'
import { restoreTaskItem } from '@db/trash'

export const getDragItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableStyle | undefined
): React.CSSProperties => ({
  borderRadius: '0.4em',
  marginBottom: '10px',
  userSelect: 'none',
  background: isDragging ? '#b2f2cd' : '#fff',
  pointerEvents: 'auto',
  cursor: isDragging ? 'grab' : 'pointer',
  ...draggableStyle,
})

// export const handleKanbanDragStart = ({ event }: { event: DragStart }) => {

// }

// export const handleKanbanDragUpdate = ({ event }: { event: DragUpdate }) => {

// }

export const getTaskRank = (
  destinationIdx: number,
  destinationList: TaskItem[]
) => {
  const prevIdx = destinationIdx === 0 ? undefined : destinationIdx - 1
  const nextIdx =
    destinationIdx !== destinationList.length ? destinationIdx : undefined

  const prevRank = destinationList[prevIdx as any]?.rank || undefined
  const nextRank = destinationList[nextIdx as any]?.rank || undefined

  return calLexoRank(prevRank, nextRank).toString()
}

export const handleTaskBoardDragEnd = async (
  result: DropResult,
  items: TaskBoardContext['items'],
  setItems: TaskBoardContext['setItems'],
  columnsData: TaskBoardContext['columns'],
  setColumns: TaskBoardContext['setColumns']
) => {
  if (!result.destination || !result.type || !items || !setColumns) return

  const sourceId = result.source.droppableId
  const destinationId = result.destination?.droppableId
  const dIdx = result.destination.index || 0
  const sIdx = result.source.index || 0

  if (!destinationId || (destinationId === sourceId && dIdx === sIdx)) return

  if (result.type === 'column') {
    const columns = Array.from(columnsData)

    const id = columns[sIdx].id

    const [removed] = columns.splice(sIdx, 1)

    const prevIdx = dIdx === 0 ? undefined : dIdx - 1

    const nextIdx = dIdx !== columns.length ? dIdx : undefined

    const prevRank = columns[prevIdx as any]?.rank || undefined
    const nextRank = columns[nextIdx as any]?.rank || undefined

    const rank = calLexoRank(prevRank, nextRank).toString()

    const newCol = { ...removed, rank }

    columns.splice(dIdx || 0, 0, newCol)
    setColumns(columns)

    await updateTaskColumn(localDb, id, newCol)
  } else if (result.type === 'task') {
    const updated = produce(items, (draft) => {
      const sourceList = draft[sourceId]
      const destinationList = draft[destinationId]

      const id =
        (draft[sourceId][sIdx] && draft[sourceId][sIdx]?.id) || undefined

      const rank = getTaskRank(dIdx, destinationList)

      const [removed] = sourceList.splice(sIdx, 1)
      removed.rank = rank
      removed.status = destinationId
      destinationList.splice(dIdx || 0, 0, removed)
      if (id) {
        updateTaskItem(localDb, id, removed)
      }
    })

    setItems(updated)
  } else {
    console.error(`Unkown type: ${result.type}`)
  }

  return true
}

export const handleAddTask = async (
  board_id: TaskBoard['id'],
  task: ITaskForm,
  items: TaskBoardContext['items'],
  setItems: TaskBoardContext['setItems']
) => {
  if (!items || !task || !task.status) return undefined

  const rank = calLexoRank(
    undefined,
    items[task.status].length > 0 ? items[task.status][0].rank : undefined
  ).toString()

  const newTask = await addTaskItem(localDb, { ...task, board_id, rank })

  if (newTask) {
    const update = produce(items, (draft) => {
      draft[task.status].unshift(newTask)
    })
    setItems(update)
  }
  return newTask?.id || undefined
}

export const handleAddColumn = async (
  board_id: TaskBoard['id'],
  col: ITaskColumnForm,
  columns: TaskBoardContext['columns'],
  setColumns: TaskBoardContext['setColumns'],
  setItems: TaskBoardContext['setItems']
) => {
  if (!columns || !col) return undefined

  const rank = calLexoRank(
    undefined,
    columns.length > 0 ? columns[columns.length - 1].rank : undefined
  ).toString()

  const newCol = await addTaskColumn(localDb, { ...col, board_id, rank })

  if (newCol) {
    setColumns([...columns, newCol])
    setItems((prev: any) => {
      if (!prev) return
      const items = { ...prev } as any
      items[newCol.id] = []
      return items
    })
  }
}

export const handleUpdateTask = (
  old: TaskItem,
  task: Partial<ITaskForm>,
  items: TaskBoardContext['items'],
  setItems: TaskBoardContext['setItems']
) => {
  if (!task || !old || !items || !old.id) return

  const updatedTask = { ...old, ...task }
  if (old.status !== task.status) {
    const next =
      (items[updatedTask.status].length > 0 &&
        items[updatedTask.status][0].rank) ||
      undefined
    const rank = calLexoRank(undefined, next).toString()
    updatedTask.rank = rank
  }

  const updated = produce(items, (draft) => {
    if (old.status !== task.status) {
      const idx = draft[old.status as string].findIndex((v) => v.id === old.id)

      idx !== -1 && draft[old.status as string].splice(idx, 1)
      draft[updatedTask.status].unshift(updatedTask)
    } else {
      const idx = draft[updatedTask.status].findIndex((v) => v.id === old.id)

      draft[updatedTask.status].splice(idx, 1, updatedTask)
    }
  })
  setItems(updated)
  updateTaskItem(localDb, updatedTask.id, updatedTask)
}

export const handleUpdateColumn = (
  id: TaskColumn['id'],
  col: ITaskColumnForm,
  columns: TaskBoardContext['columns'],
  setColumns: TaskBoardContext['setColumns']
) => {
  if (!id) return

  const idx = columns.findIndex((c) => c.id === id)
  const oldCol = columns[idx]
  if (idx === -1) return

  const newCol = { ...oldCol, ...col }
  const updated = produce(columns, (draft) => {
    draft.splice(idx, 1, newCol)
  })
  setColumns(updated)
  updateTaskColumn(localDb, id, newCol)
}

const handleRestoreTask = async (
  id: string,
  items: TaskBoardContext['items'],
  setItems: TaskBoardContext['setItems']
) => {
  const data = await restoreTaskItem(id)

  data && setItems(items)
}

export const handleDeleteTask = async (
  id: TaskItem['id'],
  status: TaskItem['status'],
  items: TaskBoardContext['items'],
  setItems: TaskBoardContext['setItems']
) => {
  const update = produce(items, (draft) => {
    if (!draft) return
    const idx = draft[status as string].findIndex((c) => c.id === id)
    if (idx === -1) return

    draft[status as string].splice(idx, 1)
  })
  setItems(update)
  const deleted = await deleteTaskItem(id)
  if (!deleted) return

  restoreToast(deleted, (toast_id) =>
    handleRestoreTask(toast_id, items, setItems)
  )
}

export const handleDeleteColumn = (
  id: TaskColumn['id'],
  columns: TaskBoardContext['columns'],
  setColumns: TaskBoardContext['setColumns']
) => {
  const update = produce(columns, (draft) => {
    if (!draft) return
    const idx = draft.findIndex((c) => c.id === id)
    if (idx === -1) return

    draft.splice(idx, 1)
  })
  setColumns(update)
  deleteTaskColumn(localDb, id)
}

export const sortTaskItems = (type: SortTypes, list: TaskItem[]) => {
  const sortList = list

  const SortByName = () => {
    return sortList.sort((a, b) => a.title.localeCompare(b.title))
  }

  const SortByCreated = () => {
    return sortList.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  }

  const SortByStatus = () => {
    return sortList.sort((a, b) => a.status.localeCompare(b.status))
  }

  switch (type) {
    case 'title':
      return SortByName()
    case 'created':
      return SortByCreated()
    case 'status':
      return SortByStatus()
    default:
      return sortByLexoRankAsc(sortList)
  }
}
