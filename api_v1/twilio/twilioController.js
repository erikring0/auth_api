const process = require('process');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function testMessage(req, res, next) {
  client.calls
    .create({
      twiml: '<Response><Say>Hello, I am an AI here to monitor you.</Say></Response>',
      to: '+14805699671',
      from: '',
    })
    .catch((err) => next(err));
}

module.exports = { testMessage };
