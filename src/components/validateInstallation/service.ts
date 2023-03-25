import findOne from "../../common/db/findOne";
import handler from '../../lib/logger';
import Shopify, { RequestReturn } from '@shopify/shopify-api';



export default async function validateInstallationService(shop: string) {
    try {

        const getStore = await findOne('stores', { storeCode: shop }, {
            storeCode: 1, accessToken: 1
        }, {});

        if (!getStore) {
            return {
                storeExistence: false,
            }
        }

        const client = new Shopify.Clients.Rest(shop, getStore.accessToken);
        const data: RequestReturn | { body: boolean, storeExistence: boolean; message: string; } | undefined = await client.get({
            path: 'shop',
        }).catch(err => {
            if (err.code === 401) {
                return {
                    body: false,
                    storeExistence: false,
                    message: 'the app is not installed'
                }

            }
        });

        if (data?.body) {
            return {
                storeExistence: true,
                ...data
            };
        }
         return data;

    } catch (error: any) {
        const code: number = error.message.code;
        const message: string = error.message.detail;
        const status: number = error.status;
        throw handler.handlerError(code || 2103, message, 404)
    }
}