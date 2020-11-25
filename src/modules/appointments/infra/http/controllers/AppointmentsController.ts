import { Request, Response } from 'express';
import { parseISO } from 'date-fns';


import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;

        const appointmentsRepository = new AppointmentsRepository();

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentServices(appointmentsRepository);

        const appointment = await createAppointment.execute({ provider_id, date: parseDate })

        return response.json(appointment);
    }
}