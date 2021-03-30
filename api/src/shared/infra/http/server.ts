import 'reflect-metadata';
import 'dotenv/config';

import { createServer } from 'http';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { errors, isCelebrateError, CelebrateError } from 'celebrate';

import routes from '@shared/infra/http/routes';

import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/container';
import '@shared/infra/typeorm'


const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(errors({ statusCode: 400 }));

app.use(routes);

app.use(
  (
    err: AppError | CelebrateError,
    req: Request,
    res: Response,
    _: NextFunction,
  ) => {
    console.log(err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    if (isCelebrateError(err)) {
      return res.status(400).json({
        status: 'error',
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`-> Server started on port ${port}`);
});
