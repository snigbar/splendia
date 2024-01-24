import config from '../../config/config'
import { UserType } from './users.interface'
import UserModel from './users.model'
import jwt from 'jsonwebtoken'

const createUserInDB = async (payload: UserType) => {
  try {
    const isUserExists = await UserModel.isUserExist(payload.email)
    if (isUserExists) {
      throw new Error('User already exists')
    }
    const user = new UserModel(payload)
    await user.save()

    const token = jwt.sign({ userId: user._id }, config.jwtSecret as string, {
      expiresIn: '1d',
    })

    return token

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const userServices = {
  createUserInDB,
}
