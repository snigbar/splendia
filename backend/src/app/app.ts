import express, { Application } from 'express'
import cors from 'cors'
import notFoundApi from './middlewares/notFoundApi'
import router from './router/router'
import globalErrorHandler from './middlewares/globarErrorHandler'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use(globalErrorHandler)
// not found api
app.use(notFoundApi)

export default app
