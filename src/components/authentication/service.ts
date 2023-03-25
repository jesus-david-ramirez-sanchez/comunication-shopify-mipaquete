import createData from '../../common/db/createData';
import updateData from '../../common/db/updateData';
import { authModel } from '../../common/models/auth';
import getData from '../../common/db/getData';
import handler from '../../lib/logger';


import { post } from '../../lib/request';

const { clientId, clientSecret } = process.env;

export default async function authenticationService(authInfo: authModel) {
    try {

        const dataAuth = {
            code: authInfo.code,
            client_id: clientId,
            client_secret: clientSecret,
        };

        const getAccesToken: {
            access_token: string,
            associated_user: {
                email: string
            }
        } = await post(`https://${authInfo.shop}/admin`, 'oauth/access_token', dataAuth, {});

        const dataCreated: {
            accessToken: string,
            storeCode: string,
            channel: 'SHOPIFY',
        } = {
            accessToken: getAccesToken.access_token,
            storeCode: authInfo.shop,
            channel: 'SHOPIFY',
        };

        const storeExistence = await getData('stores', [{ $match: { storeCode: authInfo.shop } }]);

        if (storeExistence.length > 0) {
            await updateData(
                'stores',
                { storeCode: authInfo.shop },
                { ...dataCreated },
                {});
            return {
                storeExistence: true,
                insertedStore: { storeCode: authInfo.shop },
                userExistence: storeExistence[0]?.user ? true : false,
            }

        };

        await createData('stores', dataCreated);
        return {
            storeExistence: false,
            insertedStore: { storeCode: authInfo.shop },
            userExistence: storeExistence[0]?.user ? true : false,
        };
    } catch (error: any) {
        const code: number = error.message.code;
        const message: string = error.message.detail;
        const status: number = error.status;
        throw handler.handlerError(code || 2103, message, 404)
    }
}