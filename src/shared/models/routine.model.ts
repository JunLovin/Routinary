import type { Message } from '@/shared/models/message.model';

export interface Routine {
  id: string;
  userId: string;
  title: string;
  description?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
