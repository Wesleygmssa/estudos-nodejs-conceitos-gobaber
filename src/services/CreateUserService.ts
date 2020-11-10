import { getRepository } from 'typeorm';
import User from '../models/Users';
import { hash } from 'bcryptjs';

interface Request {
    name: string, email: string, password: string;
}

class CreateUserSerive {

    public async execute({ name, email, password }: Request): Promise<User> {

        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: { email: email }
        });

        if (checkUserExist) {
            throw new Error('Email address already used by another');
        }

        const hasgedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hasgedPassword,
        });

        // delete user.password;

        await usersRepository.save(user)

        return user;
    }

}

export default CreateUserSerive;