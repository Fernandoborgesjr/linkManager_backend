
const {getMessages} = require('./messages')


const getValidatorError = (error, messagePath) => {
    if (!error) return null;
    const errorMessages = {};

    error.details.map((detail) => {
        const message = detail.message;
        const key = detail.context.key;
        const type = detail.type;

        const path = `${messagePath}.${key}.${type}`

        const customMessage = getMessages(path);
        if (!customMessage) {
            console.log('CustomMessage not found for path: ', path)
        }

        errorMessages[key] = getMessages(path) || message;
    })
    return errorMessages;
};

module.exports = { getValidatorError };


