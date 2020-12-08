// quais propriedades de email vão oferecer
// funcionalidades
export default interface IMailProvider {
    sendMail(to: string, body: string): Promise<void>
}
//KISS