import { Request, Response } from "express"
import UserService from "../services/UserService"
import response from "../utils/response"

class UserController {
    private service: UserService

    constructor(service: UserService) {
        this.service = service
    }

    create = async (req: Request, res: Response) => {
        const { name, email, password } = req.body

        const user = await this.service.create({ name, email, password })

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
        
        const user = await this.service.saveAvatar({ email, avatar: filename })

        return response({
            res,
            status: true,
            data: { user }
        })
    }
}

export default UserController