import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/I_Repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/Users';


class FakeUsersRepositor implements IUsersRepository {
    private users: User[] = []

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id)
        return findUser;
    }

    public async findbyEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create({ email, name, password }: ICreateUserDTO): Promise<User> {

        const user = new User(); //criando usuário através do models entidade

        // Object.assign(appointment, 
        // {
        //     id: uuid(),
        //         name,
        //         password
        // });

        user.id = uuid();
        user.email = email;
        user.name = name;
        user.password = password;

        this.users.push(user); // jogando usuário no array

        return user;
    }

    public async save(user: User): Promise<User> {

        const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepositor;