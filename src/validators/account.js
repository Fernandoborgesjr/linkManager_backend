const Joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');


const accountSignUp = (req, res, next) => {
    const { email, password, password_confirmation } = req.body;
    console.log('### accountSignUp middleware', email, password);

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        password_confirmation: Joi.string().valid(Joi.ref('password')).required()
    });

    /* AbortEarly é para abortar a requisição caso o primeiro item não aprovado
    passar pelo schema. Por padrão esse option é true */
    const options = { abortEarly: false }

    const { error } = schema.validate({ email, password, password_confirmation }, options);

    if (error) {
        return res.jsonBadRequest(null, null, getValidatorError(error, 'account.signup') )
    }
    next();
};


module.exports = { accountSignUp };