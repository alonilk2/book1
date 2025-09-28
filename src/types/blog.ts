export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  readingTime: number; // in minutes
  isPublished: boolean;
  isFeatured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  publishedAt: string;
  isApproved: boolean;
  replies?: BlogComment[];
}

export interface BlogFilter {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'popular' | 'title';
}
