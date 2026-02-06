import type { User } from "./user.model";

export interface Routine {
  id: string;
  userId: string;
  title: string;
  description: string;
  prompt: string;
  icsContent: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
