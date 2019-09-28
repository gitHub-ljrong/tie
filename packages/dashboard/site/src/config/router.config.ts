import BasicLayout from '@layouts/BasicLayout'
import Index from '@pages/index'
import Middleware from '@pages/Middleware'
import Router from '@pages/Router'
import Config from '@pages/Config'

const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        component: Index,
      },
    ],
  },
  {
    path: '/-dev-dashboard',
    component: BasicLayout,
    children: [
      {
        path: '/',
        component: Index,
      },
      {
        path: '/middleware',
        component: Middleware,
      },
      {
        path: '/router',
        component: Router,
      },
      {
        path: '/config',
        component: Config,
      },
    ],
  },
]

export default routes
