import { idGenerate } from '@utils/idGenerate'
import React, { Fragment } from 'react'
import styled from 'styled-components'

const SideModal: React.FC<{
  open: boolean
  children: React.ReactNode
}> = ({ open, children }) => {
  const rightPos = open ? 0 : -1000

  const id = idGenerate()

  return (
    <Fragment>
      <Wrapper style={{ right: rightPos }} id={id}>
        {children}
      </Wrapper>
    </Fragment>
  )
}

export default SideModal

const Wrapper = styled.div`
  display: block;
  position: fixed;
  height: 100%;
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  border-left: 1px solid #ddd;
  box-shadow: #00000020 -5px 0 20px 5px;
  z-index: 100;
  top: 0;
  transition: right ease-in-out 0.5s;
  overflow: hidden;

  .modal-head,
  .modal-foot {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 1em;
    position: sticky;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 10;
    justify-content: space-between;
    a,
    span {
      font-weight: 450;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
    }
  }

  .modal-foot {
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.shades.dark[100]};
  }

  .modal-head {
    top: 0;
    border-bottom: 1px solid ${({ theme }) => theme.shades.dark[100]};
  }
  .modal-content {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
`
