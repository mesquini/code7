import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '@shared/swagger.json';

import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Debts Online' });
});

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc ,{
  explorer: true,
}));

routes.use('/sessions', sessionsRoutes);
// routes.use('/dividents', dividentsRoutes);

export default routes;
