const pino = require('pino');

const loggerOptions = {
  name: process.env.APP_NAME || 'transaction-mgmt-service',
};

switch (process.env.NODE_ENV) {
  case 'production':
    loggerOptions.level = 'info';
    break;
  case 'test':
    loggerOptions.level = 'error';
    break;
  case 'development':
  default:
    loggerOptions.level = 'trace';
}

if (process.env.TRACE === 'true') {
  loggerOptions.level = 'trace';
}


export const logger = pino(loggerOptions);

export default logger;
