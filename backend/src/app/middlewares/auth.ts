import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import config from '../config/config'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth_token']
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string)

    req.userId = (decoded as JwtPayload).userId
    next()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'unauthorized token')
  }
}

export default verifyToken
