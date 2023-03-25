import { ratesModel, ratesShopifyModel } from "../../../common/models/shippingRate";
import handler from '../../../lib/logger';

export function getLowCostRates(ratesStandar: ratesModel[], ratesCollection: ratesModel[]) {
  try {

    let lowCostStandar: ratesShopifyModel | {} = {};
    let lowCostCollection: ratesShopifyModel | {} = {};

    const priceStandarArray = ratesStandar[0] && ratesStandar.map((item) => item.shippingCost);
    const priceCollectionArray = ratesCollection[0] && ratesCollection.map((item) => item.shippingCost + item.collectionCommissionWithRate);
    const lowCostRateStandart = ratesStandar[0] && ratesStandar.filter((item) => item.shippingCost === Math.min(...priceStandarArray))[0];
    const lowCostRateCollection = ratesCollection[0] && ratesCollection.filter((item) => (item.shippingCost + item.collectionCommissionWithRate) === Math.min(...priceCollectionArray))[0];

    if (priceStandarArray && lowCostRateStandart) {
      lowCostStandar = {
        service_name: "Envío Estándar (menor precio)",
        service_code: `(A3)${lowCostRateStandart.deliveryCompanyId}`,
        total_price: `${Math.round(lowCostRateStandart.shippingCost * 100)}`,
        description: `A través de mipaquete.com`,
        currency: 'COP',
        min_delivery_date: '',
        max_delivery_date: ''
      };
    }

    if (priceCollectionArray && lowCostRateCollection) {
      lowCostCollection = {
        service_name: "Envío Contraentrega (menor precio)",
        service_code: `(A3C)${lowCostRateCollection.deliveryCompanyId}`,
        total_price: `${Math.round((lowCostRateCollection.shippingCost + lowCostRateCollection.collectionCommissionWithRate) * 100)}`,
        description: `A través de mipaquete.com`,
        currency: 'COP',
        min_delivery_date: '',
        max_delivery_date: ''
      };
    }

    return { standar: lowCostStandar, collection: lowCostCollection }

  } catch (error: any) {
    throw handler.handlerError(2106, 'getLowCostRates failed', 409);
  }
}
