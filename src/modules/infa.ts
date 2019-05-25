import { ISchema } from '../interfaces';
import { sendMessage } from '../api';

export default (threadId: string) => {
  const { ITCLASS_CREDENTIALS } = process.env;
  const credentials = JSON.parse(ITCLASS_CREDENTIALS)[threadId];
  const schema: ISchema = {};

  if (credentials != null) {
    for (let i = 0; i < credentials.length; i++) {
      const item = credentials[i];

      schema[`infa${i + 1}`] = {
        description: `🔑 Wysyła login i hasło do sali informatycznej dla grupy ${item.label}.`,
        action: async (args, threadID) => {
          await sendMessage({ body: `👤 ${item.login} \n🔑 ${item.password}`, }, threadID );
        },
      }
    }
  }

  return schema;
}