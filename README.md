
<h3 align="center">
 Gobaber - RocketSeat -NodeJS
</h3>

### :computer: How To Run

 * Primeiro instale as dependencias:
 ```bash
yarn
 ```

### :computer: Scripts de inicialização:
  * Inicie a aplicação em modo desenvolvimento!
 ```bash
 yarn dev:server
 ```
 * banco configurado no docker, usando typerom


## 🤔 Tem alguma feature e quer contribuir?

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

---

Make with ♥ by Wesley Guerra :wave:

# Recuperação de senha

**RF** *Funcionalidades*

- O usuário deve poder recuperar sua senha informando o seu e-mail
- O usuário deve receber um e-mail co instruções de recuperação de senha;
- O usuário deve poder resetar sua senha

***RNF** *Requisito parte técnica , Ex: tipo de banco de dados*

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(background job);

**RN** *Rega de negocio*

- O link enviado por email para resetar, deve expirar em 2h;
- O Usuário precisa confirma a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usário deve poder atualizar seu nome, email e senha;

**RNF**

**RN** *Regra de negocio*

- O usuário não pode alterar seu email para email já utilizado;
- Para atualizar sua senha, o usuário deve informa a senha antiga
- Para atualizar sua senha, o usuário precisa confirma a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receceber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendmanetos do prestador no dia devem ser amazenados em cache;
- As notificações do prestador devem ser amazenadas no MoingoDB;
- As notificações do prestador devem ser enviadas  em tempo-real utilizando Socket.io;

**RN** 

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN** 

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro ás 8h, útilmo ás 17h );
- O usuário não pode agendar em um horário jpa ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serciços consigo mesmo;