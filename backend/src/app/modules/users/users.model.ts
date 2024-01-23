import { UserModel, UserType } from './users.interface'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config/config'

const userSchema = new mongoose.Schema<UserType, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'at least 8 characters long'],
    maxlength: [20, 'maximum 20 characters long'],
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, Number(config.salt))
  }
  next()
})

userSchema.statics.isUserExist = async (email: string) => {
  return await UserModel.findOne({ email })
}

const UserModel = mongoose.model<UserType, UserModel>('user', userSchema)

export default UserModel
