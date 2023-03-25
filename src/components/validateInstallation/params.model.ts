
import Joi from 'joi';

/**
 * data model from validator middleware
 */

const validateInstallationBody = Joi.object().keys({
    shop: Joi.string().pattern(/[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com/).required(),
});


export default validateInstallationBody;