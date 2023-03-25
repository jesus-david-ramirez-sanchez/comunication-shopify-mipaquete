import { metafieldModel } from "../common/models/metafield";
import { dimensionsModel } from "../common/models/products";


export function arrayMetafieldToDimensions(array: { metafields: metafieldModel[] }[]) {
    let data: dimensionsModel[] = [];
    for (let i = 0; i < array.length; i++) {
        let dimensions: dimensionsModel = {
            product_id: 0,
            height: 0,
            width: 0,
            length: 0,
        };
        array[i].metafields.map(({ key, value, owner_id }) => {
            dimensions.product_id = owner_id;
            switch (key) {
                case 'alto':
                    dimensions.height = value;
                    break;
                case 'ancho':
                    dimensions.width = value;
                    break;
                case 'largo':
                    dimensions.length = value;
                    break;
                default: 
                    dimensions;
                    break;
            }
        });
        data.push(dimensions);
    }
    return data;
}