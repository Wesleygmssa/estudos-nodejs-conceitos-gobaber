import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';


import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;

        const createAppointment = container.resolve(CreateAppointmentServices)

        const parseDate = parseISO(date);

        const appointment = await createAppointment.execute({ provider_id, date: parseDate })

        return response.json(appointment);
    }
}