import Joi from 'joi';

/**
 * data model from validator middleware
 */

const carrierServiceBody = Joi.object().keys({
    rate: {
        origin: {
            country: Joi.string(),
            postal_code: Joi.string().allow(null).allow(''),
            province: Joi.string().required(),
            city: Joi.string().required(),
        },
        destination: {
            country: Joi.string(),
            postal_code: Joi.string().allow(null).allow(''),
            province: Joi.string().required().allow(null),
            city: Joi.string().required(),
        },
        items: Joi.array().items({
            name: Joi.string().allow(''),
            quantity: Joi.number().required(),
            grams: Joi.number().required(),
            price: Joi.number().required(),
            product_id: Joi.number().allow(null).required(),
            variant_id: Joi.number().allow(null).required()
        }),
        currency: Joi.string(),
        locale: Joi.string()
    }
});


export default carrierServiceBody;