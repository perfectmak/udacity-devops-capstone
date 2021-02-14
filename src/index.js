import { buildServer } from './server';
import { logger } from './utils/logger';
import { buildModels } from './models';
import { buildServices } from './services';
import { buildLoaders } from './loaders';

const config = require('config');

const models = buildModels();
const loaders = buildLoaders({ models });
const services = buildServices({ models, loaders });
const server = buildServer({
  config,
  services,
});

const port = config.get('port');

server.listen({ port }).then(({ url }) => {
  logger.info(`App is running at ${url}`);
});
