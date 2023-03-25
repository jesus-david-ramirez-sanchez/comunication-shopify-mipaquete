import { shippingRateModel } from "../models/shippingRate";
import { metafieldModel } from "../models/metafield";
import { product } from "../models/products";
import { get } from '../../lib/request';

import handler from '../../lib/logger';
import getData from '../db/getData';
import completeVolume from "./package.config/volumeCalculator";
import totalWeight from "./package.config/weightCalculator";
import sumProductsCost from "./package.config/priceCalculator";
import { arrayMetafieldToDimensions } from "../../lib/arrayFunctions";

export async function getProductMetafields(
    productId: number,
    variantId: number,
    storeCode: string | string[] | undefined,
    headers : { 'X-Shopify-Access-Token': string }
    ) {

    let productMetafields: { metafields: metafieldModel[] };

    const productVariantMetafield: { metafields: metafieldModel[] } = await get(`https://${storeCode}`, 'admin/api/2022-07/products', `${productId}/variants/${variantId}/metafields.json`, headers);
    const productVariantMetafieldLength = productVariantMetafield.metafields.length;
    if (productVariantMetafieldLength > 1) {
        productMetafields = productVariantMetafield;
    } else {
        const metafieldsByProduct: { metafields: metafieldModel[] } = await get(`https://${storeCode}`, 'admin/api/2022-07/products', `${productId}/metafields.json`, headers);
        productMetafields = metafieldsByProduct;
    }

    return productMetafields;
}

export async function getTotalProductsInformation(
    productList: shippingRateModel["rate"]["items"],
    storeCode: string | string[] | undefined,
    headers: { 'X-Shopify-Access-Token': string }
) {
    let getDimensions = [];
    for (let i = 0; i < productList.length; i++) {
        getDimensions.push(getProductMetafields(productList[i].product_id, productList[i].variant_id, storeCode, headers));
    };

    const productMetafields: { metafields: metafieldModel[] }[] = await Promise.all(getDimensions);


    const cubeSide: number = Math.round(Math.cbrt(completeVolume(productMetafields, productList)));

    return {
        price: Math.round(sumProductsCost(productList)),
        height: cubeSide,
        length: cubeSide,
        width: cubeSide,
        weight: Math.round(totalWeight(productList)),
        quantity: 1,
    }
}

export default async function productFormat(
    productList: shippingRateModel["rate"]["items"],
    storeCode: string | string[] | undefined): Promise<product> {
    try {
        const getStoreInfo: { accessToken: string, storeCode: string }[] = await getData('stores', [{ $match: { storeCode } }]);

        const headers = {
            'X-Shopify-Access-Token': getStoreInfo[0].accessToken,
        };

        if(productList.length > 1){
            const totalInfoProducts = await getTotalProductsInformation(productList, storeCode, headers);
            return totalInfoProducts;
        }

        const productMetafields = await getProductMetafields(
            productList[0].product_id,
            productList[0].variant_id,
            storeCode,
            headers );

        const productDimensions = arrayMetafieldToDimensions([productMetafields]);

        return {
            price: Math.ceil(sumProductsCost(productList)),
            height: productDimensions[0].height,
            length: productDimensions[0].length,
            width: productDimensions[0].width,
            weight: Math.ceil(totalWeight(productList)),
            quantity: 1,
        }

    } catch (error: any) {
        throw handler.handlerError(2118, 'productFormat failed', 409);
    }
};


