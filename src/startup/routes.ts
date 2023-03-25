import helmet from 'helmet';
import noCache from'nocache';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

// CORS configuration
import corsOptions from './config/corsOptions';

// proprietary middlewares

import requestLog from '../lib/logger';
import  logger  from './logging';
import  { validateHeaders } from '../middleware/validationSchema';
import errorManage from '../middleware/errors'

// routes

import healthcheckRouter from '../components/healthcheck';
import authenticationRouter from '../components/authentication';
import carrierServiceRouter from '../components/carrierService';
import createCarrierServiceRouter from '../components/createCarrierService';
import orderWebhookSubscriptionRouter from '../components/orderWebhookSubscription';
import validateInstallationRouter from '../components/validateInstallation';

module.exports = (app: any) => {
  const logFormat = 'string';
  const logEnable = true;
  const logHiddenFields = {
    doc: 'Fields that must be hidden in logs',
    format: Array,
    default: ['productId', 'productDesc', 'authorization', 'example'],
  };

  const apiPath = '/shopify';

  // middlewares
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  }));
  app.use(noCache());
  app.use(helmet.referrerPolicy());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  app.use(requestLog.requestLogMiddleware(logger, logFormat, logEnable, logHiddenFields));

  // health route definition
  app.use(healthcheckRouter);

  app.use(apiPath, carrierServiceRouter);
  
  // middleware Headers Validator
  app.use(validateHeaders);
  
  app.use(apiPath, authenticationRouter);
  app.use(apiPath, createCarrierServiceRouter);
  app.use(apiPath, orderWebhookSubscriptionRouter);
  app.use(apiPath, validateInstallationRouter);
  
  // return route definition


  // transaction route definition
  

  // proprietary errors
  app.use(errorManage.errorMiddleware);
  app.use(errorManage.notFoundMiddleware);
};
