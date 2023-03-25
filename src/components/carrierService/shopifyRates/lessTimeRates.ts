import { ratesModel, ratesShopifyModel } from "../../../common/models/shippingRate";
import handler from '../../../lib/logger';

export function getLessTimeRates(ratesStandar: ratesModel[], ratesCollection: ratesModel[]) {
    try {
        let lessShippingTimeStandar: ratesShopifyModel | {} = {};
        let lessShippingTimeCollection: ratesShopifyModel | {} = {};

        const shippingTimeStandarArray = ratesStandar[0] && ratesStandar.map((item) => item.shippingTime);
        const shippingTimeCollectionArray = ratesCollection[0] && ratesCollection.map((item) => item.shippingTime);
        const lessShippingStandarTimeRate = ratesStandar[0] && ratesStandar.filter((item) => item.shippingTime === Math.min(...shippingTimeStandarArray))[0];
        const lessShippingCollectionTimeRate = ratesCollection[0] && ratesCollection.filter((item) => item.shippingTime === Math.min(...shippingTimeCollectionArray))[0];

        if (lessShippingStandarTimeRate) {
            lessShippingTimeStandar = {
                service_name: "Envío Estándar (menor tiempo de entrega)",
                service_code: `(A2)${lessShippingStandarTimeRate.deliveryCompanyId}`,
                total_price: `${Math.round(lessShippingStandarTimeRate.shippingCost * 100)}`,
                description: `A través de mipaquete.com`,
                currency: 'COP',
                min_delivery_date: '',
                max_delivery_date: ''
            }
        }

        if(lessShippingCollectionTimeRate) {
            lessShippingTimeCollection = {
                service_name: "Envío Contraentrega (menor tiempo de entrega)",
                service_code: `(A2C)${lessShippingCollectionTimeRate.deliveryCompanyId}`,
                total_price: `${Math.round((lessShippingCollectionTimeRate.shippingCost + lessShippingCollectionTimeRate.collectionCommissionWithRate) * 100)}`,
                description: `A través de mipaquete.com`,
                currency: 'COP',
                min_delivery_date: '',
                max_delivery_date: ''
            }
        }


        return {standar: lessShippingTimeStandar, collection: lessShippingTimeCollection};

    } catch (error: any) {
        throw handler.handlerError(2105, 'getLessTimeRates failed', 409);
    }
}