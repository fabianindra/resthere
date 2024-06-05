import express, { Application, Response, Request } from 'express';
import bodyParser from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routers/auth.router';
import propertyRouter from './routers/property.router';
import roomRouter from './routers/room.router';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/property', propertyRouter);
app.use('/api/room', roomRouter);

const PORT = 6570;

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'REST API running',
  });
});

app.listen(PORT, () => {
  console.log('application run on port : ', PORT);
});
