//MODELS ESTÁ RELACIONADO COM UMA TABELA NO BANCO DE DADOS

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';


@Entity('users_tokens') //ENVIA A CLASS COMO PARAMNETRO PARA ENTIDADE.
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}

export default UserToken;