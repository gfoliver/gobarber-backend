import { Router } from 'express'
import AppointmentsController from '../controllers/AppointmentsController'
import AppointmentsService from '../services/AppointmentsService'
import verifyToken from '../middlewares/verifyToken'

const service = new AppointmentsService()
const controller = new AppointmentsController(service)

const router = Router()

router.post('/', verifyToken, controller.create)

router.get('/', controller.index)

export default router