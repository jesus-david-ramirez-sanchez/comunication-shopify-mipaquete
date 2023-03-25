import { Request, Response } from 'express';
import { shippingRateModel } from "../../common/models/shippingRate";
import { carrierServiceFunction } from "./service";


export async function carrierServiceController (req: Request, res: Response){
    try {
        const infoForRate: shippingRateModel = req.body;
        const shop: string | string[] | undefined = req.headers['x-shopify-shop-domain'];
        const response = await carrierServiceFunction(infoForRate, shop);
        res.status(200).json(response);
    } catch (exception: any) {
      res.status(exception.status).send(exception);
    }
}