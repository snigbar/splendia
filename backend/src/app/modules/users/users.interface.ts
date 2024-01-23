import { Model } from 'mongoose'

export type UserType = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserModel extends Model<UserType> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(email: string): Promise<UserType>
}
