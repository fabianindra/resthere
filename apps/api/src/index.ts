import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import session from 'express-session';
import authRouter from './routers/auth.router';
import propertyRouter from './routers/property.router';
import roomRouter from './routers/room.router';

import passport from './passport.config';

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET || 'defaultSecret';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

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
  console.log('Application running on port:', PORT);
});
