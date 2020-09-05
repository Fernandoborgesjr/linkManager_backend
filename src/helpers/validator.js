'use-strict';

const { getMessages } = require('./messages');

const getValidatorError = (error, messagePath) => {
  if (!error) return null;
  const errorMessages = {};

  error.details.map((detail) => {
    const { message, type } = detail;
    const { key } = detail.context;

    const path = `${messagePath}.${key}.${type}`;

    const customMessage = getMessages(path);
    if (!customMessage) {
      console.log('CustomMessage not found for path: ', path);
    }

    errorMessages[key] = getMessages(path) || message;
  });
  return errorMessages;
};

module.exports = { getValidatorError };
