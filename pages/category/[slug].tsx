import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Categories, Loader, PostCard, PostWidget } from "../../components";
import { getCategories, getCategoryPosts } from "../../services";
import { Post, Result } from "../../types";

const CategoryPosts = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const { slug } = context.params as IParams;

  const data = await getCategoryPosts(slug);

  return {
    props: { posts: data },
  };
};

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const posts = await getCategories();

    const paths = posts.map(({ slug }) => ({ params: { slug } }));

    return {
      paths,
      fallback: true,
    };
  };

export default CategoryPosts;
