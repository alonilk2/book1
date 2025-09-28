import { useState, useMemo } from 'react';
import type { BlogPost } from '../../types/blog';
import { Search, Filter, Tag, Calendar, User, Clock } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  onPostSelect?: (post: BlogPost) => void;
}

interface FilterOptions {
  search: string;
  category: string;
  tag: string;
  sortBy: 'newest' | 'oldest' | 'popular' | 'title';
}

const BlogList = ({ posts, onPostSelect }: BlogListProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    tag: '',
    sortBy: 'newest'
  });

  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(post => post.category.name));
    return Array.from(uniqueCategories);
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags);
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = !filters.search || 
        post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.author.name.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || post.category.name === filters.category;
      const matchesTag = !filters.tag || post.tags.includes(filters.tag);

      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title, 'he');
        case 'popular':
          // For now, sort by featured posts first, then by date
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, filters]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">הבלוג שלנו</h1>
        <p className="text-lg text-gray-600">מחשבות, רעיונות וסיפורים מעולם הספרות והכתיבה</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="חיפוש במאמרים..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'הסתר מסננים' : 'הצג מסננים'}
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">קטגוריה</label>
              <select
                title="בחר קטגוריה"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-right"
              >
                <option value="">כל הקטגוריות</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">תג</label>
              <select
                title="בחר תג"
                value={filters.tag}
                onChange={(e) => setFilters(prev => ({ ...prev, tag: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-right"
              >
                <option value="">כל התגים</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">מיון</label>
              <select
                title="בחר סדר מיון"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterOptions['sortBy'] }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-right"
              >
                <option value="newest">החדשים ביותר</option>
                <option value="oldest">הישנים ביותר</option>
                <option value="popular">פופולריים</option>
                <option value="title">לפי כותרת</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          נמצאו {filteredPosts.length} מאמרים
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => onPostSelect?.(post)}
          >
            {/* Cover Image */}
            {post.coverImage && (
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-6">
              {/* Category Badge */}
              <div className="mb-3">
                <span 
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${post.category.color || 'bg-gray-500'}`}
                >
                  {post.category.name}
                </span>
                {post.isFeatured && (
                  <span className="mr-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
                    מומלץ
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 text-right">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4 line-clamp-3 text-right">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
                )}
              </div>

              {/* Meta Information */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} דק׳
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">לא נמצאו מאמרים</h3>
          <p className="text-gray-600">נסו לשנות את המסננים או את מילות החיפוש</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
