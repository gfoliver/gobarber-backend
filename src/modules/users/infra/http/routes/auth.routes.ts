import { Router } from 'express'
import AuthController from '@modules/users/controllers/AuthController'

const controller = new AuthController()

const router = Router()

router.post('/login', controller.login)

export default router