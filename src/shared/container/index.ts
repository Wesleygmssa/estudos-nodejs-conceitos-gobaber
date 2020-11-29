import { container } from 'tsyringe';
import '@modules/users/providers';

//interface do appointiment
import IAppointmentsRepository from '@modules/appointments/I_Repositories/IAppointmentsRepository';
//repository metodos que interage com banco de dados
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

/*****************************************/

//interface do userey
import IUsersRepository from '@modules/users/I_Repositories/IUsersRepository';
//repository
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);