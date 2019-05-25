import { IMessage } from '../interfaces';
import { modulesSchema } from '../modules';
import { parseRawText, describeMissingArgs } from '../utils';
import { sendTypingIndicator, sendMessage, sendImage } from '../api';

export const handleMessage = async (err: Error, message: IMessage) => {
  if (err) throw err;

  const { body, threadID } = message;

  if (body == null || threadID == null) return;
  const parsed = parseRawText(body);
  if (parsed == null) return;

  const { args, name } = parsed;
  const schema = modulesSchema(threadID);
  if (schema[name] == null) return;

  const end = sendTypingIndicator(message.threadID);

  if (!validateArgs(args, name, threadID)) {
    await sendMessage(
      { body: describeMissingArgs(schema[name].args, args.length) },
      threadID,
    );
  } else {
    try {
      if (schema[name].action != null) {
        await schema[name].action(args, threadID);
      } else if (schema[name].image != null) {
        await sendImage(schema[name].image, threadID);
      }
    } catch (err) {
      throw err;
    }
  }

  end();
};

export const validateArgs = (userArgs: string[], name: string, threadId: string) => {
  const { args } = modulesSchema(threadId)[name];
  return args == null || userArgs.length >= args.length;
};
