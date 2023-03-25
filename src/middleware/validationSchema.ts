
const _ = require('lodash');
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import errors from './errors';


import createCarrierServiceBody from '../components/createCarrierService/params.model';
import webhookSubscriptionModel from '../components/orderWebhookSubscription/params.model';
import carrierServiceBody from '../components/carrierService/params.model';
import authShopifyBody from '../components/authentication/params.model';
import validateInstallationBody from '../components/validateInstallation/params.model';
 

const { customerKey } = process.env;

const Header = Joi.object().keys({
  'Session-Tracker': Joi.string().uuid().required(),
  'Customer-Key': Joi.string().uuid().required(),
});

function getErrorPath(error: { details: string }) {
  return _.find(error.details, (x: string) => x).path.toString();
}

const DEFAULT_CODES = {
  HEADERS: 'MP-Headers_Validation_Errors',
  BODY: 'MP-Body_Validation_Errors',
  PARAMS: 'MP-Params_Validation_Errors',
  QUERY: 'MP-Query_Validation_Errors',
  UNAUTHORIZED: 'MP-UNAUTHORIZED_Error',
};

export function validateHeaders(request: Request, res: Response, next: NextFunction) {
  const headerSessionTracker = request.headers['session-tracker'];
  const headerCustomerKey = request.headers['customer-key'];
  const { HEADERS } = DEFAULT_CODES;

  const Schema = {
    'Session-Tracker': headerSessionTracker,
    'Customer-Key': headerCustomerKey,

  };

  const { error } = Header.validate(Schema);

  if (error || headerCustomerKey !== customerKey) {
    handlerValidationError(request, HEADERS, error, res);
  } else {
    next();
  }
}

function handlerValidationError(req: Request, code: string, error: any, res: Response) {
  let requestFieldWithError = '';
  switch (code) {
    case DEFAULT_CODES.HEADERS:
      requestFieldWithError = 'headers';
      break;
    case DEFAULT_CODES.BODY:
      requestFieldWithError = 'body';
      break;
    case DEFAULT_CODES.UNAUTHORIZED:
      requestFieldWithError = 'UNAUTHORIZED';
      break;
    case DEFAULT_CODES.QUERY:
      requestFieldWithError = 'UNAUTHORIZED';
      break;
    default:
      requestFieldWithError = 'params';
  }
  const completeError = {
    timestamp: new Date(),
    status: 400,
    path: req.originalUrl,
    message: {
      code,
      title: `Bad Request: ${requestFieldWithError} with errors`,
      detail: `${getErrorPath(error)} is required or its format is not valid.`,
    }
  };
  return errors.errorMiddleware(completeError, req, res);
}



export function validateCarrierService(req: Request, res: Response, next: NextFunction){
  const { BODY } = DEFAULT_CODES;
  const { error } = carrierServiceBody.validate(req.body, { allowUnknown: true });
  if (error) {
    handlerValidationError(req, BODY, error, res);
  } else {
    next();
  } 
}

export function validateCreateCarrierService(req: Request, res: Response, next: NextFunction){
  const { BODY } = DEFAULT_CODES;
  const { error } = createCarrierServiceBody.validate(req.body);
  if (error) {
    handlerValidationError(req, BODY, error, res);
  } else {
    next();
  } 
}

export function validateWebhookSubscription(req: Request, res: Response, next: NextFunction){
  const { BODY } = DEFAULT_CODES;
  const { error } = webhookSubscriptionModel.validate(req.body);
  if (error) {
    handlerValidationError(req, BODY, error, res);
  } else {
    next();
  } 
}
export function validateAuthenticationService(req: Request, res: Response, next: NextFunction){
  const { BODY } = DEFAULT_CODES;
  const { error } = authShopifyBody.validate(req.body);
  if (error) {
    handlerValidationError(req, BODY, error, res);
  } else {
    next();
  } 
}

export function installationBodyValidator(req: Request, res: Response, next: NextFunction){
  const { BODY } = DEFAULT_CODES;
  const { error } = validateInstallationBody.validate(req.body);
  if (error) {
    handlerValidationError(req, BODY, error, res);
  } else {
    next();
  } 
}

