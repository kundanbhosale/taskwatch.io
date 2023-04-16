import { useTaskBoard } from '@contexts/board'
import { SortTypes, TaskBoardContext } from '@typings/taskboard'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import DropDown from '../dropdown/dropdown'
import Icon from '@svgs/Icon'
import { setUrlParams } from '@utils/setUrlParams'
import { useSearchParams } from 'react-router-dom'

const TaskBaordFilter = ({
  view,
  sortType,
}: {
  view: TaskBoardContext['view']
  sortType: SortTypes
}) => {
  const { setEditTaskId } = useTaskBoard()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Fragment>
      <Wrapper>
        <div className="action-block">
          <span
            className={
              (view === 'column' ? 'active' : '') + ' ' + 'action-item'
            }
            onClick={() =>
              setUrlParams('view', 'column', searchParams, setSearchParams)
            }
          >
            <Icon type="column" />
            Column View
          </span>
          <span
            className={(view === 'table' ? 'active' : '') + ' ' + 'action-item'}
            onClick={() =>
              setUrlParams('view', 'table', searchParams, setSearchParams)
            }
          >
            <Icon type="table" />
            Table View
          </span>
        </div>
        <div className="action-block">
          <DropDown title="Sort" icon="sort" className="action-dropdown">
            <a
              onClick={() =>
                setUrlParams('sort', 'title', searchParams, setSearchParams)
              }
              className={sortType === 'title' ? 'active' : ''}
            >
              <span>Name (A-Z)</span>
            </a>
            <a
              onClick={() =>
                setUrlParams('sort', 'status', searchParams, setSearchParams)
              }
              className={sortType === 'status' ? 'active' : ''}
            >
              <span>Status</span>
            </a>
            <a
              onClick={() =>
                setUrlParams('sort', 'created', searchParams, setSearchParams)
              }
              className={sortType === 'created' ? 'active' : ''}
            >
              <span>Date Created</span>
            </a>
            <a
              onClick={() =>
                setUrlParams('sort', 'updated', searchParams, setSearchParams)
              }
              className={sortType === 'updated' ? 'active' : ''}
            >
              <span>Date Updated</span>
            </a>
          </DropDown>
          <span
            className="action-item button"
            onClick={() => setEditTaskId('new')}
          >
            <Icon type="add" />
            Add Card
          </span>
        </div>
      </Wrapper>
    </Fragment>
  )
}

export default TaskBaordFilter

const Wrapper = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.shades.dark[50]};
  background-color: ${({ theme }) => theme.shades.primary[50]};
  border-radius: 0.4em;
  justify-content: space-between;
  margin: 2em 2em;
  .action-block {
    display: flex;
    align-items: center;
    justify-content: center;

    .action-item {
      cursor: pointer;
      padding: 0.5em 1em;
      margin: 0;
      border-right: 1.5px solid ${({ theme }) => theme.shades.dark[50]};
      width: fit-content;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      text-align: center;
      font-size: 0.875rem;
      svg {
        width: 18px;
        height: 18px;
        margin-right: 0.2em;
      }

      &.active {
        background-color: ${({ theme }) => theme.shades.primary[100]};
      }
      &:hover,
      &.active {
        color: ${({ theme }) => theme.colors.primary};
        svg {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
      &.button {
        border-radius: 0 0.4em 0.4em 0;
        background-color: ${({ theme }) => theme.shades.primary[900]};
        color: ${({ theme }) => theme.colors.white};
        svg {
          fill: ${({ theme }) => theme.colors.white};
        }
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
    .action-dropdown {
      .dropdown-head {
        border-radius: 0;
        padding: 0 1em;
        &:hover {
          background-color: transparent;
        }
      }

      a {
        display: flex;
        align-items: center;
        span {
          width: fit-content;
        }
        &.active::after {
          pointer-events: none;
          content: '';
          display: block;
          width: 15px;
          height: 15px;
          margin-left: 0.5em;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'  %3E%3Cpath  d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'/%3E%3C/svg%3E");
          background-repeat: none;
          background-position: center;
        }
      }
    }
  }
`
