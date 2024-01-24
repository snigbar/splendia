import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  mongoDBURL: process.env.MONGO_URI,
  enviroment: process.env.ENVIROMENT,
  salt: process.env.SALT,
  jwtSecret: process.env.JWT_SECRET,
  frontEndURL: process.env.FRONT_END_URL,
}
