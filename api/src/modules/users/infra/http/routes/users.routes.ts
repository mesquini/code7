import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import message from '@shared/utils/typeMessage';
import SessionController from '../controllers/SessionController';

const usersRoutes = Router();
const sessionController = new SessionController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string()
        .required()
        .error(err => message(err, 'Nome')),
      email: Joi.string()
        .email()
        .required()
        .error(err => message(err, 'Email')),
      password: Joi.string()
        .required()
        .error(err => message(err, 'Password')),
    },
  }),
  sessionController.create,
);

export default usersRoutes;
