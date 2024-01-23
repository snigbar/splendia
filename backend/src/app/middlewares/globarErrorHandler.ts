import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR
  const message = err.message || 'something went wrong'

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: err,
  })
}

export default globalErrorHandler
