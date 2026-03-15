import type { Message } from '@/shared/models/message.model';

type CreateMessage = {
  routineId: string;
  sender: 'USER' | 'AI';
  content: string;
  token: string;
  userId?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMessagesService = async (routineId: string, token: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_URL}/messages/${routineId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessageService = async (data: CreateMessage): Promise<Message> => {
  try {
    if (data.sender === 'USER' && !data.userId) {
      throw new Error('User ID is required to send a message');
    }

    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        routineId: data.routineId,
        sender: data.sender,
        content: data.content,
        userId: data.userId || null,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
