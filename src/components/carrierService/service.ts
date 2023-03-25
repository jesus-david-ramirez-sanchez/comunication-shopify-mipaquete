import { ratesModel, ratesShopifyModel, shippingRateModel } from "../../common/models/shippingRate";

import getData from "../../common/db/getData";
import locationFormat from '../../common/config/locationFormat';
import handler from '../../lib/logger';
import productFormat from "../../common/config/productFormat";

import { dataToShopify } from "./shopifyRates/shopifyFormat";
import { post } from '../../lib/request';
import { product } from "../../common/models/products";

const { uriMipaquete } = process.env;

export async function carrierServiceFunction(
  infoForRate: shippingRateModel,
  storeCode: string | string[] | undefined): Promise<{ rates: ratesShopifyModel | {}[] }> {
  try {
    let products: product = {
      price: 100,
      height: 10,
      length: 10,
      width: 10,
      weight: 1,
      quantity: 1,
    };
    const checkoutInfo = infoForRate.rate;

    const storeInfo = await getData('stores', [{ $match: { storeCode: storeCode } }]);


    if (checkoutInfo?.items[0].product_id) {
      products = await productFormat(checkoutInfo.items, storeCode);
    }


    const generalData = {
      originLocationCode: locationFormat(checkoutInfo.origin.province, checkoutInfo.origin.city),
      destinyLocationCode: checkoutInfo.destination.city === 'rate test' ? '11001000' : locationFormat(checkoutInfo.destination.province, checkoutInfo.destination.city),
      height: Math.ceil(products.height),
      width: Math.ceil(products.width),
      length: Math.ceil(products.length),
      weight: Math.ceil(products.weight) === 0 ? 1 : Math.ceil(products.weight),
      quantity: 1,
      declaredValue: Math.round(products.price / 100) < 10000 ? 10000 : Math.round(products.price / 100),
    };

    const header = {
      apikey: storeInfo[0].apiKey,
      'session-tracker': 'aa72d410-fd5c-479d-96bf-28ee6bb33a81'
    };

    const standarRateData = {
      ...generalData,
      saleValue: 0,
    };

    const collectionRateData = {
      ...generalData,
      saleValue: products.price < 10000 ? 10000 : Math.round(products.price / 100),
    };
    const mpRatesStandar: ratesModel[] = await post(uriMipaquete, 'quoteShipping', standarRateData, header);
    const mpRatesCollection: ratesModel[] = await post(uriMipaquete, 'quoteShipping', collectionRateData, header);


    const ratesToShopify: { rates: ratesShopifyModel | {}[] } = await dataToShopify(mpRatesStandar, mpRatesCollection);
    return ratesToShopify;


  } catch (error: any) {
    const code: number = error.message.code;
    const message: string = error.message.detail;
    const status: number = error.status;
    throw handler.handlerError(code || 2107, message || 'getShippingRates failed', status || 500);
  }

}
