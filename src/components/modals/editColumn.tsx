import { useTaskBoard } from '@contexts/board'
import { TaskColumn } from '@db/taskcolumns'
import React, { Fragment, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Modal from '.'
import { StyledGrid } from '@styled/layout'
import Label from '../forms/label'
import Icon from '@svgs/Icon'
import { FormInput } from '../forms/inputs/formInput'
import { ColorSwatch } from '@styled/colorSwatch'
import { PrimaryButton } from '@styled/button'
import { handleAddColumn, handleUpdateColumn } from '@utils/taskboard'
import { ITaskColumnForm } from '@typings/taskboard'

const EditColumnModal: React.FC<{
  id: TaskColumn['id'] | undefined
}> = ({ id }) => {
  const { colors, columns, board, setColumns, setItems, setEditColumnId } =
    useTaskBoard()

  const defaultValues = {
    title: '',
    color: colors[0],
  }

  const methods = useForm<ITaskColumnForm>({
    mode: 'onBlur',
    defaultValues,
  })
  const { setValue, watch, reset, handleSubmit } = methods

  const color = watch('color')

  const handleColor = (val: string) => {
    return setValue('color', val)
  }

  const onSubmit = async (formdata: ITaskColumnForm) => {
    if (id === 'new') {
      if (!board?.id) return
      await handleAddColumn(board?.id, formdata, columns, setColumns, setItems)
    } else {
      if (!id) return
      handleUpdateColumn(id, formdata, columns, setColumns)
    }
    reset({ color: colors[0] })
    setEditColumnId(undefined)
  }

  useEffect(() => {
    if (!id || id === 'new') return
    const column = columns.find((c) => c.id === id)
    reset(column)
  }, [id])

  return (
    <Fragment>
      <Modal
        title={!id || id === 'new' ? 'Add Column' : 'Edit Column'}
        state={id}
        handleClose={() => {
          reset({ color: colors[0] })
          setEditColumnId(undefined)
        }}
      >
        <Fragment>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="modal-content">
                  <StyledGrid cols="100px auto">
                    <div>
                      <Label name="Title" icon={<Icon type="notes" />} />
                    </div>
                    <FormInput
                      type={'text'}
                      name="title"
                      placeholder="Untitiled Column"
                    />
                  </StyledGrid>
                  <div>
                    <Label
                      name="Colors"
                      icon={<Icon type="color" />}
                      className="mb"
                    />
                    <StyledGrid cols="repeat(auto-fill, minmax(0, 65px))">
                      {colors.map((item, i) => (
                        <a key={i} onClick={() => handleColor(item)}>
                          <ColorSwatch
                            color={item}
                            size="50px"
                            className={color === item ? 'active' : ''}
                          />
                        </a>
                      ))}
                    </StyledGrid>
                  </div>
                </div>
              </div>
              <div className="modal-foot">
                <PrimaryButton type="submit">
                  {!id || id === 'new' ? 'Add Column' : 'Save Column'}
                </PrimaryButton>
              </div>
            </form>
          </FormProvider>
        </Fragment>
      </Modal>
    </Fragment>
  )
}

export default EditColumnModal
