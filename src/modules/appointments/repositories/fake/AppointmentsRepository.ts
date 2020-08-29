import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { isEqual } from 'date-fns'

class AppointmentRepository implements IAppointmentsRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public async create({ date, provider_id }: ICreateAppointmentDTO) : Promise<Appointment> {
        let appointment = new Appointment()
        const id = this.appointments.length + 1
        Object.assign(appointment, { id, date, provider_id })
        
        this.appointments.push(appointment)

        return appointment
    }

    public async find(): Promise<Appointment[]> {
        return this.appointments
    }

    public async findByDate(date: Date) : Promise<Appointment | undefined> {
        const appointment = this.appointments.find(a => isEqual(a.date, date))

        return appointment
    }
}

export default AppointmentRepository