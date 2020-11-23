import { startOfHour, } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'; //PARA USAR O REPOSITORIO EXISTENTE

interface Request {
    provider_id: string,
    date: Date,
}

class CreateAppointmentService {

    public async execute({ provider_id, date }: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository); //PARA USAR O REPOSITORIO EXISTENTE

        const appointmentDate = startOfHour(date);

        const FindAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
        );

        if (FindAppointmentInSameDate) { //trativa de erro na rota

            throw new AppError('this appointment is already booked');
        }

        const appointment = await appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });


        return appointment //RETORNADO UM AGENDAMENTO
    }
}
export default CreateAppointmentService;