import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

//interface do appointiment
import IAppointmentsRepository from '@modules/appointments/I_Repositories/IAppointmentsRepository';
//repository metodos que interage com banco de dados
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

/*****************************************/

import IUsersRepository from '@modules/users/I_Repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/* ************************************** */


// import IUserTokensRepository from '@modules/users/I_Repositories/IUserTokensRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);