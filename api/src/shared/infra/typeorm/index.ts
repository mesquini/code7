import { createConnection } from 'typeorm';
import path from 'path'

const environment = process.env.ENVIRONMENT;

var entitiesMONGO = path.resolve(__dirname, '..', '..', '..', 'modules', '**', 'infra', 'typeorm', 'schema', '*.ts');


if (environment !== 'dev')
  path.resolve(__dirname, '..', '..', '..', 'modules', '**', 'infra', 'typeorm', 'schema', '*.js');

createConnection(
  {
    name: 'default',
    type: 'mongodb',
    url: process.env.MONGO_URL || 'mongodb://localhost/debts?retryWrites=true&w=majority',
    entities: [entitiesMONGO],
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
    logging: true
  },
);


