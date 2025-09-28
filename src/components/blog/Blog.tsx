import { useState, useMemo } from 'react';
import BlogList from './BlogList';
import BlogPostViewer from './BlogPostViewer';
import type { BlogPost } from '../../types/blog';
import { sampleBlogPosts } from '../../data/blogData';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts] = useState<BlogPost[]>(sampleBlogPosts);

  // Get related posts for the selected post
  const relatedPosts = useMemo(() => {
    if (!selectedPost) return [];
    
    return posts
      .filter(post => 
        post.id !== selectedPost.id && 
        (post.category.id === selectedPost.category.id || 
         post.tags.some(tag => selectedPost.tags.includes(tag)))
      )
      .slice(0, 3);
  }, [selectedPost, posts]);

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    // Scroll to top when viewing a post
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return (
      <BlogPostViewer
        post={selectedPost}
        onBack={handleBackToList}
        onRelatedPostClick={handlePostSelect}
        relatedPosts={relatedPosts}
      />
    );
  }

  return (
    <BlogList
      posts={posts}
      onPostSelect={handlePostSelect}
    />
  );
};

export default Blog;
