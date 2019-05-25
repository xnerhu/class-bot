import { ISchema } from '../interfaces';
import { changeThreadEmoji, sendBigEmoji } from '../api';

export default {
  bigemoji: {
    description: 'Wysyła duże emoji.',
    args: ['Emoji'],
    action: async (args, threadID) => {
      await sendBigEmoji(args[0], threadID);
    },
  },
  emoji: {
    description: 'Zmienia emoji.',
    args: ['Emoji'],
    action: async (args, threadID) => {
      await changeThreadEmoji(args[0], threadID);
    },
  },
} as ISchema;
