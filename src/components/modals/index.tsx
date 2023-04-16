import React, { Fragment, ReactNode, CSSProperties } from 'react'
import styled from 'styled-components'

import { ModalState } from '@typings/types'
import { PrimaryLoader } from '@styled/loader'
import Icon from '@svgs/Icon'

interface IModal {
  title?: string
  label?: string
  state: ModalState
  handleClose?: () => void
  children: ReactNode
  style?: CSSProperties
  className?: string
}

/**
 * ! HTML structure of the modal
<Modal>
    <div className="modal-head"></div>
      <div className="modal-body">
        <div className="modal-content"></div>
      </div>
      <div className="modal-foot"></div>
 <Modal> 
 *
 */

/**
 * ? Modal Head Class = "modal-head"
 * ? Modal Body Class = "modal-body"
 * ? Modal Content Class = "modal-content"
 * ? Modal Foot Class = "modal-foot"
 */

const Modal: React.FC<IModal> = ({
  title,
  label,
  children,
  state,
  handleClose,
  style,
  className,
}) => {
  if (!state) return null
  return (
    <Fragment>
      <Wrapper>
        <div
          className={`modal ${
            state === 'loading' ? 'loading' : ''
          } ${className}`}
          style={style}
        >
          {state === 'loading' && (
            <div className="modal-loader">
              <PrimaryLoader />
            </div>
          )}
          {handleClose && (
            <span onClick={() => handleClose()} className="modal-close">
              <Icon type="close" />
            </span>
          )}
          <div className="modal-head">
            {title && <p className="modal-title">{title}</p>}
            {label && <p className="modal-description">{label}</p>}
          </div>

          {children}
          {/* <div className="modal-body">
            <p className="modal-title">{title}</p>
            <p className="modal-description">{label}</p>
          
            <div className="modal-content">{children}</div>
          </div>
          <div className="modal-foot">
            <LightButton size="lg" width="100%" onClick={() => handleCancel()}>
              Cancel
            </LightButton>
            <PrimaryButton
              size="lg"
              width="100%"
              onClick={() => handleConfirm()}
            >
              Confirm
            </PrimaryButton>
          </div> */}
        </div>
      </Wrapper>
    </Fragment>
  )
}

export default Modal

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: ${({ theme }) => theme.shades.dark[200]};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: auto;
  .modal {
    width: 600px;
    max-height: 600px;
    background-color: ${({ theme }) => theme.colors.white};
    margin: auto;
    border-radius: 0.4em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    &.loading {
      pointer-events: none;
    }
  }
  .modal-loader {
    position: absolute;
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.shades.dark[100]};
    z-index: 1;
  }
  .modal-close {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  .modal-content {
    padding: 1.5em 0;
  }

  .modal-title {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 0.2em;
  }
  .modal-label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.shades.dark[700]};
    font-weight: 500;
  }
  .modal-head {
    padding: 1em 1em 0;
  }
  .modal-body {
    padding: 0em 1em;
  }
  .modal-foot {
    display: flex;
    justify-content: flex-end;
    column-gap: 1.5em;
    border-top: 1px solid ${({ theme }) => theme.shades.dark[100]};
    padding: 1em;
    button {
      justify-content: center;
    }
  }

  /* .modal-actions {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
  }
  .modal-content {
    padding: 1em;
    overflow-y: auto;
  }
  .close-modal {
    padding: 0.5em;
    cursor: pointer;
    border-radius: 0.4em;

    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  } */
`
