import { Request, Response } from "express";

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error: any, req: Request, res: Response) {
  const status: number = error.status;
  res.status(status || 500)
    .json(error);
}

/**
 * controlador de entrada de datos
 * @param {string} req nombre
 * @param {number} res
 */

function notFoundMiddleware(req: any, res: any) {
  res.status(404)
    .json({
      timestamp: new Date(),
      status: 404,
      message: {
        code: 'MP-Service_Not_Found',
        title: 'Service Not Found',
        detail: 'The service is not valid in Oauth mipaquete.com',
      },
    });
}

export default {
  notFoundMiddleware,
  errorMiddleware,
};
