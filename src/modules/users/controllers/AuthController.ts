import AuthService from "@modules/users/services/AuthService"
import { Request, Response } from "express"
import response from "@shared/infra/http/utils/response"
import { container } from "tsyringe"

class AuthController {
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const service = container.resolve(AuthService)

        const { token, user } = await service.login({ email, password })
        
        return response({
            res, 
            status: true,
            data: { token, user }
        })
    }
}

export default AuthController