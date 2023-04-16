import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-hot-toast'
import AddBoard from '@components/modals/addBoard'
import { TaskBoard, deleteBoard } from '@db/taskboard'
import { BorderBox } from '@styled/borderBox'
import { FlexGrowWrapper } from '@styled/listPage'
import Icon from '@svgs/Icon'
import { ModalState } from 'src/typings/types'
import { localDb } from '../../db'
import Board from '@components/cards/board'
import { EmptyStateBanner } from '@components/stateBanners'
import { DeleteModal } from '@components/modals/alert'
import { PrimaryLoader } from '@styled/loader'

const Boardlist = () => {
  const [modalState, setModalState] = useState<ModalState>(undefined)
  const [boards, setBoards] = useState<TaskBoard[]>([])
  const [show, setShow] = useState<ModalState>(undefined)
  const [loading, setLoading] = useState(true)
  const handleEdit = (id: TaskBoard['id'] | 'new') => {
    setModalState(id)
  }

  const handleDelete = async (id: TaskBoard['id']) => {
    try {
      await deleteBoard(localDb, id)
      setBoards((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error(err)
      toast.error('Err, Failed to delete board!', {
        position: 'bottom-center',
      })
    }
    setShow(false)
  }

  const getBoards = async () => {
    try {
      const list = await localDb.taskBoards
        .orderBy('updated_at')
        .reverse()
        .toArray()

      setBoards(list)
    } catch (err) {
      toast.error('Err, Failed to fetch boards!', {
        position: 'bottom-center',
      })
      console.error(err)
    }
    setLoading(false)
  }

  const handleSave = () => {
    getBoards()
  }

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <Wrapper>
      <DeleteModal
        state={show}
        setState={setShow}
        onCancel={() => setShow(undefined)}
        onConfirm={handleDelete}
        title="Are you sure? All tasks inside this board will be deleted."
      />
      <AddBoard
        modalState={modalState}
        setModalState={setModalState}
        onSave={handleSave}
      />
      {loading ? (
        <div className="h-100 flex flex-center">
          <PrimaryLoader />
        </div>
      ) : boards.length > 0 ? (
        <Fragment>
          <FlexGrowWrapper>
            <Cards>
              <StyledBorderBox onClick={() => handleEdit('new')}>
                <p>
                  <Icon type="add" /> Add Board
                </p>
              </StyledBorderBox>
              {boards.map((item, i) => (
                <Board
                  key={i}
                  data={item}
                  handleEdit={handleEdit}
                  handleDelete={() => setShow(item.id)}
                />
              ))}
            </Cards>
          </FlexGrowWrapper>
        </Fragment>
      ) : (
        <div className="flex flex-center h-100">
          <EmptyStateBanner handleClick={() => handleEdit('new')} />
        </div>
      )}
    </Wrapper>
  )
}

export default Boardlist

const Wrapper = styled.div`
  flex-grow: 1;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(300px, 1fr));
  grid-gap: 2em;
  padding: 2em;
`
const StyledBorderBox = styled(BorderBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* min-height: 100px; */
  height: 95px;
  width: calc(100% - 5px);
  margin: auto;
  p {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.shades.dark[600]};
  }
  svg {
    fill: ${({ theme }) => theme.shades.dark[600]};
    width: 30px;
    height: 30px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.shades.primary[100]};

    p {
      color: ${({ theme }) => theme.colors.primary};
    }

    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`
