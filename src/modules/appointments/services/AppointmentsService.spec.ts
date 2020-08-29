import FakeRepository from '../repositories/fake/AppointmentsRepository'
import AppointmentsService from './AppointmentsService'
import AppError from '@shared/errors/Error'

describe('AppointmentsService', () => {
    it('should be able to create a new appointment', async () => {
        const repository = new FakeRepository()
        const service = new AppointmentsService(repository)

        const date = new Date()

        const appointment = await service.create({ date, provider_id: 1 })

        expect(appointment).toHaveProperty('id')
        expect(appointment).toHaveProperty('date')
        expect(appointment).toHaveProperty('provider_id', 1)
    })

    it('should not be able to create two appointments on the same time', async () => {
        const repository = new FakeRepository()
        const service = new AppointmentsService(repository)

        const date = new Date()

        await service.create({ date, provider_id: 1 })

        expect(service.create({ date, provider_id: 1 })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to find appointments', async () => {
        const repository = new FakeRepository()
        const service = new AppointmentsService(repository)

        const appointment = await service.create({ date: new Date(), provider_id: 1 })
        const all = await service.all()

        expect(all).toHaveLength(1)
        expect(all).toContain(appointment)
    })
})