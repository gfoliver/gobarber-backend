import { Router } from 'express'
import UserService from '../services/UserService'
import UserController from '../controllers/UserController'
import verifyToken from '../middlewares/verifyToken'
import multer from 'multer'
import uploadConfig from '../config/upload'

const service = new UserService()
const controller = new UserController(service)
const upload = multer(uploadConfig)

const router = Router()

router.post('/', controller.create)

router.post('/avatar', verifyToken, upload.single('avatar'), controller.avatar)

export default router