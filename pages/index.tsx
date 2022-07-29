import Head from "next/head";
import type { NextPage } from "next";
import { Post } from "../types";
import { Categories, PostCard, PostWidget } from "../components";

const posts: Post[] = [
  {
    title: "Falafel burgers lunch at home",
    excerpt: "Super healthy",
  },
  {
    title: "Chicken fries lunch at home",
    excerpt: "Super unhealthy",
  },
];

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: Post) => (
            <PostCard post={post} key={post.title} />
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

export default Home;
