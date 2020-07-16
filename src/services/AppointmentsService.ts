import { startOfHour } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import Appointment from "../models/Appointment"
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/Error'

class AppointmentsService {
    public create = async ({ provider_id, date } : Pick<Appointment, "provider_id" | "date">) : Promise<Appointment> => {
        const repository = getCustomRepository(AppointmentsRepository)
        const parsedDate = startOfHour(date)

        const appointmentInSameDate = await repository.findByDate(parsedDate)

        if (appointmentInSameDate)
            throw new AppError('Appointment already booked!')

        const appointment = repository.create({ provider_id, date: parsedDate })
        
        await repository.save(appointment)

        return appointment
    }

    public all = async (): Promise<Appointment[]> => {
        const repository = getCustomRepository(AppointmentsRepository)
        return repository.find()
    }
}

export default AppointmentsService