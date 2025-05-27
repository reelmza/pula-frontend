"use client";
import Spinner from "@/components/Spinner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, { useState } from "react";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [response, setResponse] = useState<null | string>(null);
  const [loading, setLoading] = useState<null | string>(null);
  const [history, setHistory] = useState<string[] | null>(null);
  const [predCount, setPredCount] = useState(0);

  const check = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      spamEmail: { value: string };
    };

    try {
      setLoading("check");
      const res = await fetch(`https://pula-backend.onrender.com/predict`, {
        method: "POST",
        body: JSON.stringify({
          email: target.spamEmail.value,
        }),
      });

      if (res.ok) {
        const body = await res.json();
        setPredCount((prev) => prev + 1);

        if (body.search === "Spam") {
          setResponse("Spam Email");
          setHistory((prev: string[] | null) => {
            if (prev !== null) {
              if (prev.length === 5) {
                const newPrev = prev.slice(1, 5);
                return [...newPrev, "Spam Email"];
              }

              return [...prev, "Spam Email"];
            } else {
              return ["Spam Email"];
            }
          });
        }

        if (body.search === "Ham") {
          setResponse("Normal Email");
          setHistory((prev: string[] | null) => {
            if (prev !== null) {
              if (prev.length === 5) {
                const newPrev = prev.slice(1, 5);
                return [...newPrev, "Normal Email"];
              }

              return [...prev, "Normal Email"];
            } else {
              return ["Normal Email"];
            }
          });
        }

        setDialogOpen(true);
        setLoading(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(null);
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
            required
          ></textarea>

          <button
            className={`h-10 flex items-center justify-center gap-2 bg-neutral-900 rounded w-full lg:w-48 text-white text-sm font-semibold cursor-pointer hover:bg-emerald-700 self-end ${
              loading !== null ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={loading !== null}
          >
            {loading == null ? (
              <>
                <span>Predict Email</span>
              </>
            ) : (
              <>
                <span>Checking Email</span>
                <Spinner className="size-5" />
              </>
            )}
          </button>

          {/* <div className="text-2xl">{response}</div> */}
        </form>

        <div className="hidden lg:block w-2/5 h-[20rem] border p-5 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-gray-800">Predictions</div>

            {history !== null ? (
              <div className="text-sm text-gray-600">Total: {predCount}</div>
            ) : (
              ""
            )}
          </div>

          {history?.map((item, key) => {
            return (
              <div
                key={key}
                className={`w-full h-8 mb-2 text-xs px-2 flex items-center ${
                  item === "Spam Email"
                    ? "bg-red-200 text-red-700"
                    : "bg-emerald-200 text-emerald-700"
                } font-medium rounded-sm`}
              >
                Possibly {item}
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={`w-[15rem] ${
            response === "Spam Email"
              ? "bg-gradient-to-br from-red-700 to-red-600 border border-red-600 shadow-red-900"
              : "bg-gradient-to-br from-emerald-700 to-emerald-600 border border-emerald-600 shadow-emerald-900"
          }`}
        >
          <VisuallyHidden>
            <DialogTitle>Prediction Alert</DialogTitle>
          </VisuallyHidden>
          <div
            className={`text-2xl lg:text-3xl font-bold text-center leading-none ${
              response === "Spam Email" ? "text-red-50" : "text-emerald-50"
            } tracking-tight font-sans text-shadow-xs`}
          >
            {response === "Spam Email" ? "Spam Email" : "Test Passed"}
          </div>

          <div
            className={`text-center leading-[1.25rem] text-shadow-xs ${
              response === "Spam Email" ? "text-red-50" : "text-emerald-50"
            }`}
          >
            {response === "Spam Email"
              ? "Email provided is possibly a spam email."
              : "Email provided is possibly a normal email."}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
