import { NextFunction, Request, RequestHandler, Response } from 'express'

const handleAsyncRequest = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err))
  }
}
export default handleAsyncRequest
