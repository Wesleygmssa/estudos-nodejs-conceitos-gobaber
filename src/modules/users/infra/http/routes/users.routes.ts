/* 
*
* Repositories
* Services
*
*/
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controller/UsersController';

import UserAvatarController from '../controller/UserAvatarController';


import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);


usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'), userAvatarController.update);


export default usersRouter;