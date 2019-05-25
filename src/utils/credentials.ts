import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const APP_STATE_PATH = resolve('./app-state.json');

export const getCredentials = () => {
  if (!existsSync(APP_STATE_PATH)) {
    const { FB_EMAIL, FB_PASSWORD } = process.env;
    return { email: FB_EMAIL, password: FB_PASSWORD };
  }
  return { appState: JSON.parse(readFileSync(APP_STATE_PATH, 'utf8')) };
};

export const saveAppState = (appState: any) =>
  writeFileSync(APP_STATE_PATH, JSON.stringify(appState));
