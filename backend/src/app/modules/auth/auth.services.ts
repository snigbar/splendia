import jwt from 'jsonwebtoken'
import UserModel from '../users/users.model'
import { loginType } from './auth.interface'
import bcrypt from 'bcrypt'
import config from '../../config/config'

export const login = async (payload: loginType) => {
  const { email, password } = payload
  const user = await UserModel.findOne({ email })

  if (!user) throw new Error('No user found with this email')
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('invalid credentials')

  const token = jwt.sign({ userId: user._id }, config.jwtSecret as string, {
    expiresIn: '1d',
  })

  return {
    token,
    userId: user._id,
  }
}
