import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const usersRepository = new UsersRepository();
    const authenticateUserService = new AuthenticateUserService(usersRepository);


    const { email, password } = request.body;

    const { token, user } = await authenticateUserService.execute({
        email,
        password
    });

    // delete user.password;
    return response.json({ user, token });


});


export default sessionsRouter;