import handler from '../../../lib/logger';
import { metafieldModel } from "../../models/metafield";
import { arrayMetafieldToDimensions } from "../../../lib/arrayFunctions";
import { shippingRateModel } from "../../models/shippingRate";
import { RequestReturn } from '@shopify/shopify-api';

export default function completeVolume(
    metafieldInfoList: { metafields: metafieldModel[] }[],
    productList: shippingRateModel["rate"]["items"])
    : number {
    try {
        let volumelist = [];
        const productDimensionList = arrayMetafieldToDimensions(metafieldInfoList);
        for (let i = 0; i < productDimensionList.length; i++) {

            const quantity: number = productList
                .filter(({ product_id, variant_id }) => product_id === productDimensionList[i].product_id || variant_id === productDimensionList[i].product_id)[0]?.quantity;

            volumelist.push(Math.round(productDimensionList[i].height * productDimensionList[i].length * productDimensionList[i].width * quantity));
        }
        return volumelist.reduce((prev, next) => prev + next);
    } catch (error: any) {
        throw handler.handlerError(2115, 'volume calculator failed', 409)
    }
};
