import React, { memo } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { useTaskBoard } from '@contexts/board'
import {
  getDragItemStyle,
  handleDeleteTask,
  handleUpdateTask,
} from '@utils/taskboard'
import { TaskItem } from '@db/taskitems'
import TaskCard from '../cards/taskItem'

const TaskBoardItem: React.FC<{ item: TaskItem; index: number }> = memo(
  ({ item, index }) => {
    const { setEditTaskId, items, setItems } = useTaskBoard()

    const handleVal = (value: string) => {
      handleUpdateTask(item, { title: value }, items, setItems)
    }

    const handleDelete = (id: TaskItem['id'], status: TaskItem['status']) => {
      return handleDeleteTask(id, status, items, setItems)
    }

    return (
      <Draggable key={index} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getDragItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <TaskCard
              item={item}
              handleClick={() => setEditTaskId(item.id)}
              setValue={handleVal}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </Draggable>
    )
  }
)
export default TaskBoardItem
