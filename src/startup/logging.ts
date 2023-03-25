require('express-async-errors');
const winston = require('winston');

const formatLogger = winston.format.combine(
  winston.format.timestamp(),
  winston.format.prettyPrint(),
  winston.format.label(),
);

const logger = winston.createLogger({
  format: formatLogger,
  transports: [
    new winston.transports.Console(),
  ],
});

process
  .on('unhandledRejection', (reason: object) => {
    logger.error(reason, { type: 'unhandledRejection', name: 'Unhandled Rejection at Promise' });
  })
  .on('uncaughtException', (err: object) => {
    logger.error(err, { type: 'uncaughtException', name: 'Uncaught Exception thrown' });
    process.exit(1);
  });
export default logger;
