export interface IMessage {
  type?: any;
  senderID?: string;
  body?: string;
  threadID?: string;
  messageID?: string;
  attachments?: any[];
  mentions?: any;
  timestamp?: any;
  isGroup?: boolean;
  attachment?: any;
  url?: any;
}
