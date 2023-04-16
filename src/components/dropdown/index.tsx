import React, { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'
interface IProps {
  width?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  head: ReactNode
}

const DropdownWrapper: React.FC<IProps> = ({
  children,
  width,
  className,
  style,
  head,
}) => {
  const handleOpen = (e: React.MouseEvent) => {
    const elem = e.target as HTMLElement
    const parent = elem.parentNode as HTMLElement
    const dropWrapper = parent.querySelector(
      '.dropdown-content'
    ) as HTMLDivElement

    if (!parent) return
    if (parent.classList.contains('active')) return parent.blur()
    dropWrapper.style.height =
      (dropWrapper?.children[0] as HTMLElement)?.clientHeight + 8 + 'px' ||
      '0px'
    parent.classList.add('active')
    return parent.focus()
  }

  return (
    <Wrapper
      // height={height ? height : '100px'}
      tabIndex={0}
      style={style}
      onBlur={(e) => e.target.classList.remove('active')}
      className={className}
    >
      <div onClick={handleOpen} className="dropdown-head">
        {head}
      </div>
      <div style={width ? { width } : {}} className="dropdown-content">
        <div className="dropdown-wrapper">{children}</div>
      </div>
    </Wrapper>
  )
}

export default DropdownWrapper

const Wrapper = styled.div`
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  user-select: none;
  border-radius: 6px;

  &.active {
    .dropdown-content {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    }
  }

  .dropdown-head {
    display: flex;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    width: fit-content;
    font-size: 0.875rem;
    * {
      user-select: none;
      pointer-events: none;
    }
  }

  .dropdown-content {
    margin: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    height: 0;
    visibility: hidden;
    overflow: hidden;
    transition: all ease-in-out 0.2s;
    z-index: 10;
    box-shadow: 0 3px 5px 0px ${({ theme }) => theme.shades.dark[200]};
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.shades.dark[100]};
    border-radius: 6px;
    transform: scale(0.5);
    transform-origin: top right;
    opacity: 0;
    width: 150px;
  }
`
