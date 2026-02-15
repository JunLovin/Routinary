import { useArticleStore } from '@/shared/stores/article.store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Article() {
  const { articleId } = useParams<{ articleId?: string; }>();

  const currentArticle = useArticleStore((state) => state.currentArticle);

  const setCurrentArticle = useArticleStore((state) => state.setCurrentArticle);
  const getArticle = useArticleStore((state) => state.getArticle);

  useEffect(() => {
    if (!currentArticle && articleId) {
      const article = getArticle(articleId);
      if (article) {
        setCurrentArticle(article);
      }
    }
  }, [articleId]);

  // TODO: Finish this component and search bar from the Help Page

  return (
    <div className="h-dvh flex text-zinc-100 justify-center">
      <div className="article-content max-w-4xl mx-auto flex flex-col gap-4">
        <div className="top-content flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold leading-normal tracking-wide">{currentArticle?.title}</h1>
          <div className="article-image h-80 w-xl">
            <img
              src={currentArticle?.image}
              alt={currentArticle?.title}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
