import 'reflect-metadata'

import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv-safe'

dotenv.config()

import '@shared/infra/typeorm'
import '@shared/container'

import routes from '@shared/infra/http/routes'
import exceptionHandler from '@shared/infra/http/middlewares/exceptionHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(exceptionHandler)

export default app