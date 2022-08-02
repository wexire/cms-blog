import React, { useEffect, useState } from "react";
import { getComments } from "../services";
import { CommentObj } from "../types";
import moment from "moment";
import parse from "html-react-parser";

const Comments = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<CommentObj[]>([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
          <h3 className="text-xl font-semibold border-b pb-4 mb-8">
            {comments.length} comments
          </h3>
          {comments.map((comment) => (
            <div
              key={String(comment.createdAt)}
              className="border-b border-gray-100 mb-4 pb-4"
            >
              <p className="mb-4 ">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
