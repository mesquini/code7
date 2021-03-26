import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '@shared/swagger.json';

import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import dividentsRoutes from '@modules/dividends/infra/http/routers/dividends.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Debts Online' });
});

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc ,{
  explorer: true,
}));

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/dividends', dividentsRoutes);

export default routes;
