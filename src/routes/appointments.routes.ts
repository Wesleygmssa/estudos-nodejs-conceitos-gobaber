// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { parseISO } from 'date-fns';


import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();



appointmentsRouter.get('/appointments', async (request, response) => {

    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});



appointmentsRouter.post('/appointments', async (request, response) => {

    try { //TRATATIVA DE ERRO.
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentServices();

        const appointment = await createAppointment.execute({ provider, date: parseDate })

        return response.json(appointment);

    } catch (error) { // throw Error('this appointment is already booked');

        return response.status(400).json({ error: error.message });
    }
});


export default appointmentsRouter