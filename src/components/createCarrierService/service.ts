import Shopify, { DataType } from '@shopify/shopify-api';
import getData from '../../common/db/getData';
import handler from '../../lib/logger';
const { carrierServiceUrl } = process.env;

export async function createCarrierService(storeInfo: {
    shop: string,
}) {

    try {
        const getAccessToken: { accessToken: string }[] = await getData('stores', [{ $match: { storeCode: storeInfo.shop } }]);

        const client = new Shopify.Clients.Rest(storeInfo.shop, getAccessToken[0].accessToken);

        const data = await client.post({
            path: 'carrier_services',
            data: {
                carrier_service: {
                    name: 'mipaquete.com',
                    callback_url: carrierServiceUrl,
                    service_discovery: true
                }
            },
            type: DataType.JSON,
        });

        return data;

    } catch (error) {
        throw handler.handlerError(2107, 'createCarrierService failed', 404);
    }
}