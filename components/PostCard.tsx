import React from "react";
import { Post } from "../types";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post: { node } }: { post: Post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={node.featuredImage.url}
          alt={node.title}
          className="object-center absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        ></img>
      </div>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold mx-5">
        <Link href={`/post/${node.slug}`}>{node.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            src={node.author.photo.url}
            alt={node.author.name}
            height="30px"
            width="30px"
            className="align-middle rounded-full"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {node.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(node.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {node.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${node.slug}`}>
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg rounded-full font-medium text-white px-8 py-3 cursor-pointer">
            Continue reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;