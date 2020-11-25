import { Router } from 'express';
import SessionsCoontroller from '../controller/SessionsCoontroller';


const sessionsRouter = Router();
const sessionsCoontroller = new SessionsCoontroller();

sessionsRouter.post('/', sessionsCoontroller.create);


export default sessionsRouter;