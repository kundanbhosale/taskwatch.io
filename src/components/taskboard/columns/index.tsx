import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import React, { Fragment, useState } from 'react'
import { useTaskBoard } from '@contexts/board'
import { LightButton } from '@styled/button'
import Icon from '@svgs/Icon'
import styled from 'styled-components'
import SingleColumn from './single'
import { handleDeleteColumn, handleTaskBoardDragEnd } from '@utils/taskboard'
import { DeleteModal } from '@components/modals/alert'
import { ModalState } from '@typings/types'
import { TaskColumn } from '@db/taskcolumns'

const BoardColumns = () => {
  const [show, setShow] = useState<ModalState>(undefined)
  const { board, items, columns, setColumns, setEditColumnId, setItems } =
    useTaskBoard()

  const handleDelete = (columnId: TaskColumn['id']) => {
    handleDeleteColumn(columnId, columns, setColumns)
    document && (document.activeElement as HTMLElement)?.blur()
  }

  return (
    <Wrapper>
      <DeleteModal
        state={show}
        setState={setShow}
        onCancel={() => setShow(undefined)}
        onConfirm={handleDelete}
        title="Are you sure? All tasks inside this column will be deleted."
      />
      <DragDropContext
        onDragEnd={(e) =>
          handleTaskBoardDragEnd(e, items, setItems, columns, setColumns)
        }
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(dropProvider) => (
            <Fragment>
              <div className="flex">
                <div
                  className="flex"
                  id={board?.id || 'board'}
                  {...dropProvider.droppableProps}
                  ref={dropProvider.innerRef}
                >
                  <Fragment>
                    {columns &&
                      columns.map((column, i) => (
                        <Fragment key={column.id}>
                          <SingleColumn
                            column={column}
                            index={i}
                            setDelete={setShow}
                          />
                        </Fragment>
                      ))}
                  </Fragment>
                </div>
              </div>
              {dropProvider.placeholder}
            </Fragment>
          )}
        </Droppable>
        <LightButton
          style={{ width: 'auto', height: 'fit-content', padding: '0.75em' }}
          onClick={() => setEditColumnId('new')}
        >
          <Icon type="add" />
        </LightButton>
      </DragDropContext>
    </Wrapper>
  )
}

export default BoardColumns

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 2em 2em;
  flex-grow: 1;
  min-height: 200px;
`
