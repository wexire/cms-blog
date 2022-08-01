import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";
import { CommentObj } from "../types";

const CommentsForm = ({ slug }: { slug: string }) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.localStorage.getItem("name") !== null) {
      nameEl.current!.value = window.localStorage.getItem("name")!;
    }
    if (window.localStorage.getItem("email") !== null) {
      emailEl.current!.value = window.localStorage.getItem("email")!;
    }
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current!;
    const { value: email } = emailEl.current!;
    const { value: name } = nameEl.current!;
    const { checked: storeData } = storeDataEl.current!;

    if (!comment || !email || !name) {
      setError(true);
      return;
    }

    const commentObj: CommentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then(() => {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="font-semibold text-xl mb-8 border-b pb-4">
        Leave a reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          placeholder="Comment"
          name="comment"
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          placeholder="Name"
          name="name"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          placeholder="Email"
          name="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            defaultChecked={true}
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my email and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <p className="text-xl md:float-right font-semibold mt-6 text-green-500 md:mt-3">
            Comment submitted for review.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
