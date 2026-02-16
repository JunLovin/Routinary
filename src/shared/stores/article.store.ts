import { create } from 'zustand';
import type { Article, Category, CategoryType } from '../models/article.model';
import { immer } from 'zustand/middleware/immer';
import { articles, categories } from '../data/articles.data';

type State = {
  articles: Article[];
  currentArticle: Article | null;

  categories: Category[];
  filteredCategories: Category[];
  currentCategory: Category | null;
}

type Actions = {
  getArticles: () => Article[];
  getArticle: (id: string) => Article | undefined;
  setCurrentArticle: (article: Article) => void;
  getArticlesByCategory: (category: CategoryType) => Article[];
  getArticlesByCurrentCategory: () => Article[] | undefined;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  getCategories: () => Category[];
  getCategory: (id: string) => Category | undefined;
  setCurrentCategory: (category: Category) => void;
  setFilteredCategories: (searchTerm: string) => void;
}

export const useArticleStore = create<State & Actions>()(
  immer((set, get) => ({
    articles: articles,
    currentArticle: null,
    categories: categories,
    filteredCategories: categories,
    currentCategory: null,

    getArticles: () => {
      return get().articles;
    },

    getCategories: () => {
      return get().categories;
    },

    getArticlesByCategory: (category) => {
      return get().articles.filter((a) => a.category === category);
    },

    getArticlesByCurrentCategory: () => {
      const currentCategory = get().currentCategory;
      if (currentCategory) {
        return get().articles.filter((a) => a.category === currentCategory.type);
      }
    },

    getArticle: (id) => {
      return get().articles.find((a) => a.id === id);
    },

    getCategory: (id) => {
      return get().categories.find((c) => c.id === id);
    },

    setCurrentArticle: (article) => {
      set((state: State) => {
        state.currentArticle = article;
      });
    },

    setCurrentCategory: (category) => {
      set((state: State) => {
        state.currentCategory = category;
      });
    },

    setFilteredCategories: (searchTerm) => {
      set((state) => {
        if (!searchTerm.trim()) {
          state.filteredCategories = state.categories;
          return;
        }

        const filteredCategories = state.categories.filter((c) => c.type.toLowerCase().includes(searchTerm.toLowerCase()));

        state.filteredCategories = filteredCategories;
      });
    },

    updateArticle: (id, data) => {
      set((state: State) => {
        const article = state.articles.find((a) => a.id === id);
        if (article) {
          Object.assign(article, data);
        }
      });
    },

    deleteArticle: (id) => {
      set((state: State) => {
        state.articles = state.articles.filter((a) => a.id !== id);
      });
    },
  })),
);
