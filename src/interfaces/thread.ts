export interface IThreadInfo {
  threadID: string;
  participantIDs: string[];
  name: string;
  nicknames: IThreadNicknames;
  unreadCount: number;
  messageCount: number;
  imageSrc: string;
  timestamp: number;
  muteUntil: number;
  isGroup: boolean;
  isSubscribed: boolean;
  folder: 'inbox' | 'archive';
  isArchived: boolean;
  cannotReplyReason: string;
  lastReadTimestamp: number;
  emoji: string;
  color: string;
  adminIDs: string[];
}

export interface IThreadNicknames {
  [xd: string]: string;
}
