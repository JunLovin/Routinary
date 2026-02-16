import { useArticleStore } from '@/shared/stores/article.store';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '@/shared/hooks/useAuth';

export default function Article() {
  const { user } = useAuth();
  const { articleId } = useParams<{ articleId?: string }>();
  const navigate = useNavigate();

  const currentArticle = useArticleStore((state) => state.currentArticle);
  const setCurrentArticle = useArticleStore((state) => state.setCurrentArticle);
  const getArticle = useArticleStore((state) => state.getArticle);

  useEffect(() => {
    if (articleId) {
      const article = getArticle(articleId);
      if (article) {
        setCurrentArticle(article);
      } else {
        navigate(`/main/${user?.id}/help`);
      }
    }
  }, [articleId, getArticle, setCurrentArticle, navigate, user?.id]);

  if (!currentArticle) {
    return (
      <div className="h-dvh flex items-center justify-center text-zinc-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-100 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading article...</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(currentArticle.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="h-dvh bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(`/main/${user?.id}/help`)}
            className="flex cursor-pointer items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Help Center</span>
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm font-medium border border-orange-600/30">
              {currentArticle.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="w-4 h-4" />
              <time dateTime={currentArticle.createdAt.toISOString()}>
                {formattedDate}
              </time>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            {currentArticle.title}
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed">
            {currentArticle.description}
          </p>
        </header>

        {currentArticle.image && (
          <div className="mb-12 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src={currentArticle.image}
              alt={currentArticle.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div
          className="article-content prose prose-invert prose-lg max-w-none
                     prose-headings:font-semibold prose-headings:tracking-tight
                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                     prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                     prose-p:text-zinc-300 prose-p:leading-relaxed pb-12 prose-p:mb-6
                     prose-ul:my-6 prose-li:text-zinc-300 prose-li:my-2
                     prose-strong:text-zinc-100 prose-strong:font-semibold
                     prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: currentArticle.content }}
        />
      </article>
    </div>
  );
}
