import { ArrowRight, Calendar, User, Clock, Tag, Share2, Heart, BookOpen } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogPostViewerProps {
  post: BlogPost;
  onBack?: () => void;
  onRelatedPostClick?: (post: BlogPost) => void;
  relatedPosts?: BlogPost[];
}

const BlogPostViewer = ({ post, onBack, onRelatedPostClick, relatedPosts = [] }: BlogPostViewerProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  // Convert markdown-like content to HTML-like structure for display
  const renderContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-gray-900">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-4 mb-2 text-gray-900">{line.slice(4)}</h3>;
      }
      
      // Bold text with **
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed text-right">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }
      
      // Regular paragraphs
      return <p key={index} className="mb-4 text-gray-700 leading-relaxed text-right">{line}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לרשימת המאמרים
        </button>
      )}

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="h-64 md:h-96 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
            <span 
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${post.category.color || 'bg-gray-500'}`}
            >
              {post.category.name}
            </span>
            
            {post.isFeatured && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
                מומלץ
              </span>
            )}

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>

            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author.name}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} דקות קריאה
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-right leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <div className="text-xl text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg border-r-4 border-blue-500 text-right">
            {post.excerpt}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-medium text-gray-900">{post.author.name}</h3>
              {post.author.bio && (
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-right">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3 text-right">תגים</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                שתף
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4" />
                אהבתי
              </button>
            </div>

            <div className="text-sm text-gray-500">
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span>עודכן: {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            מאמרים קשורים
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <article
                key={relatedPost.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => onRelatedPostClick?.(relatedPost)}
              >
                {relatedPost.coverImage && (
                  <div className="h-32 bg-gray-200 overflow-hidden">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <span 
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white mb-2 ${relatedPost.category.color || 'bg-gray-500'}`}
                  >
                    {relatedPost.category.name}
                  </span>
                  
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-right">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 text-right">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {relatedPost.readingTime} דק׳
                    </span>
                    <span>{relatedPost.author.name}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostViewer;
