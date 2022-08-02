import Head from "next/head";
import type { GetStaticProps, GetStaticPropsResult } from "next";
import { NodePost, Result } from "../types";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts } from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";

const Home = ({ posts }: { posts: NodePost[] }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.node.title} post={post.node} />
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

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Result>
> => {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
};

export default Home;
