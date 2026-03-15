import { useAuth } from '@/shared/hooks/useAuth';
import type { Article, Category } from '@/shared/models/article.model';
import { useArticleStore } from '@/shared/stores/article.store';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

export default function Categories() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const { search } = useOutletContext<{ search: string; }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const currentCategory = useArticleStore((state) => state.currentCategory);
  const filteredCategories = useArticleStore((state) => state.filteredCategories);

  const setFilteredCategories = useArticleStore((state) => state.setFilteredCategories);
  const setCurrentCategory = useArticleStore((state) => state.setCurrentCategory);
  const setCurrentArticle = useArticleStore((state) => state.setCurrentArticle);
  const getCategory = useArticleStore((state) => state.getCategory);

  useEffect(() => {
    if (!currentCategory && categoryId) {
      const category = getCategory(categoryId);
      if (category) {
        setCurrentCategory(category);
      }
    }
  }, [categoryId, currentCategory, getCategory, setCurrentCategory, navigate, user]);

  useEffect(() => {
    setFilteredCategories(search.trim());
  }, [search, setFilteredCategories]);

  const handleClickCategory = (category: Category) => {
    if (!user || !isAuthenticated) {
      navigate('/auth/login', { replace: true });
      return;
    }

    setCurrentCategory(category);
    navigate(`/main/${user?.id}/help/${category.id}`);
  };

  const handleClickArticle = (article: Article) => {
    if (!user || !isAuthenticated) {
      navigate('/auth/login', { replace: true });
      return;
    }

    setCurrentArticle(article);
    navigate(`/main/${user?.id}/article/${article.id}`);
  };

  if (categoryId) {
    return (
      <>
        <h2 className="text-2xl font-medium">Articles of <strong>{currentCategory?.type}</strong></h2>
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
            disabled={category.disabled}
            className="
    w-full text-left p-4 rounded-lg border transition-all group
    bg-zinc-900 border-zinc-800 hover:bg-zinc-800 cursor-pointer
    disabled:opacity-50 disabled:bg-zinc-950 disabled:border-zinc-900
    disabled:cursor-not-allowed disabled:grayscale-[0.5]
  "
          >
            <h3 className="text-lg font-semibold text-zinc-100 group-disabled:text-zinc-500">
              {category.type}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
    Find articles related to {category.description?.toLowerCase()}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
