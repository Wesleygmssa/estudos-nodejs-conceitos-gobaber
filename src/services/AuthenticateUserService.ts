import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/Users';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';


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

        const token = sign({}, authConfig.jwt.secret, {
            subject: authConfig.jwt.expirenIn,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        }

    }
}

export default AuthencateUserService;