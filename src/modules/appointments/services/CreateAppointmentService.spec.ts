//Primary Test

// test('sum two numbers', () => {
//     expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import FakeAppointmentRespository from '../I_Repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

//teste unitario
describe('CreateAppointment', () => {
    it('should be able to create new appoinment', async () => {

        const fakeAppointmentRespository = new FakeAppointmentRespository();
        //inversão de dependencia
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRespository);

        const appoinment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(appoinment).toHaveProperty('id');
        expect(appoinment.provider_id).toBe('123123');
    });

    it('should no be able to create two appoinments on the same time', async () => {
        const fakeAppointmentRespository = new FakeAppointmentRespository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRespository);//inversão de dependencia

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123123',
        });

        expect(createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError)
    });
})