import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { Repository, getRepository } from 'typeorm'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>
    
    constructor() {
        this.ormRepository = getRepository(Appointment)
    }
    
    public async create({ date, provider_id }: ICreateAppointmentDTO) : Promise<Appointment> {
        const appointment = this.ormRepository.create({ date, provider_id })
        await this.ormRepository.save(appointment)

        return appointment
    }

    public async find(): Promise<Appointment[]> {
        const appointments = await this.ormRepository.find()

        return appointments
    }

    public async findByDate(date: Date) : Promise<Appointment | undefined> {
        const appointment = await this.ormRepository.findOne({
            where: { date }
        })

        return appointment
    }
}

export default AppointmentRepository