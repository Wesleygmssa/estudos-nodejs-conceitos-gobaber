import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

//fica entre as rotas
export default function ensureAuthentiicated(request: Request, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT is missing');
    }

    const [, token] = authHeader.split(' ');

    try {

        const decode = verify(token, authConfig.jwt.secret);

        const { sub } = decode as TokenPayload;

        //@types/express.d.ts
        request.user = {
            id: sub,
        }

        return next(); // continuar usando aplicação

    } catch (err) {

        throw new Error('Invalid JWT token');
    }


}