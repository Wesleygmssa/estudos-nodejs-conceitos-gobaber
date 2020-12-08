import IMailProvider from '../models/IMailProvider';


interface IMessage {
    to: string;
    body: string;
}

//definir quais metodos essa class precisa ter (IMailProvider)
export default class FakeMailProvider implements IMailProvider {
    private messages: IMessage[] = []; // armazenamento fake

    //metodos (IMailProvider)
    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body,
        });
    }
}