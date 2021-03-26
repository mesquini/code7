import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import message from '@shared/utils/typeMessage';
import DividendsController from '../controllers/DividendsController';
import auth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const dividentsRoutes = Router();
const dividendsController = new DividendsController();

dividentsRoutes.use(auth);

dividentsRoutes.get(
  '/',
  dividendsController.show,
);

dividentsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string()
        .required()
        .error(err => message(err, 'ID do dividendo')),
    },
  }),
  dividendsController.delete,
);

dividentsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.number()
        .required()
        .error(err => message(err, 'ID do usuario')),
      name: Joi.string()
        .required()
        .error(err => message(err, 'Nome')),
      reason: Joi.string()
        .required()
        .error(err => message(err, 'Razão')),
      price: Joi.string()
        .required()
        .error(err => message(err, 'Preço')),
      date: Joi.string()
        .required()
        .error(err => message(err, 'Data')),
    },
  }),
  dividendsController.create,
);

dividentsRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string()
        .required()
        .error(err => message(err, 'ID')),
      user_id: Joi.string()
        .required()
        .error(err => message(err, 'ID do usuario')),
      name: Joi.string()
        .required()
        .error(err => message(err, 'Nome')),
      reason: Joi.string()
        .required()
        .error(err => message(err, 'Razão')),
      price: Joi.string()
        .required()
        .error(err => message(err, 'Preço')),
      date: Joi.string()
        .required()
        .error(err => message(err, 'Data')),
    },
  }),
  dividendsController.update
);

export default dividentsRoutes;
