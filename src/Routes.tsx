import React, { Fragment } from 'react'
import { useRoutes } from 'react-router-dom'
import Boardlist from './pages/boards/list'
import SingleBoardScreen from './pages/single'
import { ErrorStateBanner } from '@components/stateBanners'
import HomeScreen from '@pages/home'

// const Route: React.FC<{ element: React.ReactNode }> = ({ element }) => {
//   return <Fragment>{element}</Fragment>
// }

const AllRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <HomeScreen /> },
    {
      path: '/boards',
      element: <Boardlist />,
    },
    {
      path: '/board/:id',
      element: <SingleBoardScreen />,
    },
    {
      path: '*',
      element: (
        <div className="h-100 flex flex-center">
          <ErrorStateBanner
            summary={`It feels like, Page you are looking for doesn't exist`}
          />
        </div>
      ),
    },
  ])

  return routes
}

export default AllRoutes
