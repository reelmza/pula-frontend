"use client";
import React, { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<null | string>(null);
  const check = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      spamEmail: { value: string };
    };

    console.log(target.spamEmail.value);

    try {
      const res = await fetch(`https://pula-backend.onrender.com/predict`, {
        method: "POST",
        body: JSON.stringify({
          email: target.spamEmail.value,
        }),
      });

      if (res.ok) {
        const body = await res.json();
        console.log(body);
        setResponse(body.search);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center font-sans mt-20">
      {/* Heading */}
      <h1 className=" text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 font-extrabold tracking-tight mb-2">
        Email Spam Filter
      </h1>

      <p className="w-full lg:w-[35%] px-5 text-sm text-gray-600 mb-10 text-center">
        Please paste a substancial number of text from any part of your email
        content for accuracy.
      </p>

      {/* Content */}
      <div className="flex w-full px-5 lg:w-6/10 lg:gap-4">
        <form className="w-full lg:w-3/5 flex flex-col" onSubmit={check}>
          <textarea
            name="spamEmail"
            id="spamEmail"
            className="min-h-[20rem] h-[20rem] w-full outline-none bg-transparent border border-neutral-300 rounded-lg p-5 shadow resize-none mb-5 text-sm lg:text-md"
            placeholder="Enter content from email to predict..."
          ></textarea>

          <button className="h-10 bg-emerald-600 rounded w-32 text-white text-sm font-semibold cursor-pointer hover:bg-emerald-700 self-end">
            Check
          </button>

          <div className="text-2xl">{response}</div>
        </form>

        <div className="hidden lg:flex w-2/5 h-[20rem] bg-neutral-100 p-5 rounded-md">
          Sidebar
        </div>
      </div>
    </div>
  );
}
