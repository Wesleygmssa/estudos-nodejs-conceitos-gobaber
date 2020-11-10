import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/Users';
import { sign, verify } from 'jsonwebtoken';


interface Request {
    email: string;
    password: string;
}

class AuthencateUserService {
    public async execute({ email, password }: Request): Promise<{ token: string, user: User }> {
        const usersRepository = getRepository(User); // todos metodosll

        const user = await usersRepository.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('Incorrect email/password combination');
        }

        //user.password = senha criptografada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        const token = sign({}, '0896d540fa716bca32b9a10d534db308', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        }

    }
}

export default AuthencateUserService;