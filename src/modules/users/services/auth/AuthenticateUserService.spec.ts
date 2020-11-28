import AppError from '@shared/errors/AppError';
import FakeUserRespository from '../../I_Repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '../Create_user/CreateUserService';

//teste unitario
describe('AuthenticateUser', () => {

    it('should be able to authenticate', async () => {

        const fakeUserRespository = new FakeUserRespository(); // criando um repositorio do zero
        const createUserService = new CreateUserService(fakeUserRespository);
        const authenticateUserService = new AuthenticateUserService(fakeUserRespository);

        //criando usuário
        await createUserService.execute({
            name: 'Wesley',
            email: 'Wesleyguerra9@gmail.com',
            password: '123456',
        });

        //verificando autenticação
        const response = await authenticateUserService.execute({
            email: 'Wesleyguerra9@gmail.com',
            password: '123456',
        });

        // espero que na minha resposta tenha uma propriedade token
        expect(response).toHaveProperty('token');

    });

});