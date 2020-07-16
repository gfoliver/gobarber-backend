import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import AuthService from '../services/AuthService'

const service = new AuthService()
const controller = new AuthController(service)

const router = Router()

router.post('/login', controller.login)

export default router