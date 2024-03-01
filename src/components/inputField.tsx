"use client";
import { useState } from "react";
import { LoadingSpinner } from "./loadingSpinner";
import { api } from "src/utils/api";

const InputField = ({
  notify,
}: {
  notify?: (message: string, status: "success" | "error") => void;
}) => {
  const [inputText, setInputText] = useState("");
  const { mutate, isLoading: isPosting } = api.post.postPost.useMutation({
    onSuccess: async () => {
      await ctx.post.invalidate();
      notify && notify("Posted successfully", "success");
    },
    onError: async (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors?.content?.[0];
      if (errorMessage && notify) return notify(errorMessage, "error");
      return notify ? notify(err.message, "error") : null;
    },
  });

  const ctx = api.useContext();

  const handleMutation = () => {
    mutate({ content: inputText });
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleMutation();
    }
  };

  return (
    <div className="mr-5 flex w-full">
      <input
        className="w-full bg-transparent outline-none"
        placeholder="Type here!"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        onKeyUp={handleKeyPress}
        disabled={isPosting}
      ></input>
      {isPosting ? (
        <LoadingSpinner />
      ) : (
        <button
          className="disabled:opacity-30"
          disabled={inputText === "" || isPosting}
          onClick={handleMutation}
        >
          POST
        </button>
      )}
    </div>
  );
};

export default InputField;
