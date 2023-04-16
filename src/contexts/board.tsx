import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { TaskBoard, getTaskboard } from '@db/taskboard'
import { TaskItem, getTasksByBoardId } from '@db/taskitems'
import { toast } from 'react-hot-toast'
import {
  TaskColumn,
  addMultiTaskColumns,
  getTasksColumnsByBoardId,
} from '@db/taskcolumns'
import { BoardView, SortTypes, TaskBoardContext } from '@typings/taskboard'
import TaskBaordFilter from '@components/taskboard/filter'
import EditColumnModal from '@components/modals/editColumn'
import { calLexoRank, sortByLexoRankAsc } from '@utils/lexoRank'
import SingleCardModal from '@components/modals/editCard'
import { localDb } from '../db'
import styled from 'styled-components'
import { StyledGrid } from '@styled/layout'
import { PrimaryButton } from '@styled/button'
import produce from 'immer'
import Icon from '@svgs/Icon'
import { PrimaryLoader } from '@styled/loader'
import { sortTaskItems } from '@utils/taskboard'
import { useSearchParams } from 'react-router-dom'

const value = {
  view: 'column' as any,
  colors: [],
  board: undefined,
  items: undefined,
  columns: [],
  editTaskId: undefined,
  editColumnId: undefined,
  sortType: 'lexo' as any,
  getStatus: (): any => {
    return
  },
  setItems: (_val: any) => {
    return
  },
  setColumns: (_val: any) => {
    return
  },
  setEditTaskId: (_val: any) => {
    return
  },

  setEditColumnId: (): any => {
    return
  },

  setTaskUpdater: (): any => {
    return
  },

  setColumnUpdater: () => {
    return
  },
}

const TaskBoardContext = React.createContext<TaskBoardContext>(value)

const TaskboardProvider = ({
  id,
  children,
}: {
  id: TaskBoard['id']
  children: ReactNode
}) => {
  const [view, setView] = useState<TaskBoardContext['view']>('column')
  const [board, setBoard] = useState<TaskBoardContext['board']>(undefined)
  const [columns, setColumns] = useState<TaskBoardContext['columns']>([])
  const [items, setItems] = useState<TaskBoardContext['items']>(undefined)
  const [sortType, setSortType] = useState<SortTypes>('rank')

  const [editTaskId, setEditTaskId] =
    useState<TaskBoardContext['editTaskId']>(undefined)
  const [editColumnId, setEditColumnId] = useState<
    TaskColumn['id'] | 'new' | undefined
  >(undefined)
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()

  const currentView = searchParams.get('view') as BoardView | undefined

  const currentSort = searchParams.get('sort') as SortTypes | undefined

  const colors = [
    'rgba(221, 221, 221, 1)',
    'rgba(238, 130, 238, 0.30)',
    'rgba(75, 0, 130, 0.30)',
    'rgba(0, 0, 255, 0.30)',
    'rgba(0, 128, 0, 0.30)',
    'rgba(239, 211, 41, 0.30)',
    'rgba(255, 165, 0, 0.30)',
    'rgba(255, 0, 0, 0.30)',
  ]

  const basicCols = [
    { title: 'Todo', color: colors[1] },
    { title: 'Inprogress', color: colors[2] },
    { title: 'Completed', color: colors[3] },
  ]

  const softwareCols = [
    { title: 'Requested', color: colors[1] },
    { title: 'Design/Analysis', color: colors[2] },
    { title: 'Development', color: colors[3] },
    { title: 'Testing', color: colors[4] },
    { title: 'Deployment', color: colors[5] },
    { title: 'Done', color: colors[6] },
  ]

  const salesCols = [
    { title: 'Potential Customers', color: colors[1] },
    { title: 'Leads', color: colors[2] },
    { title: 'Pending Requests', color: colors[3] },
    { title: 'Final Negotiations', color: colors[4] },
    { title: 'Won', color: colors[5] },
    { title: 'Lost', color: colors[6] },
  ]

  const orderCols = [
    { title: 'Order Recieved', color: colors[1] },
    { title: 'Payment Collected', color: colors[2] },
    { title: 'Dispatched', color: colors[3] },
    { title: 'Delivered', color: colors[4] },
  ]

  const getStatus = useCallback(() => {
    const result: any = []

    if (!columns) return result
    columns.forEach((d) => {
      return result.push({ id: d.id, name: d.title, bg_color: d.color })
    })
    return result
  }, [columns])

  const getColumnsList = async (col_id: TaskColumn['id']) => {
    try {
      let list = await getTasksColumnsByBoardId(localDb, col_id)
      if (list && list.length > 0) {
        list = sortByLexoRankAsc(list) as TaskColumn[]
        setColumns(list)
      }
      return list
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch task columns!')
    }
  }

  const getTaskList = async (
    task_id: TaskItem['id'],
    cols: TaskColumn[] | undefined
  ) => {
    try {
      const list: Record<TaskColumn['id'], Array<TaskItem>> = {}

      if (cols && cols.length > 0) {
        cols.map((col) => (list[col.id] = []))
      }

      const tasks = await getTasksByBoardId(localDb, task_id)

      if (tasks && tasks.length > 0) {
        tasks.forEach((v) => {
          if (v.status && list[v.status]) list[v.status].push(v)
        })

        Object.keys(list).forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(list as any)[key] = sortByLexoRankAsc(list[key])
        })
      }
      setItems(list)
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch task items!')
    }
    setLoading(false)
  }

  const getData = useCallback(async () => {
    try {
      if (!id) throw Error('Board Id not provided!')
      const boardData = await getTaskboard(localDb, id)
      setBoard(boardData)

      const columnList = await getColumnsList(id)
      await getTaskList(id, columnList)
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch board data!')
    }
  }, [id])

  useEffect(() => {
    if (!columns || !items || view === 'table') return
    const updated = produce(items, (draft) => {
      Object.keys(draft).forEach((key) => {
        draft[key] = sortTaskItems(sortType, draft[key]) as any
      })
    })
    setItems(updated)
  }, [sortType])

  useEffect(() => {
    if (!currentSort) return
    setSortType(currentSort)
  }, [currentSort])

  useEffect(() => {
    if (!currentView) return
    setView(currentView)
  }, [currentView])

  useEffect(() => {
    if (!id) return
    getData()
  }, [id])

  const addMultiColumn = async (
    data: Array<Pick<TaskColumn, 'title' | 'color'>>
  ) => {
    const prevRank = calLexoRank(
      columns && columns.length > 0 ? columns[0].rank : undefined,
      undefined
    ).toString()
    const cols = await addMultiTaskColumns(board?.id, data, prevRank)
    if (!cols) return
    setColumns((prev) => [...prev, ...cols])

    const updated = produce(items || {}, (draft) => {
      cols.map((col) => (draft[col.id] = []))
    })

    setItems(updated)
  }
  if (!board) return null

  return (
    <TaskBoardContext.Provider
      value={{
        view,
        board,
        sortType,
        columns,
        items,
        setItems,
        colors,
        setColumns,
        editTaskId,
        setEditTaskId,
        getStatus,
        setEditColumnId,
      }}
    >
      {editColumnId ? (
        <EditColumnModal id={editColumnId} />
      ) : (
        <Fragment>
          {loading ? (
            <div className="h-100 flex flex-center">
              <PrimaryLoader />
            </div>
          ) : columns.length > 0 ? (
            <Fragment>
              <TaskBaordFilter view={view} sortType={sortType} />
              <SingleCardModal />
              {children}
            </Fragment>
          ) : (
            <Fragment>
              <Wrapper>
                <div className="alert-head">
                  <Icon type="column" />
                  <p>Add Columns</p>
                </div>
                <StyledGrid className="grid">
                  <div
                    className="grid-item"
                    onClick={() => addMultiColumn(basicCols)}
                  >
                    <p className="title">Basic</p>
                    <p>Adds Todo, Inprogress and Completed columns!</p>
                  </div>
                  <div
                    className="grid-item"
                    onClick={() => addMultiColumn(softwareCols)}
                  >
                    <p className="title">Software Roadmap</p>
                    <p>
                      Adds Requested, Design/Analysis, Development, Testing,
                      Deployment, Done columns!
                    </p>
                  </div>
                  <div
                    className="grid-item"
                    onClick={() => addMultiColumn(salesCols)}
                  >
                    <p className="title">Sales Pipeline</p>
                    <p>
                      Adds Potential Customers, Leads, Pending Requests, Final
                      Negotiations, Won, and Lost columns!
                    </p>
                  </div>
                  <div
                    className="grid-item"
                    onClick={() => addMultiColumn(orderCols)}
                  >
                    <p className="title">Orders Tracking</p>
                    <p>
                      Adds Order recieved, Payment collected, Dispatched and
                      Delivered columns!
                    </p>
                  </div>
                </StyledGrid>
                <PrimaryButton size="xl" onClick={() => setEditColumnId('new')}>
                  Add Custom Column
                </PrimaryButton>
              </Wrapper>
            </Fragment>
          )}
        </Fragment>
      )}
    </TaskBoardContext.Provider>
  )
}

const useTaskBoard = () => {
  const context = React.useContext(TaskBoardContext)
  return context
}

export { useTaskBoard, TaskboardProvider }

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
  border: 1.5px solid ${({ theme }) => theme.shades.dark[50]};
  box-shadow: 4px 5px 20px 0px ${({ theme }) => theme.shades.dark[100]};
  padding: 2.5em 2em;

  .alert-head {
    display: block;
    text-align: center;
    margin-bottom: 2em;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
    svg {
      width: 70px;
      height: 70px;
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  .grid {
    padding: 0 1em;
    gap: 1em;
  }
  .grid-item {
    cursor: pointer;
    padding: 1em 0.5em;
    border: 3px solid ${({ theme }) => theme.shades.dark[50]};
    border-radius: 6px;
    transition: ease 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.shades.primary[200]};
      border-color: ${({ theme }) => theme.shades.primary[200]};
    }
  }
  .title {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 0.5em;
  }
  p {
    color: ${({ theme }) => theme.shades.dark[700]};
    text-align: center;
    font-size: 0.8rem;
  }
  ${PrimaryButton} {
    margin: 2em auto 0;
  }
`
