import { startOfHour } from 'date-fns'
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"
import AppError from '@shared/errors/Error'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
class AppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private repository: IAppointmentsRepository
    ) {}

    public create = async ({ provider_id, date } : Pick<Appointment, "provider_id" | "date">) : Promise<Appointment> => {
        const parsedDate = startOfHour(date)

        const appointmentInSameDate = await this.repository.findByDate(parsedDate)

        if (appointmentInSameDate)
            throw new AppError('Appointment already booked!')

        const appointment = await this.repository.create({ provider_id, date: parsedDate })

        return appointment
    }

    public all = async (): Promise<Appointment[]> => {
        return this.repository.find()
    }
}

export default AppointmentsService