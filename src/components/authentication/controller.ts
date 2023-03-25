
import { Request, Response } from 'express';
import { authModel } from "../../common/models/auth";
import authenticationService from './service';

export default async function authenticationController(req: Request, res: Response){
    try {
        const authInfo : authModel  = req.body;
        const response = await authenticationService(authInfo);
        res.status(200).json(response);
    } catch (exception: any) {
      res.status(exception.status).send(exception);
    }

}