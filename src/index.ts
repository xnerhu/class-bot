import { config } from 'dotenv';
import * as express from 'express';
import { WolframClient } from 'node-wolfram-alpha';
import { ChatButtons } from 'fb-chat-api-buttons';

config();

import { init as initApi, listen, setOptions } from './api';
import { handleMessage } from './handler';
import Store from './store';

const init = async () => {
  const { CALLBACK_ENDPOINT, WOLFRAM_ALPHA_APP_ID, EXPRESS_PORT } = process.env;
  const app = express();
  const originalApi = await initApi();

  app.listen(EXPRESS_PORT, () => {
    console.log(`Listening on ${EXPRESS_PORT}!`);
  });
  
  setOptions({ listenEvents: true, selfListen: true });
  listen(handleMessage);

  Store.buttons = new ChatButtons({
    app,
    api: originalApi,
    endpoint: CALLBACK_ENDPOINT,
  });

  Store.wolfram = new WolframClient(WOLFRAM_ALPHA_APP_ID);
};

init();