import Shopify, { DataType } from '@shopify/shopify-api';
import getData from '../../common/db/getData';
import handler from '../../lib/logger';
const { eventARN } = process.env;

export async function webhookSubscriptionService(storeInfo: {
    shop: string,
}) {

    try {
        const getAccessToken: { accessToken: string }[] = await getData('stores', [{ $match: { storeCode: storeInfo.shop } }]);

        const client = new Shopify.Clients.Rest(storeInfo.shop, getAccessToken[0].accessToken);

        const data = await client.post({
            path: 'webhooks',
            data: {
                webhook: {
                  topic: 'orders/create',
                  address: eventARN,
                  format: 'json'
                }
              },
            type: DataType.JSON,
        });

        return data;

    } catch (error: any) {
        const code: number = error.message.code;
        const message: string = error.message;
        const status: number = error.status;
        throw handler.handlerError(code || 2108, message || 'webhookSubscriptionService failed', status || 404);
    }
}
