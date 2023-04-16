import Icon from '@svgs/Icon'
import { IconTypes } from '@typings/icontypes'
import React, { Fragment, ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'
import DropdownWrapper from '.'

interface IProps {
  title?: string
  width?: string
  icon?: IconTypes
  children: ReactNode[]
  className?: string
  style?: CSSProperties
}
const DropDown: React.FC<IProps> = ({
  title,
  icon,
  children,
  width,
  className,
  style,
}) => {
  const head = (
    <Fragment>
      {icon && (
        <span className="dropdown-head-icon">
          <Icon type={icon} width={18} height={18} />
        </span>
      )}
      {title && <span className="dropdown-head-title">{title}</span>}
    </Fragment>
  )

  return (
    <Wrapper head={head} className={className} style={style} width={width}>
      <div className="dropdown-list">{children}</div>
    </Wrapper>
  )
}

export default DropDown

const Wrapper = styled(DropdownWrapper)`
  &.active {
    .dropdown-content {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    }
  }
  .dropdown-head {
    &:hover {
      background-color: ${({ theme }) => theme.shades.primary[200]};
      .dropdown-head-title {
        color: ${({ theme }) => theme.colors.primary};
      }
      .dropdown-head-icon svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
    .dropdown-head-icon {
      width: 30px;
      height: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .dropdown-head-title {
      pointer-events: none;
    }
  }

  .dropdown-list {
    font-size: 0.875rem;
    margin: 0.2em;

    label {
      margin-top: 0.5em;
      border-top: 1px solid ${({ theme }) => theme.shades.dark[100]};
      font-weight: 600;
    }
    svg {
      width: 14px;
      height: 14px;
      margin-right: 0.3em;
    }
    a {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      font-weight: 500;
      font-size: inherit;
      padding: 0.4em;
      border-radius: 4px;
      transition: all ease-in-out 0.2s;
      &:hover {
        svg {
          fill: ${({ theme }) => theme.colors.primary};
        }
        background-color: ${({ theme }) => theme.shades.primary[100]};
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
