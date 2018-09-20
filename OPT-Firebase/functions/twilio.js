const twilio = require('twilio');
const twilioKeys = require('./private/twilioKey.json');

module.exports = new twilio.Twilio(twilioKeys.accountSid, twilioKeys.authToken);