import { Request, Response } from 'express'
import response from '@shared/infra/http/utils/response'
import AppointmentsService from '@modules/appointments/services/AppointmentsService'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

class AppointmentsController {
    public create = async (req: Request, res: Response) => {
        const { provider_id, date } = req.body
        const parsedDate = parseISO(date)
        const service = container.resolve(AppointmentsService)

        const appointment = await service.create({ 
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
        const service = container.resolve(AppointmentsService)
        const appointments = await service.all()
        
        return response({
            res, 
            status: true, 
            data: { appointments }
        })
    }
}

export default AppointmentsController