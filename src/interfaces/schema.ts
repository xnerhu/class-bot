export interface ISchema {
  [key: string]: IModule;
}

export interface IModule {
  description?: string;
  args?: string[];
  hidden?: boolean;
  action?: (args: string[], threadID: string) => Promise<void> | void;
  image?: string;
}
