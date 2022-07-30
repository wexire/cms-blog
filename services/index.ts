import { request, gql } from "graphql-request";
import { Category, NodePost, Post } from "../types";

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

export const getSimilarPosts = async (): Promise<Post[]> => {
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

  const result = await request(graphqlAPI, query);

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
