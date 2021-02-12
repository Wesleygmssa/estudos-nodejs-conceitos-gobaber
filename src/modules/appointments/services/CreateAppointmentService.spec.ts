import AppError from '@shared/errors/AppError';
import FakeAppointmentRespository from '../I_Repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

//teste unitario
describe('CreateAppointment', () => {

    //deve ser capaz de criar um agendamento
    it('should be able to create new appoinment', async () => {

        const fakeAppointmentRespository = new FakeAppointmentRespository();
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

        //criando agendamento não tem retorno
        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123123',
        });

        // criando outro agendamento na mesma data retornando um erro
        expect(createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError)
    });
})



//Primary Test

// test('sum two numbers', () => {
//     expect(1 + 2).toBe(3);
// });