import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();


appointmentsRouter.use(ensureAuthenticated); // aplicanto middlewares em todas as rotas

// appointmentsRouter.get('/', async (request, response) => {

//     const appointments = await appointmentRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);


export default appointmentsRouter;