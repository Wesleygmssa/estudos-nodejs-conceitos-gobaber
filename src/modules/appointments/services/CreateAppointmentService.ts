// import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'; //PARA USAR O REPOSITORIO EXISTENTE
import { startOfHour, } from 'date-fns';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../I_Repositories/IAppointmentsRepository';


interface Request {
    provider_id: string,
    date: Date,
}

class CreateAppointmentService {
    //pegando repositorio
    private appointmentsRepository: IAppointmentsRepository;
    constructor(appointmentsRepository: IAppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public async execute({ provider_id, date }: Request): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const FindAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate
        );

        if (FindAppointmentInSameDate) { //trativa de erro na rota

            throw new AppError('this appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });


        return appointment //RETORNADO UM AGENDAMENTO
    }
}
export default CreateAppointmentService;