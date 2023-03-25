
import { Request, Response } from "express";
import { createCarrierService } from "./service";

export default async function createCarrierServiceController(req: Request, res: Response ) {
    try {
        const storeInfo: { shop: string } = req.body;
        const response = await createCarrierService(storeInfo);
        res.status(200).json(response);
    } catch (exception: any) {
      res.status(exception.status).send(exception);
    }

}