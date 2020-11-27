import 'reflect-metadata';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/I_Repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

//metodos javaScript puro / trabalhando variavel em memoria
class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        //encontrando uma data mesmo horario retorna
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date)
        );

        return findAppointment;
    }

    public async create({
        date,
        provider_id
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment(); // criando um objeto

        // Object.assign(appointment, { id: uuid(), date, provider_id });

        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;

        this.appointments.push(appointment);

        return appointment

    }
}

export default AppointmentsRepository;