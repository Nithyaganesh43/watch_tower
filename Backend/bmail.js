require('dotenv').config();
console.log(process.env.BREVO_API_KEY);
const SibApiV3Sdk = require('@sendinblue/client');

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

async function sendEmail(to, subject, html) {
  try {
    const email = {
      to: [{ email: to }],
    sender: { name: 'Humalvo', email: 'nithyaganesh4343@gmail.com' },
      subject: subject,
      htmlContent: html,
    };
    const res = await client.sendTransacEmail(email);
    console.log('Email sent:', res);
  } catch (err) {
    console.error('Email failed:', err);
  }
}

sendEmail('nithyaganesh12345@gmail.com', 'Test', '<strong>Hello</strong>');
