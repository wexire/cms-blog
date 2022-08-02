import { request, gql } from "graphql-request";
import { Category, CommentObj, NodePost, Post } from "../types";

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async (): Promise<NodePost[]> => {
  const query: string = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            excerpt
            slug
            title
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getPostDetails = async (slug: string): Promise<Post> => {
  const query: string = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        excerpt
        slug
        title
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getRecentPosts = async (): Promise<Post[]> => {
  const query: string = gql`
    query GetPostsDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title,
        featuredImage { url },
        createdAt,
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (
  categories: string[],
  slug: string
): Promise<Post[]> => {
  const query = gql`
    query GetPostsDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getCategories = async (): Promise<Category[]> => {
  const query = gql`
    query getCategories() {
      categories { 
        name,
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const submitComment = async (obj: CommentObj): Promise<JSON> => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug: string): Promise<CommentObj[]> => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getCategoryPosts = async (slug: string): Promise<Post[]> => {
  const query = gql`
    query GetCategoryPosts($slug: String!) {
      posts(where: { categories_some: { slug: $slug } }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        excerpt
        slug
        title
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.posts;
};
