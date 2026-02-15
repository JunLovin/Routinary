import { useAuth } from '@/shared/hooks/useAuth';
import type { Article, Category } from '@/shared/models/article.model';
import { useArticleStore } from '@/shared/stores/article.store';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Categories() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const currentCategory = useArticleStore((state) => state.currentCategory);
  const filteredCategories = useArticleStore((state) => state.filteredCategories);

  const setFilteredCategories = useArticleStore((state) => state.setFilteredCategories);
  const setCurrentCategory = useArticleStore((state) => state.setCurrentCategory);
  const setCurrentArticle = useArticleStore((state) => state.setCurrentArticle);
  const getCategory = useArticleStore((state) => state.getCategory);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!currentCategory && categoryId) {
      const category = getCategory(categoryId);
      if (category) {
        setCurrentCategory(category);
      }
    }
  }, [categoryId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
    setFilteredCategories(e.target.value.trim());
  };

  const handleClickCategory = (category: Category) => {
    if (!user || !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    setCurrentCategory(category);
    navigate(`/main/${user?.id}/help/${category.id}`);
  };

  const handleClickArticle = (article: Article) => {
    if (!user || !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    setCurrentArticle(article);
    navigate(`/main/${user?.id}/article/${article.id}`);
  };

  if (categoryId) {
    return (
      <>
        <h2 className="text-2xl font-medium">Articles of "{currentCategory?.type}"</h2>
        <div className="categories grid grid-cols-3 gap-6 w-full">
          {currentCategory?.articles.map((article) => (
            <button
              key={article.id}
              onClick={() => handleClickArticle(article)}
              className="w-full text-left cursor-pointer bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-zinc-500 mt-1">{article.description}</p>
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-medium">Browse by Categories</h2>
      <div className="categories grid grid-cols-3 gap-6 w-full">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClickCategory(category)}
            className="w-full text-left cursor-pointer bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">{category.type}</h3>
            <p className="text-sm text-zinc-500 mt-1">Find articles related to {category.description?.toLowerCase()}</p>
          </button>
        ))}
      </div>
    </>
  );
}
