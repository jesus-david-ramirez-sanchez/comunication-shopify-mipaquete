import { Request, Response } from "express";
import { webhookSubscriptionService } from "./service";

export default async function webhookSubscriptionController(req: Request, res: Response ) {
    try {
        const storeInfo: { shop: string } = req.body;
        const response = await webhookSubscriptionService(storeInfo);
        res.status(200).json(response);
    } catch (exception: any) {
      res.status(exception.status).send(exception);
    }

}