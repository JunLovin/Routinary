export interface Message {
  id: string;
  routineId: string;
  sender: 'USER' | 'AI';
  userId?: string;
  content: string;
  createdAt: Date;
  isICS?: boolean;
};
