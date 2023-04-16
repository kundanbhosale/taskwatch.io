import DropDown from '@components/dropdown/dropdown'
import { useTaskBoard } from '@contexts/board'
import { TaskColumn } from '@db/taskcolumns'
import { ColorSwatch } from '@styled/colorSwatch'
import { StyledGrid } from '@styled/layout'
import Icon from '@svgs/Icon'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import TaskBoardItem from '../item'
import { handleUpdateColumn } from '@utils/taskboard'

const SingleColumn: React.FC<{
  column: TaskColumn
  index: number
  setDelete: (val: TaskColumn['id']) => void
}> = ({ column, index, setDelete }) => {
  const { items, colors, columns, setColumns, setEditColumnId } = useTaskBoard()
  if (!column || !items || !items[column.id]) return null

  const handleColor = (color: string) => {
    handleUpdateColumn(column.id, { color } as any, columns, setColumns)
  }

  if (!column) return null
  return (
    <Draggable draggableId={column.id} index={index}>
      {(DraggableProvided, DraggableSnapshot) => (
        <Wrapper
          ref={DraggableProvided.innerRef}
          {...DraggableProvided.draggableProps}
        >
          <ColumnTitleWrapper
            {...DraggableProvided.dragHandleProps}
            style={{
              userSelect: 'none',
              background: column.color || '#eee',
              pointerEvents: 'auto',
              cursor: DraggableSnapshot.isDragging ? 'grab' : 'pointer',
            }}
          >
            <Fragment>
              <div className="title">
                <span>{column.title}</span>
                <span>({items[column.id]?.length || 0})</span>
              </div>

              <div className="options">
                <DropDown icon="three-dots" width="150px">
                  <a onClick={() => setEditColumnId(column.id)}>
                    <Icon type="edit-box" /> Edit Column
                  </a>
                  <a
                    onClick={(e) => {
                      document &&
                        (document.activeElement as HTMLElement)?.blur()
                      setDelete(column.id)
                    }}
                  >
                    <Icon type="delete" /> Delete Column
                  </a>
                  <label>Colors</label>
                  <StyledGrid
                    cols="repeat(auto-fill, minmax(0px, 35px))"
                    // style={{ justifyContent: 'center' }}
                  >
                    {colors.map((item, i) => (
                      <a key={i} onClick={() => handleColor(item)}>
                        <ColorSwatch
                          color={item}
                          size="25px"
                          className={column.color === item ? 'active' : ''}
                        />
                      </a>
                    ))}
                  </StyledGrid>
                </DropDown>
              </div>
            </Fragment>
          </ColumnTitleWrapper>
          <Droppable droppableId={column.id} type="task">
            {(DroppableProvided) => (
              <Fragment>
                <Column
                  id={`drag-column-${column.id}`}
                  {...DroppableProvided.droppableProps}
                  ref={DroppableProvided.innerRef}
                  style={{ background: column.color || '#eee' }}
                >
                  {items &&
                    items[column.id] &&
                    items[column.id].map((item, i: number) => (
                      <TaskBoardItem
                        key={`task-${item.id}`}
                        item={item}
                        index={i}
                      />
                    ))}

                  {DroppableProvided.placeholder}
                  {/* {placeholderProps &&
                  Object.keys(placeholderProps).length > 0 &&
                  snapshot.isDraggingOver && (
                    <Placeholder
                      style={{
                        top: placeholderProps.clientY,
                        left: placeholderProps.clientX,
                        height: placeholderProps.clientHeight,
                        width: placeholderProps.clientWidth,
                      }}
                    />
                  )} */}
                </Column>
              </Fragment>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  )
}

export default SingleColumn

const Column = styled.div`
  padding: 0.5em;
  height: calc(100% - 40px);
  border-radius: 5px;
`
const Wrapper = styled.div`
  width: 300px;
  margin-right: 1.2em;
  height: inherit;
`

const ColumnTitleWrapper = styled.div`
  display: flex;
  padding: 0 0.5em;
  margin-bottom: 0.5em;
  border-radius: 5px;
  height: 40px;
  position: relative;
  justify-content: space-between;
  width: 100%;
  .single-input-wrapper {
    width: 275px;
    position: absolute;
    top: calc(100% + 5px);
    z-index: 100;
    left: 0;
  }
  .title,
  .options {
    display: flex;
    align-items: center;
    width: fit-content;
    svg {
      fill: ${({ theme }) => theme.colors.dark};
    }
  }
  .title {
    font-size: 0.875rem;
    text-transform: capitalize;
    font-weight: 600;
  }
  .title span {
    padding: 0.2em 0.2em;
  }
`
