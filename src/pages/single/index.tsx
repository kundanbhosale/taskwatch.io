import { TaskboardProvider, useTaskBoard } from '@contexts/board'
import React from 'react'
import BoardColumns from '@components/taskboard/columns'
import BoardTable from '@components/taskboard/table'
import { useParams } from 'react-router-dom'

const SingleBoardScreen = () => {
  const params = useParams()
  const id = params.id

  return (
    <TaskboardProvider id={id as string}>
      <GetViews />
    </TaskboardProvider>
  )
}

const GetViews = () => {
  const { view } = useTaskBoard()

  return view === 'table' ? <BoardTable /> : <BoardColumns />
}

export default SingleBoardScreen
