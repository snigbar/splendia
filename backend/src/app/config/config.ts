import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  mongoDBURL: process.env.MONGO_URI,
  enviroment: process.env.ENVIROMENT,
}
