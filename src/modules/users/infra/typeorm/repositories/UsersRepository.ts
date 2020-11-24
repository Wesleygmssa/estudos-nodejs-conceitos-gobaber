import { Repository, getRepository } from 'typeorm'
import IUsersRepository from '@modules/users/I_Repositories/IUsersRepository';
import User from '../entities/Users';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepositor implements IUsersRepository {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findbyEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });

        return user;
    }


    //metodo de criação e usuário.
    public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({ email, name, password })

        await this.ormRepository.save(user)

        return user
    }


    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepositor;