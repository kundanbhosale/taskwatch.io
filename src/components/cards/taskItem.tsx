import styled from 'styled-components'
import { CustomInput } from '../forms/customInput'
import { useEffect, useRef, useState } from 'react'
import { TaskItem } from '@db/taskitems'
import Icon from '@svgs/Icon'
import dayjs from 'dayjs'

interface ITaskCard {
  item: TaskItem
  style?: React.CSSProperties
  setValue: (val: string) => void
  handleClick: (_id: any) => void
  handleDelete: (id: TaskItem['id'], status: TaskItem['status']) => void
}

const TaskCard: React.FC<ITaskCard> = ({
  item,
  style,
  handleClick,
  handleDelete,
  setValue,
}) => {
  const [show, setShow] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleSetValue = (val: string) => {
    setValue(val)
    setShow(false)
  }

  useEffect(() => {
    if (ref.current && show) ref.current.focus()
  }, [show])

  return (
    <a
      onClick={(e) => {
        if (show || (e.target as HTMLElement).classList.contains('task-action'))
          return
        e.preventDefault()
        handleClick(item.id)
      }}
    >
      <StyledTaskCard style={style} className={`${show ? 'editing' : ''}`}>
        <div className={`task-action-wrapper`}>
          <span
            className="task-action"
            onClick={(e) => {
              e.preventDefault()
              setShow(true)
            }}
          >
            <Icon type="edit" />
          </span>
          <span
            className="task-action"
            onClick={(e) => {
              e.preventDefault()
              handleDelete(item.id, item.status)
            }}
          >
            <Icon type="delete" />
          </span>
        </div>
        <div>
          {show ? (
            <CustomInput
              ref={ref}
              value={item.title || ''}
              setValue={handleSetValue}
              type="text"
            />
          ) : (
            <p>{item.title}</p>
          )}
        </div>
        <div className="drag-foot">
          <span className="label">
            Created on {dayjs(item.created_at).format('DD MMM YYYY')}
          </span>
        </div>
      </StyledTaskCard>
    </a>
  )
}

export default TaskCard

const StyledTaskCard = styled.div`
  padding: 0.875em;
  margin-bottom: 10px;
  height: fit-content;
  border: #ddd;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 15%);
  border-radius: 0.4em;
  position: relative;
  background-color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  &:not(.editing):hover {
    .task-action-wrapper {
      opacity: 1;
      visibility: visible;
    }
  }
  p {
    flex-wrap: wrap;
    word-break: break-all;
    margin: 0;
  }

  .drag-foot {
    margin-top: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-weight: 500;
      color: ${({ theme }) => theme.shades.dark[500]};
      font-size: 0.8em;
    }
    .assigned-member {
      background-color: red;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .task-action-wrapper {
    display: flex;
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0;
    visibility: hidden;
    transition: ease 0.2s;
    user-select: none;
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.shades.primary[200]};
    border-radius: 0.2em;
    box-shadow: 2px 4px 5px 1px ${({ theme }) => theme.shades.dark[50]};
  }

  .task-action {
    width: 28px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.shades.primary[100]};

    &:first-child {
      border-right: 1px solid ${({ theme }) => theme.shades.primary[200]};
    }
    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`
