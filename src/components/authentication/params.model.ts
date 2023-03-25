
import Joi from 'joi';

/**
 * data model from validator middleware
 */

const authShopifyBody = Joi.object().keys({
    code: Joi.string().required(),
    hmac: Joi.string(),
    host: Joi.string(),
    shop: Joi.string().pattern(/[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com/).required(),
    state: Joi.string().pattern(/813bc519-0096-4fb6-9337-d7e75c52c6f7/).required(),
    timestamp: Joi.number(),
});


export default authShopifyBody;