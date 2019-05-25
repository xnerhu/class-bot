import { ISchema } from '../interfaces';
import { sendMessage } from '../api';
import Store from '../store';
import { modulesSchema } from './';

const sendCommandsBtn = {
  id: 'send-commands',
  title: 'Kliknij, aby wyświetlić listę dostępnych poleceń',
  onClick: (btn, threadID) => {
    modulesSchema(threadID).help.action(null, threadID);
  },
};

export default {
  pys: {
    description: 'Przedstawia bota.',
    action: async (args, threadID) => {
      const { COMMAND_PREFIX } = process.env;

      const body =
        'Jestem facebookowym botem, posiadającym wiele funkcji oraz szeroki asortyment memów.' +
        ' Jeśli chcesz użyć danego polecenia, wystarczy, że wyślesz zwykłą wiadomość zaczynającą' +
        ` się od "${COMMAND_PREFIX}nazwa_polecenia" z argumentami oddzielonymi spacją.` +
        `\n> Przykładowe użycie: ${COMMAND_PREFIX}bigemoji` +
        ' 🍟\nJeśli chcesz użyć zdania ze spacjami, wstaw je w cudzysłów.' +
        `\n> Przykład: ${COMMAND_PREFIX}say "Hello World!"` +
        ' \nListę wszystkich poleceń możesz wyświetlić, używając' +
        '\n> .help\nAutorem jest Mikołaj Palkiewicz. Kod źródłowy można znaleźć na serwisie GitHub.';
      await sendMessage(
        { body, url: 'https://github.com/xnerhu/class-bot' },
        threadID,
      );

      await Store.buttons.send(sendCommandsBtn, threadID);
    },
  },
} as ISchema;
