import Appointment from '../models/Appointment'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
    public async findByDate(date: Date) : Promise<Appointment | null> {
        const appointment = await this.findOne({
            where: { date }
        })

        return appointment || null
    }
}

export default AppointmentRepository