import React, { useEffect } from 'react'
import Modal from '.'

import { FormProvider, useForm } from 'react-hook-form'

import { toast } from 'react-hot-toast'
import { TaskBoard, addTaskBoard, getTaskboard } from '@db/taskboard'
import { localDb } from '@db/index'
import { PrimaryButton } from '@styled/button'
import { ModalState } from '@typings/types'
import { CustomFormInput } from '../forms/customInput'

interface IProps {
  modalState: ModalState
  setModalState: (val: ModalState) => void
  onSave: () => void
}
type AddBoardForm = Pick<TaskBoard, 'title' | 'summary'>
const AddBoard: React.FC<IProps> = ({ modalState, setModalState, onSave }) => {
  const defaultValues = {
    title: '',
    summary: '',
  }

  const methods = useForm<AddBoardForm>({
    mode: 'onChange',
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: AddBoardForm) => {
    try {
      await addTaskBoard(localDb, data)
      setModalState(undefined)
      onSave()
    } catch (err) {
      console.error(err)
      toast.error('Err, Failed to create new board!', {
        position: 'bottom-center',
      })
    }
  }

  const setFormData = async () => {
    try {
      const board = await getTaskboard(localDb, modalState as string)
      if (!board) {
        setModalState(undefined)
        toast.error('We are not able to find the board!', {
          position: 'bottom-center',
        })
      }

      reset(board)
    } catch (err) {
      console.error(err)
      toast.error('Err, Failed to fetch board!', {
        position: 'bottom-center',
      })
    }
  }

  useEffect(() => {
    if (!modalState || modalState === 'new') return
    setFormData()
  }, [modalState])

  return (
    <Modal state={modalState} handleClose={() => setModalState(undefined)}>
      {/* <div className="modal-head">
        <p className="modal-title">Add Board</p>
      </div> */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div className="modal-content">
              <div className="mb-1">
                <CustomFormInput
                  type="heading"
                  name="title"
                  placeholder="Untitled Board"
                />
              </div>
              <div>
                <CustomFormInput
                  name="summary"
                  placeholder="Write summary about the board here..."
                />
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <PrimaryButton size="lg">Save Changes</PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default AddBoard
