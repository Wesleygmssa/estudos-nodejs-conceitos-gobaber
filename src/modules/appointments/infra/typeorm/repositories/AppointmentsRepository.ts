import { EntityRepository, Repository, getRepository } from 'typeorm'
import IAppointmentsRepository from '@modules/appointments/I_Repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

//metodos que interagem com banco de dados
class AppointmentsRepository
    implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>
    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    // public async findByDate(date: Date): Promise<Appointment | undefined> {
    //     const FindAppointment = await this.ormRepository.findOne({
    //         where: { date: date }
    //     });
    //     return FindAppointment;
    // }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const FindAppointment = await this.ormRepository.findOne({
            where: { date: date }
        });
        return FindAppointment;
    }

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date })

        await this.ormRepository.save(appointment)

        return appointment
    }
}

export default AppointmentsRepository;