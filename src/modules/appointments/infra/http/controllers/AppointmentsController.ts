import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';


import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;

        const createAppointment = container.resolve(CreateAppointmentServices); //instanciando a class para ser usada

        const parseDate = parseISO(date); // modificação OBS: não é regra de negocio

        const appointment = await createAppointment.execute({ provider_id, date: parseDate }); // utilizando o service

        return response.json(appointment); // retortando para api os dados de um agendamento
    }
}