import { NextFunction, Request, Response, Router } from 'express'
import { authValidationSchema } from './auth.validations'
import { getToken, loginUser } from './auth.controller'
import verifyToken from '../../middlewares/auth'

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

router.get('/validate-token', verifyToken, getToken)

export const authRoute = router
