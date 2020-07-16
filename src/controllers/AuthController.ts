import AuthService from "../services/AuthService"
import { Request, Response, NextFunction } from "express"
import response from "../utils/response"

class AuthController {
    private service: AuthService

    constructor(service: AuthService) {
        this.service = service
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const token = await this.service.login({ email, password })

        return response({
            res, 
            status: true,
            data: { token }
        })
    }
}

export default AuthController