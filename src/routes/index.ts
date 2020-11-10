import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersrouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersrouter)


export default routes;