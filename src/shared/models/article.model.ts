export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  category: CategoryType;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  link?: string;
}

export type CategoryType = 'How To' | 'Troubleshooting' | 'Best Practices' | 'General';

export interface Category {
  id: string;
  type: CategoryType;
  articles: Article[];
  description?: string;
  order: number;
}
