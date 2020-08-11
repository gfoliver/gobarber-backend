import { Router } from 'express'
import AppointmentsController from '@modules/appointments/controllers/AppointmentsController'
import verifyToken from '@modules/auth/infra/http/middlewares/verifyToken'

const controller = new AppointmentsController()

const router = Router()

router.post('/', verifyToken, controller.create)

router.get('/', controller.index)

export default router