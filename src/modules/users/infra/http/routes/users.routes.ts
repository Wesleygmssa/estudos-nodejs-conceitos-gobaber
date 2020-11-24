/* 
*
* Repositories
* Services
*
*/
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request, response) => {
    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);


});


usersRouter.patch('/avatar', ensureAuthenticate,
    upload.single('avatar'),
    async (request, response) => {
        const usersRepository = new UsersRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);
        //R. User
        const user = await updateUserAvatarService.execute({

            user_id: request.user.id, //global no request
            avatarFileName: request.file.filename, // codigo da imagem
        });

        // delete user.password;

        return response.json(user)


    });


export default usersRouter;