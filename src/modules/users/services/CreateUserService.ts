import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

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
            throw new AppError('Email address already used by another', 400);
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