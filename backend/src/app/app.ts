import express, { Application } from 'express'
import cors from 'cors'
import notFoundApi from './middlewares/notFoundApi'
import router from './router/router'
import globalErrorHandler from './middlewares/globarErrorHandler'
import config from './config/config'
import cookieParser from 'cookie-parser'

const app: Application = express()
app.use(cookieParser())
app.use(cors({ origin: config.frontEndURL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use(globalErrorHandler)
// not found api
app.use(notFoundApi)

export default app
