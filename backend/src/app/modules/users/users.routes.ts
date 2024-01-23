import { NextFunction, Request, Response, Router } from 'express'
import { userControllers } from './user.controllers'
import userValidations from './users.validation'

const router = Router()

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userValidations.userValidationSchema.parseAsync(req.body)
    } catch (error) {
      next(error)
    }
    next()
  },
  userControllers.createUser,
)

export const userRoutes = router
