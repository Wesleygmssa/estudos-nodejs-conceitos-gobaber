import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); //TRABALHANDO COM JSON
app.use(routes); //ROTAS



app.listen('3333', () => {
    console.log('Server start on port 3333');
});
