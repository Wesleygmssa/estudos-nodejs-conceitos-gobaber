// import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'; //PARA USAR O REPOSITORIO EXISTENTE
import { startOfHour, } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../I_Repositories/IAppointmentsRepository';


interface Request {
    provider_id: string,
    date: Date,
}

@injectable()
class CreateAppointmentService {
    //pegando repositorio
    constructor(
        @inject('AppointmentsRepository') // chamando repositorio
        private appointmentsRepository: IAppointmentsRepository,
    ) { }

    public async execute({ provider_id, date }: Request): Promise<Appointment> {

        const appointmentDate = startOfHour(date); // transformação 

        const FindAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate
        );

        if (FindAppointmentInSameDate) {
            throw new AppError('this appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment; //RETORNADO UM AGENDAMENTO
    }
}
export default CreateAppointmentService;