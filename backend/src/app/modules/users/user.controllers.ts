import { Request, Response } from 'express'
import handleAsyncRequest from '../../utils/handleAsyncRequest'
import { userServices } from './users.services'
import httpStatus from 'http-status'
import config from '../../config/config'

const createUser = handleAsyncRequest(async (req: Request, res: Response) => {
  const token = await userServices.createUserInDB(req.body)

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: config.enviroment === 'production',
    maxAge: 86400000,
  })

  res.status(httpStatus.OK).json({
    success: true,
    message: 'user registered successfully',
    data: {},
  })
})

export const userControllers = {
  createUser,
}
