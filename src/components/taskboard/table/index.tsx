import { EmptyStateBanner } from '@components/stateBanners'
import { useTaskBoard } from '@contexts/board'
import { TaskItem } from '@db/taskitems'
import { StyledLabel } from '@styled/label'
import { Table } from '@styled/table'
import Icon from '@svgs/Icon'
import { handleDeleteTask, sortTaskItems } from '@utils/taskboard'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const BoardTable = () => {
  const [colors, setColors] = useState(undefined)
  const [status, setStatus] = useState(undefined)
  const [items, setItems] = useState<TaskItem[]>([])
  const {
    columns,
    items: initialItems,
    setEditTaskId,
    setItems: setInitialItems,
    sortType,
  } = useTaskBoard()

  useEffect(() => {
    initialItems && setItems(Object.values(initialItems).flat())
  }, [initialItems])

  useEffect(() => {
    if (!initialItems || !columns) return
    const color = {} as any
    const newStaus = {} as any
    columns.forEach((c) => {
      color[c.id] = c.color
      newStaus[c.id] = c.title
    })
    setColors(color)
    setStatus(newStaus)
  }, [initialItems, columns])

  useEffect(() => {
    if (!initialItems) return
    setItems(sortTaskItems(sortType, Object.values(initialItems).flat()) as any)
  }, [sortType])

  const handleDelete = (
    task: TaskItem['id'],
    task_status: TaskItem['status']
  ) => {
    handleDeleteTask(task, task_status, initialItems, setInitialItems)
    document && (document.activeElement as HTMLElement)?.blur()
  }

  if (items.length === 0) {
    return (
      <EmptyStateBanner
        title="Add New Task"
        handleClick={() => setEditTaskId('new')}
      />
    )
  }

  return (
    <div style={{ padding: '0em 2em' }}>
      <Table>
        <div className="thead">
          <div className="tr">
            <div className="td" style={{ width: 'auto' }}>
              Title
            </div>
            <div className="td" style={{ width: '300px' }}>
              Status
            </div>
            <div className="td" style={{ width: '250px' }}>
              Create Time
            </div>
            <div className="td" style={{ width: '250px' }}>
              Last Updated
            </div>
            <div className="td" style={{ width: '10px' }}></div>
          </div>
        </div>
        <div className="tbody">
          {items.map((item, i) => {
            return (
              <a
                onClick={(e) => {
                  if (
                    (e.target as HTMLElement).classList.contains('task-action')
                  )
                    return
                  e.preventDefault()
                  setEditTaskId(item.id)
                }}
                className="tr"
                key={i}
              >
                <div className="td" style={{ paddingRight: '2em ' }}>
                  <p className="line-clamp clamp-1">{item.title}</p>
                </div>
                <div className="td">
                  <StyledLabel
                    color={colors && item.status && colors[item.status]}
                  >
                    {(status && status[item.status as string]) || 'unassigned'}
                  </StyledLabel>
                </div>

                {/* <div className="td">
                  {item.assigned_to ? (
                    <a className="link">{item.assigned_to}</a>
                  ) : (
                    <span>Not Assigned</span>
                  )}
                </div>

                <div className="td">{item.created_by || '-'}</div> */}
                <div className="td">
                  {dayjs(item.created_at).format('DD MMM YYYY, hh:mm a')}
                </div>
                <div className="td">
                  {dayjs(item.updated_at).format('DD MMM YYYY, hh:mm a')}
                </div>
                <div className="td">
                  <span
                    className="hover-color-primary task-action"
                    onClick={() => handleDelete(item.id, item.status as string)}
                  >
                    <Icon type="delete" width={18} height={18} />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </Table>
    </div>
  )
}

export default BoardTable
