import { ratesModel, ratesShopifyModel } from "../../../common/models/shippingRate";
import { getBestServiceRates } from "./bestServiceRates";
import { getLessTimeRates } from "./lessTimeRates";
import { getLowCostRates } from "./lowCostRates";


export function dataToShopify(mpRatesStandar: ratesModel[], mpRatesCollection: ratesModel[]) {
    let rateToShopify: ratesShopifyModel | {}[] = [];

    const lowCostRates = getLowCostRates(mpRatesStandar, mpRatesCollection);

    const bestServiceRates = getBestServiceRates(mpRatesStandar, mpRatesCollection);

    const lessTimeRates = getLessTimeRates(mpRatesStandar, mpRatesCollection);



    if (mpRatesStandar.length > 0) {

        rateToShopify.push(
            lowCostRates.standar,
            bestServiceRates.standar,
            lessTimeRates.standar);

        for (let i = 0; i < mpRatesStandar.length; i++) {
            const rate: ratesModel = mpRatesStandar[i];
            const standarRate = {
                service_name: rate.deliveryCompanyName.toUpperCase(),
                service_code: rate.deliveryCompanyId,
                total_price: `${Math.round(rate.shippingCost * 100)}`,
                description: `A través de mipaquete.com`,
                currency: 'COP',
                min_delivery_date: '',
                max_delivery_date: ''

            };
            rateToShopify.push(standarRate);
        };
    };


    if (mpRatesCollection.length > 0) {
        
        rateToShopify.push(
            lowCostRates.collection,
            bestServiceRates.collection,
            lessTimeRates.collection);

        for (let i = 0; i < mpRatesCollection.length; i++) {
            const rate: ratesModel = mpRatesCollection[i];
            const collectionRate = {
                service_name: `${rate.deliveryCompanyName.toUpperCase()} (Contraentrega)`,
                service_code: `${rate.deliveryCompanyId}`,
                total_price: `${Math.round((rate.shippingCost + rate.collectionCommissionWithRate) * 100)}`,
                description: `A través de mipaquete.com`,
                currency: 'COP',
                min_delivery_date: '',
                max_delivery_date: ''
            }
            rateToShopify.push(collectionRate);
        }
    };
    return { rates: rateToShopify };
}