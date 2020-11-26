import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/I_Repositories/IAppointmentsRepository';
import Appointment from '../../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

//metodos que interagem com banco de dados
class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        //encontrando uma data mesmo horario
        const findAppointment = this.appointments.find(appointment => {
            appointment.date = date;
        });

        return findAppointment;
    }


    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
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