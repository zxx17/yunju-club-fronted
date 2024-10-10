import App from '@/App'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'questionBank',
        Component: lazy(() => import('@views/question-bank'))
      },
      {
        path: 'brush-question/:id',
        // element: <BrushQuestions />
        Component: lazy(() => import('@views/brush-questions'))
      },
      {
        path: 'upload-question',
        // element: <UploadQuestions />
        Component: lazy(() => import('@views/upload-questions'))
      },
      {
        path: 'login',
        // element: <Login />
        Component: lazy(() => import('@views/login'))
      },
      {
        path: 'user-info',
        // element: <UserInfo />
        Component: lazy(() => import('@views/user-info'))
      },
      {
        path: 'search-detail',
        Component: lazy(() => import('@views/search-details'))
      },
      {
        path: 'personal-center/:tab',
        Component: lazy(() => import('@views/personal-center'))
      },
      {
        path: 'practiseQuestions',
        Component: lazy(() => import('@views/practise/practise-questions'))
      },
      {
        path: 'practise-detail/:setId',
        Component: lazy(() => import('@views/practise/practise-details/index.jsx'))
      },
      {
        path: 'practise-analytic/:id',
        Component: lazy(() => import('@views/practise/practise-analytic'))
      },
      {
        path: 'yunjuClub',
        Component: lazy(() => import('@views/chicken-circle'))
      },
      {
        path: 'iotSimulationLab',
        Component: lazy(() => import('@views/iot-simulation-lab'))
      },
      {
        path: 'iotSimulationLabFrame',
        Component: lazy(() => import('@/views/iot-simulation-lab/frame-lab/index'))
      },
      {
        path: 'iotCloudLabWelcome',
        Component: lazy(() => import('@/views/iot-cloud-lab/index'))
      },
      {
        path: 'ioTCloudLab',
        Component: lazy(() => import('@/views/iot-cloud-lab/cloud-lab/index'))
      }
    ]
  }
])

export default router
