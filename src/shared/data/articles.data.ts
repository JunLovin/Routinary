import type { Article, Category } from '../models/article.model';
import ICSToGoogleCalendar from '@/assets/images/icsToGoogle.webp';

export const articles: Article[] = [
  {
    id: crypto.randomUUID(),
    title: 'How To Import ICS Files Into Google Calendar',
    description: 'Learn how to easily import ICS files into your Google Calendar and stay organized with your schedule.',
    content: 'ICS files are a common format for calendar data, and Google Calendar allows you to import them to keep all your events in one place. In this article, we will guide you through the steps to import ICS files into Google Calendar, ensuring that you can manage your schedule efficiently.',
    category: 'How To',
    image: ICSToGoogleCalendar,
    link: 'https://www.icscalendar.com/blog/how-to-import-ics-files-into-google-calendar/',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'How To Import ICS Files Into Outlook Calendar',
    description: 'Learn how to easily import ICS files into your Outlook Calendar and stay organized with your schedule.',
    content: 'ICS files are a common format for calendar data, and Outlook Calendar allows you to import them to keep all your events in one place. In this article, we will guide you through the steps to import ICS files into Outlook Calendar, ensuring that you can manage your schedule efficiently.',
    category: 'How To',
    image: 'https://www.icscalendar.com/images/ics-to-outlook-calendar.png',
    link: 'https://www.icscalendar.com/blog/how-to-import-ics-files-into-outlook-calendar/',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'How To Import ICS Files Into Notion Calendar',
    description: 'Learn how to easily import ICS files into your Notion Calendar and stay organized with your schedule.',
    content: 'ICS files are a common format for calendar data, and Notion Calendar allows you to import them to keep all your events in one place. In this article, we will guide you through the steps to import ICS files into Notion Calendar, ensuring that you can manage your schedule efficiently.',
    category: 'How To',
    image: 'https://www.icscalendar.com/images/ics-to-notion-calendar.png',
    link: 'https://www.icscalendar.com/blog/how-to-import-ics-files-into-notion-calendar/',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const categories: Category[] = [
  {
    id: crypto.randomUUID(),
    type: 'How To',
    articles: articles.filter((a) => a.category === 'How To'),
    description: 'Step-by-step guides to help you accomplish specific tasks and learn new skills.',
    order: 1,
  },
  {
    id: crypto.randomUUID(),
    type: 'Troubleshooting',
    articles: [],
    description: 'Solutions to common problems and issues you may encounter while using our product.',
    order: 2,
  },
  {
    id: crypto.randomUUID(),
    type: 'Best Practices',
    articles: [],
    description: 'Tips and recommendations to help you get the most out of our product and improve your workflow.',
    order: 3,
  },
];
