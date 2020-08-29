import { Router } from 'express'
import UserController from '@modules/users/controllers/UserController'
import verifyToken from '@modules/users/infra/http/middlewares/verifyToken'
import multer from 'multer'
import uploadConfig from '@config/upload'

const controller = new UserController()
const upload = multer(uploadConfig)

const router = Router()

router.post('/', controller.create)

router.post('/avatar', verifyToken, upload.single('avatar'), controller.avatar)

export default router