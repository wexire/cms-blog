import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  Loader,
  PostDetail,
  PostWidget,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";
import { Category, Post, Result } from "../../types";

const PostDetails = ({ post }: { post: Post }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author!} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories!.map(
                (category: Category) => category.slug
              )}
            />
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

  const data = await getPostDetails(slug);

  return {
    props: { post: data },
  };
};

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const posts = await getPosts();

    const paths = posts.map(({ node: { slug } }) => ({ params: { slug } }));

    return {
      paths,
      fallback: true,
    };
  };

export default PostDetails;
