import { ISchema } from '../interfaces';
import { sendImage, sendBigEmoji } from '../api';

export default {
  wrr: {
    description: 'Wielkie 😡',
    action: async (args, threadID) => {
      await sendBigEmoji('😡', threadID);
    },
  },
  wrr2: {
    description: '😡 Thanos',
    image: 'https://i.imgur.com/DAtyzN5.jpg',
  },
  wrr3: {
    description: '😡 Dr. Strange',
    image: 'https://i.imgur.com/Uvza1VO.jpg',
  },
  wrr4: {
    description: '😡 Asteroida',
    image: 'https://i.imgur.com/GelQqVB.jpg',
  },
  wrr5: {
    description: '😡 Strzelba',
    image: 'https://i.imgur.com/Gm7W13N.jpg',
  },
  wrr6: {
    description: '😡 Tom',
    image: 'https://i.imgur.com/9D2U0Up.jpg',
  },
  wrr7: {
    description: '😡 Pikachu',
    image: 'https://i.imgur.com/Bc2vEzj.jpg',
  },
  wrr8: {
    description: '😡 Sponge Bob',
    image: 'https://i.imgur.com/BBxbHCJ.jpg',
  },
  wrha: {
    description: '😡 i 😄',
    image: 'https://i.imgur.com/LFtej61.jpg',
  },
} as ISchema;
