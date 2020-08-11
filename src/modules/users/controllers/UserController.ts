import { Request, Response } from "express"
import UserService from "@modules/users/services/UserService"
import response from "@shared/infra/http/utils/response"
import { container } from 'tsyringe'

class UserController {
    create = async (req: Request, res: Response) => {
        const { name, email, password } = req.body
        const service = container.resolve(UserService)
        
        const user = await service.create({ name, email, password })

        return response({
            res,
            status: true,
            data: { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            }
        })
    }

    avatar = async (req: Request, res: Response) => {
        const { filename } = req.file
        const { email } = req.user
        
        const service = container.resolve(UserService)

        const user = await service.saveAvatar({ email, avatar: filename })

        return response({
            res,
            status: true,
            data: { user }
        })
    }
}

export default UserController