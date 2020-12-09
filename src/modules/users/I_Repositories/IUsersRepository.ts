import User from '../infra/typeorm/entities/Users';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    //encontrar por id
    findById(id: string): Promise<User | undefined>;
    //encontrar por email
    findbyEmail(email: string): Promise<User | undefined>;
    //criar um usuário
    create(data: ICreateUserDTO): Promise<User>;
    //salvar usuário
    save(user: User): Promise<User>;

}

export default IUsersRepository;