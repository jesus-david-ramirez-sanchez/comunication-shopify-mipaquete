
import { Request, Response } from 'express';
import { authModel } from "../../common/models/auth";
import validateInstallationService from './service';

export default async function validateInstallationController(req: Request, res: Response){
    try {
        const shop : string  = req.body.shop;
        const response = await validateInstallationService(shop);
        res.status(200).json(response);
    } catch (exception: any) {
      res.status(exception.status).send(exception);
    }

}