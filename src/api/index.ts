import * as login from 'facebook-chat-api';
import axios from 'axios';

import { IMessage, IThreadInfo } from '../interfaces';
import { getCredentials, saveAppState } from '../utils';

export let originalApi: any;

/**
 * Wrapper for facebook-chat-api (https://github.com/Schmavery/facebook-chat-api)
 */

export const init = (): Promise<any> => {
  return new Promise(resolve => {
    const credentials = getCredentials();
    login(credentials, (err, api) => {
      saveAppState(api.getAppState());
      originalApi = api;
      resolve(api);
    });
  });
};

export const changeThreadEmoji = (emoji: string, threadID: string) => {
  return new Promise((resolve, reject) => {
    originalApi.changeThreadEmoji(emoji, threadID, err => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const getEmojiUrl = (
  c: string,
  size: number,
  pixelRatio?: number,
): string => {
  return originalApi.getEmojiUrl(c, size, pixelRatio);
};

export const getThreadInfo = (threadID: string): Promise<IThreadInfo> => {
  return new Promise((resolve, reject) => {
    originalApi.getThreadInfo(threadID, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

export const sendMessage = (
  message: IMessage,
  threadID: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    originalApi.sendMessage(message, threadID, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

export const sendImage = async (url: string, threadID: string) => {
  const res = await axios(url, {
    responseType: 'stream',
  });
  await sendMessage({ attachment: res.data }, threadID);
};

export const sendBigEmoji = async (emoji: string, threadID: string) => {
  const url = await getEmojiUrl(emoji, 128, 1.5);
  await sendImage(url, threadID);
};

export const sendTypingIndicator = (threadID: string) => {
  return originalApi.sendTypingIndicator(threadID);
};

export const listen = (callback: (err: Error, message: IMessage) => void) => {
  originalApi.listen(callback);
};

export const setOptions = (options: any) => {
  originalApi.setOptions(options);
}
