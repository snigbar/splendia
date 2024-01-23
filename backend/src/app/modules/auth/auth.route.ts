import { NextFunction, Request, Response, Router } from 'express'
import { authValidationSchema } from './auth.validations'
import { loginUser } from './auth.controller'

const router = Router()

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authValidationSchema.parseAsync(req.body)
    } catch (error) {
      next(error)
    }
    next()
  },
  loginUser,
)

export const authRoute = router
