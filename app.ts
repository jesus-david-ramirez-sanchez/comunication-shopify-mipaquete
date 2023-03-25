require('dotenv').config();

import dbService from './src/common/db/connection';
import logger from './src/startup/logging';

import express from 'express';
const app = express();
const { NODE_ENV, PORT } = process.env;

// Route settings
require('./src/startup/routes')(app);

dbService.connect((err: any) => {
  if (err) { process.exit(); }
  app.listen(PORT, () => {
    logger.info(`Server running at port ${PORT} and environment ${NODE_ENV}`);
  });
});
