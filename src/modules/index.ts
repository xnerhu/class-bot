import { ISchema } from '../interfaces';
import { getCommandDescription, randomNumber } from '../utils';
import { sendMessage, getThreadInfo } from '../api';
import Store from '../store';

import emoji from './emoji';
import infa from './infa';
import memes from './memes';
import thinking from './thinking';
import wrr from './wrr';
import kitek from './kitek';
import pys from './pys';

export const modulesSchema = (threadId: string) => ({
  ...memes,
  ...thinking,
  ...wrr,
  ...kitek,
  ...pys,
  lenny: {
    description: 'Wysyła lenny face ( ͡° ͜ʖ ͡°)',
    action: async (args, threadID) => {
      await sendMessage({ body: '( ͡° ͜ʖ ͡°)' }, threadID);
    },
  },
  idk: {
    description: 'Wysyła shrugging face ¯\\_(ツ)_/¯',
    action: async (args, threadID) => {
      await sendMessage({ body: '¯\\_(ツ)_/¯' }, threadID);
    },
  },
  say: {
    description: 'Wysyła daną wiadomość.',
    args: ['Tekst'],
    action: async (args, threadID) => {
      await sendMessage({ body: args[0] }, threadID);
    },
  },
  help: {
    description: 'Wyświetla listę komend.',
    action: async (args, threadID) => {
      const schema = modulesSchema(threadID);
      let str = '';
      for (const key in schema) {
        if (schema[key].hidden) continue;
        str += getCommandDescription(key, schema[key]);
      }
      await sendMessage({ body: str }, threadID);
    },
  },
  rand: {
    description: '🎲 Wysyła losową liczbę w danym zakresie.',
    args: ['Min', 'Max'],
    action: async (args, threadID) => {
      await sendMessage(
        { body: randomNumber(parseInt(args[0]), parseInt(args[1])).toString() },
        threadID,
      );
    },
  },
  ...emoji,
  ...infa(threadId),
  wolfram: {
    description:
      'Wysyła odpowiedź na zadane pytanie (po angielsku), wykonuje obliczenia, rozwiązuje równania itp.',
    args: ['Równanie, Pytanie'],
    action: async (args, threadID) => {
      const res = await Store.wolfram.query(args[0], { podindex: 2 });
      const { error, pods } = res.data.queryresult;
      if (error) throw error;

      if (pods != null) {
        const answer = pods[0].subpods[0].plaintext;
        await sendMessage({ body: answer }, threadID);
      }
    },
  },
  eo: {
    description: 'Oznacza wszystkich.',
    action: async (args, threadID) => {
      const info = await getThreadInfo(threadID);
      const ids = info.participantIDs;

      let body = '';
      let mentions = [];

      for (const id of ids) {
        body += `@${id} `;
        mentions.push({
          tag: `@${id}`,
          id: id,
        });
      }

      await sendMessage({ body, mentions }, threadID);
    },
  },
}) as ISchema;
