import { Response } from "express"

interface responseHandlerDTO {
    res: Response
    status: boolean
    message?: String
    data?: Object
    statusCode?: number
}

const response = ({ res, status, message, data, statusCode }: responseHandlerDTO) => {
    if (statusCode)
        res.status(statusCode)

    return res.json({ status, message, data })
}

export default response