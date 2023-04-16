import React from 'react'
import Modal from '.'
import styled from 'styled-components'
import { DangerButton, LightButton } from '@styled/button'
import Icon from '@svgs/Icon'
import { ModalState } from '@typings/types'
interface IProps {
  state: ModalState
  setState: (val: ModalState) => void
  title: string
  onConfirm: (val: string) => void
  onCancel: () => void
}

export const DeleteModal: React.FC<IProps> = ({
  state,
  title,
  onConfirm,
  onCancel,
}) => {
  return (
    <StyledModal state={state}>
      <div className="modal-body">
        <span className="icon">
          <Icon type="delete" />
        </span>
        <p className="title">{title}</p>
        <DangerButton
          size="lg"
          onClick={() => typeof state === 'string' && onConfirm(state)}
        >
          Delete
        </DangerButton>
        <LightButton size="lg" onClick={onCancel}>
          Cancel
        </LightButton>
      </div>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 350px !important;
  .title {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 2em;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    svg {
      width: 70px;
      height: 70px;
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  button {
    width: 100%;
    margin: 1em 0;
    text-align: center;
    justify-content: center;
  }
  .modal-body {
    padding: 1em 2em 2em;
  }
`
