export interface Post {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage: { url: string };
  categories?: Category[];
  createdAt: Date;
  author?: Author;
}

export interface NodePost {
  node: Post;
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
  posts: NodePost[];
}
