import handler from '../../../lib/logger';
import { shippingRateModel } from "../../models/shippingRate";


export default function sumProductsCost(
    productList: shippingRateModel["rate"]["items"]): number {
        try {
            let price = [];
            for (let i = 0; i < productList.length; i++) {
                price.push(Math.round(productList[i].price * productList[i].quantity))
            }
        return price.reduce((prev, next) => prev + next);
        } catch (error: any) {
            throw handler.handlerError(2114, 'product cost calculator failed', 409)
        }
};