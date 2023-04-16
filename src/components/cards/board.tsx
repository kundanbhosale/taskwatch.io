import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import React, { Fragment } from 'react'
import { DefaultTheme, withTheme } from 'styled-components'

import DropDown from '../dropdown/dropdown'
import Icon from '../../svgs/Icon'
import { TaskBoard } from '../../db/taskboard'
import { StyledListCard } from '../../styled/listPage'
import { StyledLabel } from '../../styled/label'
import { Link, useNavigate } from 'react-router-dom'

interface IProps {
  data: TaskBoard
  handleEdit: (id: TaskBoard['id']) => void
  handleDelete: (id: TaskBoard['id']) => void
  theme?: DefaultTheme
}

const BaordCard: React.FC<IProps> = ({
  data,
  handleEdit,
  handleDelete,
  theme,
}) => {
  dayjs.extend(relativeTime)

  const navigate = useNavigate()

  const handleClick = (action: 'view' | 'edit' | 'delete') => {
    // This will unfocus active dropdown which will close it
    document && (document.activeElement as HTMLElement)?.blur()

    // switch statement to perform action based on input
    switch (action) {
      case 'view':
        return navigate(data.id)
      case 'edit':
        return handleEdit(`/board/${data.id}`)
      case 'delete':
        return handleDelete(data.id)
      default:
        return null
    }
  }

  return (
    <Fragment>
      <StyledListCard className="project-card">
        <span className="card-opt">
          {/* <Icon type="three-dots" width={18} height={18} /> */}
          <DropDown icon="three-dots">
            <a onClick={() => handleClick('view')}>View</a>
            <a onClick={() => handleClick('edit')}>Edit Baord</a>
            <a onClick={() => handleClick('delete')}>Delete Baord</a>
          </DropDown>
        </span>
        <Link to={`/board/${data.id}`} className="card-content">
          <div>
            <div className="card-title">
              {/* <div className="card-icon">
                <span
                  className="icon"
                  style={{
                    backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/300/300221.png)`,
                  }}
                ></span>
              </div> */}
              <div style={{ width: 'calc(100% - 50px)' }}>
                <b className="line-clamp clamp-1">
                  {data?.title || 'Untitled Project'}
                </b>
                <span style={{ fontSize: '0.8rem' }}>
                  {data?.summary || ''}
                </span>
              </div>
            </div>
            {/* {data?.summary && (
              <p className="desc line-clamp clamp-2">{data?.summary}</p>
            )} */}
          </div>
          <div className="card-foot">
            <StyledLabel color={theme?.shades.dark[50]}>
              <Icon type="clock" />
              {dayjs(data.updated_at).fromNow()}
            </StyledLabel>
            {/* <span>
              <Icon type="clock" width={15} height={15} />
              {dayjs(data.updated_at).fromNow()}
            </span> */}

            {/* <MembersCount members={members} /> */}
            {/* <Fav /> */}
          </div>
        </Link>
      </StyledListCard>
    </Fragment>
  )
}

export default withTheme(BaordCard)
