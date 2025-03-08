import React, { Suspense } from 'react'
import getAppRouter from './Configurations/getAppRouter'
import { RouterProvider } from 'react-router-dom'
import Loader from '~/src/Components/Loader/Loader'

let router: ReturnType<typeof getAppRouter> | undefined

const AppRouter: React.FC = () => {
  if (!router) {
    router = getAppRouter()
  }
  return (
    <Suspense fallback={<Loader fullScreen size='large' />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRouter
