import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import dotenv from 'dotenv-safe'
import exceptionHandler from './middlewares/exceptionHandler'

dotenv.config()

import 'reflect-metadata'
import './database'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(exceptionHandler)

export default app