import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import message from '@shared/utils/typeMessage';
import SessionController from '../controllers/SessionController';

const sessionsRoutes = Router();
const sessionController = new SessionController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
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

export default sessionsRoutes;
