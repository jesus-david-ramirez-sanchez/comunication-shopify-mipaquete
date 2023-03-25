import locationShopify from './locationsInShopify';
import handler from '../../lib/logger';

export default function locationFormat(regionCode: string, city: string) : string {
    try {

        city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase();
        const cityRegex = new RegExp(`${city}`, 'g' );
        const danecode = locationShopify.filter(({ cityName, departmentCode }) =>
            cityName.match(cityRegex) && departmentCode === regionCode)[0];
        return danecode?.daneCode || '0000000';
    } catch (error: any) {
        throw handler.handlerError(2117, 'location format failed', 409);
    }
};
