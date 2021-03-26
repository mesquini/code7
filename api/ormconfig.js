const environment = process.env.ENVIRONMENT;

var entitiesMONGO = './dist/modules/**/infra/typeorm/schema';
var ext = '/*.js';

if (environment === 'dev') {
  entitiesMONGO = './src/modules/**/infra/typeorm/schema';
  ext = '/*.ts';
}

module.exports = [
  {
    name: 'default',
    type: 'mongodb',
    url: process.env.MONGODB_URL || 'mongodb://localhost/debts?retryWrites=true&w=majority',
    entities: [`${entitiesMONGO}${ext}`],
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
  },
];
