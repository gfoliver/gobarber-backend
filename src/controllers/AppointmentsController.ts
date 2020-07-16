import { Request, Response } from 'express'
import response from '../utils/response'
import AppointmentsService from '../services/AppointmentsService'
import { parseISO } from 'date-fns'

class AppointmentsController {
    private service: AppointmentsService

    constructor(appointmentsService: AppointmentsService) {
        this.service = appointmentsService
    }

    public create = async (req: Request, res: Response) => {
        const { provider_id, date } = req.body
        const parsedDate = parseISO(date)

        const appointment = await this.service.create({ 
            provider_id, 
            date: parsedDate 
        })
    
        return response({
            res,
            status: true,
            data: { appointment }
        })

    }

    public index = async (req: Request, res: Response) => {
        const appointments = await this.service.all()
        return response({
            res, 
            status: true, 
            data: { appointments }
        })
    }
}

export default AppointmentsController