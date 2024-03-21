import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'
import { Home } from './pages/Home'

export const Router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [
      { path: '/', Component: Home },
      { path: '/history', Component: History },
    ],
  },
])
