import handler from '../../../lib/logger';
import { shippingRateModel } from "../../models/shippingRate";


export default function totalWeight(
    productList: shippingRateModel["rate"]["items"]
): number {
    try {
        let weight = [];
    
        for (let i = 0; i < productList.length; i++) {

            weight.push(Math.round(productList[i].grams * productList[i].quantity));
        }
        return Math.round(weight.reduce((prev, next) => prev + next)/1000);  
    } catch (error: any) {
        throw handler.handlerError(2116, 'volume calculator failed', 409);
    }
    
}