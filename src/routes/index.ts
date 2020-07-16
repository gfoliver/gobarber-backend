import express, { Router } from 'express'
import { filesFolder } from '../config/upload'

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import authRouter from './auth.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/storage', express.static(filesFolder))

export default routes