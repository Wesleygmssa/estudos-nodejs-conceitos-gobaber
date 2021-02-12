import FakeUserRespository from '../I_Repositories/fakes/FakeUsersRepository'; // repositorio para teste
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';


//teste unitario
describe('UpdateUserAvatar', () => {

    it('should be able to create a new user', async () => {
        const fakeUserRespository = new FakeUserRespository();
        const fakeStorageProvider = new FakeStorageProvider();


        const updateUserAvatar = new UpdateUserAvatarService( // inversão de dependencia
            fakeUserRespository,
            fakeStorageProvider
        )

        const user = await fakeUserRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        });


        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        const fakeUserRespository = new FakeUserRespository();
        const fakeStorageProvider = new FakeStorageProvider();


        const UpdateUserAvatar = new UpdateUserAvatarService( // inversão de dependencia
            fakeUserRespository,
            fakeStorageProvider
        )

        await expect(UpdateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.jpg'

        })).rejects.toBeInstanceOf(AppError)
    });

    it('should delete old avatar when updating new one', async () => {
        const fakeUserRespository = new FakeUserRespository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const UpdateUserAvatar = new UpdateUserAvatarService( // inversão de dependencia
            fakeUserRespository,
            fakeStorageProvider
        )

        const user = await fakeUserRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',

        })

        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'

        });

        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'

        });

        await expect(deleteFile).toHaveBeenCalledWith('avatar'); // funcção tenha sido chamada com parametro especifico
        await expect(user.avatar).toBe('avatar2.jpg');
    });

});