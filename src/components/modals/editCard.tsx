import { useTaskBoard } from '@contexts/board'
import { TaskItem } from '@db/taskitems'
import { ITaskForm } from '@typings/taskboard'
import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import SideModal from './side'
import Icon from '@svgs/Icon'
import { CustomFormInput } from '../forms/customInput'
import { StyledGrid } from '@styled/layout'
import Label from '../forms/label'
import Select from '../forms/select'
import EditTaskPage from '../taskboard/editTaskPage'
import dayjs from 'dayjs'
import { handleAddTask, handleUpdateTask } from '@utils/taskboard'
import { ReadyOnlyValue } from '@styled/label'

const SingleCardModal = () => {
  const [oldData, setOldData] = useState<TaskItem | undefined>(undefined)

  const { board, items, editTaskId, setEditTaskId, getStatus, setItems } =
    useTaskBoard()

  const status = getStatus()

  const defaultValues = {
    title: '',
    status: status[0].id,
  }

  const methods = useForm<ITaskForm>({
    mode: 'onChange',
    defaultValues,
    // resolver: yupResolver(blogSchema),
  })

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = methods

  const saveChanges = async (onClose?: boolean) => {
    if (!isValid || !isDirty || !editTaskId) return
    handleSubmit(async (formdata) => {
      if (!formdata.title || !board) return

      if (editTaskId === 'new') {
        const id = await handleAddTask(board.id, formdata, items, setItems)

        if (id && editTaskId !== undefined && !onClose) {
          setEditTaskId(id)
        }
      } else {
        if (!oldData) return
        handleUpdateTask(oldData, formdata, items, setItems)
        setOldData({ ...oldData, ...formdata } as any)
        reset(formdata)
      }
    })()
  }

  useEffect(() => {
    if (!isValid || !isDirty) return

    const timer = setTimeout(() => {
      saveChanges()
    }, 500)
    return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, isValid])

  useEffect(() => {
    if (!editTaskId || editTaskId === 'new' || !items)
      reset({ status: status[0].id }, { keepDefaultValues: false })
    else {
      let itemdata: any
      Object.keys(items).some((k) => {
        itemdata = items[k].find((e) => e.id === editTaskId)
        if (itemdata) return true
      })
      setOldData(itemdata)
      reset({
        title: itemdata.title,
        status: itemdata.status || status[0].id,
      })
    }
    return () => setOldData(undefined)
  }, [editTaskId, items])

  const handleClose = () => {
    setEditTaskId(undefined)
    saveChanges(true)
  }
  return (
    <SideModal open={!!editTaskId}>
      <div className="modal-head">
        <div>
          <a onClick={() => handleClose()} className="hover-color-primary">
            <Icon type="close" />
          </a>
        </div>
      </div>
      <div className="modal-content">
        {editTaskId ? (
          <Fragment>
            <FormProvider {...methods}>
              <Wrapper>
                <div className="edit-title">
                  <CustomFormInput
                    placeholder="Untitled Task"
                    name="title"
                    type="heading"
                  />
                </div>
                <div className="edit-details">
                  <StyledGrid className="mb">
                    <Label icon={<Icon type="checkbox" />} name={'Status'} />
                    <Select name="status" options={status} />
                  </StyledGrid>

                  {oldData && (
                    <Fragment>
                      <StyledGrid className="mb">
                        <Label
                          icon={<Icon type="clock" />}
                          name={'Create Time'}
                        />
                        <ReadyOnlyValue>
                          {dayjs(oldData?.created_at).format(
                            'DD MMM YYYY, hh:mm A'
                          )}
                        </ReadyOnlyValue>
                      </StyledGrid>
                      <StyledGrid className="mb">
                        <Label
                          icon={<Icon type="clock" />}
                          name={'Last Updated'}
                        />
                        <ReadyOnlyValue>
                          {dayjs(oldData?.updated_at).format(
                            'DD MMM YYYY, hh:mm A'
                          )}
                        </ReadyOnlyValue>
                      </StyledGrid>
                    </Fragment>
                  )}
                </div>
              </Wrapper>
            </FormProvider>
            <EditTaskPage taskData={oldData} />
          </Fragment>
        ) : null}
      </div>
    </SideModal>
  )
}

export default SingleCardModal

const Wrapper = styled.div`
  display: block;
  .edit-details,
  .edit-title {
    max-width: calc(100%) !important;
    padding: 20px 56px;
    width: 100%;
    margin: auto;
  }
  .edit-details {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  @media (max-width: 650px) {
    .edit-details,
    .edit-title {
      padding: 20px;
    }
  }
`
