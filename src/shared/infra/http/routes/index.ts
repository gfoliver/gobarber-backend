import express, { Router } from 'express'
import { filesFolder } from '@config/upload'

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import authRouter from '@modules/users/infra/http/routes/auth.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/storage', express.static(filesFolder))

export default routes