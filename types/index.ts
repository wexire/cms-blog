export interface Post {
  node: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: { url: string };
    categories: Category[];
    createdAt: Date;
    author: Author;
  };
}

export interface Category {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  id: string;
  bio: string;
  photo: { url: string };
}

export interface Result {
  posts: Post[];
}
