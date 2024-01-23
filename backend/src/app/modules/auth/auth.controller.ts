import config from '../../config/config'
import handleAsyncRequest from '../../utils/handleAsyncRequest'
import { login } from './auth.services'
import { Request, Response } from 'express'

export const loginUser = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const { token, _id } = await login(req.body)

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: config.enviroment === 'production',
      maxAge: 86400000,
    })

    res.status(200).json({
      success: true,
      message: 'user logged in successfully',
      data: { _id },
    })
  },
)
