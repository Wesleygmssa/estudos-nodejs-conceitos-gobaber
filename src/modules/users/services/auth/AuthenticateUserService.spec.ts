import AppError from '@shared/errors/AppError';
import FakeUserRespository from '../../I_Repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '../Create_user/CreateUserService';

//teste unitario
describe('AuthenticateUser', () => {

    it('should be able to authenticate', async () => {

        const fakeUserRespository = new FakeUserRespository(); // criando um repositorio do zero
        const fakeHashProvider = new FakeHashProvider()

        const createUserService = new CreateUserService(fakeUserRespository, fakeHashProvider);
        const authenticateUserService = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

        //criando usuário
        const user = await createUserService.execute({
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
        expect(response.user).toEqual('user');
    });

});