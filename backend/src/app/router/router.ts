import express from 'express'
import { userRoutes } from '../modules/users/users.routes'
import { authRoute } from '../modules/auth/auth.route'

const router = express.Router()

const routes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoute,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
