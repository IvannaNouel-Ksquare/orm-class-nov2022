import express, { Application, Request, Response } from 'express';
const app: Application = express();
import { TodoRouter } from './routes/Todo.routes'
import { UrlRouter } from './routes/Url.routes'
import { UserRouter } from './routes/user.routes';

app.use(express.json());
app.use('/todos', TodoRouter);
app.use('/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

app.use('/url', UrlRouter);


export default app;