import express from 'express';
import { mapOrder } from '~/utils/sorts.js';
import 'dotenv/config';

const { IncomingWebhook } = require('@slack/webhook');

// Read a url from the environment variables
const url = process.env.SLACK_WEBHOOK_URL;

// Initialize
const webhook = new IncomingWebhook(url);

const app = express();

const hostname = 'localhost';
const port = 8000;

async function sendSlackNotification(message) {
  try {
    await webhook.send({
      text: message,
      attachments: [
        {
          fallback: 'Error Notification',
          color: 'danger',
          title: 'Node.js Application Error',
          text: message,
          footer: 'Node.js API',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification to Slack:', error);
  }
}

app.get('/', async (req, res) => {
  // Test Absolute import mapOrder
  console.log(
    mapOrder(
      [
        { id: 'id-1', name: 'One' },
        { id: 'id-2', name: 'Two' },
        { id: 'id-3', name: 'Three' },
        { id: 'id-4', name: 'Four' },
        { id: 'id-5', name: 'Five' },
      ],
      ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
      'id'
    )
  );
  await sendSlackNotification('This is a test notification from Node.js!');
  res.end('<h1>Hello World!</h1><hr>');
});

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${hostname}:${port}/`);
});
