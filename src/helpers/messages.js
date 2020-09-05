'use-strict';

const messages = require('../config/messages.json');

const getMessages = (path) => messages[path] || null;

module.exports = { getMessages };
