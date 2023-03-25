import { ratesModel, ratesShopifyModel } from "../../../common/models/shippingRate";
import handler from '../../../lib/logger';


export function getBestServiceRates(ratesStandar: ratesModel[], ratesCollection: ratesModel[]) {
    try {
        let bestServiceStandar: ratesShopifyModel | {} = {};
        let bestServiceCollection: ratesShopifyModel | {} = {};
        let completeResponse = {};

        const scoreStandarArray = ratesStandar[0] && ratesStandar.map((item) => item.score);
        const bestStandarServiceRate = ratesStandar[0] && ratesStandar.filter((item) => item.score === Math.max(...scoreStandarArray))[0];
        const scoreCollectionArray = ratesCollection[0] && ratesCollection.map((item) => item.score);
        const bestCollectionServiceRate = ratesCollection[0] && ratesCollection.filter((item) => item.score === Math.max(...scoreCollectionArray))[0];

        if (scoreStandarArray && bestStandarServiceRate) {
            bestServiceStandar = {
                service_name: "Envío Estándar (mejor servicio)",
                service_code: `(A1)${bestStandarServiceRate.deliveryCompanyId}`,
                total_price: `${Math.round(bestStandarServiceRate.shippingCost * 100)}`,
                description: `A través de mipaquete.com`,
                currency: 'COP',
                min_delivery_date: '',
                max_delivery_date: ''
            }
        }

        if(scoreCollectionArray && bestCollectionServiceRate) {
            bestServiceCollection = {
                service_name: "Envío Contraentrega (mejor servicio)",
                service_code: `(A1C)${bestCollectionServiceRate.deliveryCompanyId}`,
                total_price: `${Math.round((bestCollectionServiceRate.shippingCost + bestCollectionServiceRate.collectionCommissionWithRate) * 100)}`,
                description: ` A través de mipaquete.com`,
                currency: 'COP',
                min_delivery_date: '',
                max_delivery_date: ''
            }
        }
        return {standar: bestServiceStandar, collection: bestServiceCollection}
    } catch (error: any) {
        throw handler.handlerError(2104, 'getBestServiceRates failed', 409);
    }
}