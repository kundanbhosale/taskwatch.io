import React, { Fragment, ReactNode } from 'react'
import styled from 'styled-components'

const Label: React.FC<{
  className?: string
  icon?: ReactNode
  name: string
  size?: 'sm' | 'lg'
}> = ({ icon, name, size = 'lg', className }) => {
  return (
    <Fragment>
      <StyledLabel size={size} className={className}>
        {icon && <span className="label-icon">{icon}</span>}
        <span className="label-value">{name}</span>
      </StyledLabel>
    </Fragment>
  )
}

export default Label

const StyledLabel = styled.div<{ size: 'sm' | 'lg' }>`
  display: flex;
  align-items: center;
  padding: 0.5em 0;
  height: fit-content;
  font-size: ${({ size }) => (size === 'sm' ? '0.8rem' : '0.875rem')};
  font-weight: 500;
  .label-icon {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 30px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`
