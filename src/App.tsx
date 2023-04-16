import React from 'react'
import { ThemeProvider } from 'styled-components'
import AllRoutes from './Routes'
import { GlobalStyles } from './styled/global'
import { Theme } from './styled/theme'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '@components/navBar'
import { Helmet } from 'react-helmet'

const App = () => {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Task Watch</title>
        <meta
          name="description"
          content="Simplify Your Life and Work with Our Free, Personal Use Kanban Board - Your Data Stored Locally and Offline-Friendly."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Navbar />
        <Toaster position="bottom-center" containerClassName="toaster" />
        <AllRoutes />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
