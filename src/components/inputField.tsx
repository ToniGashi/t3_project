"use client";

import { useState } from "react";
import { api } from "~/utils/api";

const InputField = () => {
  const [inputText, setInputText] = useState("");
  const { mutate, isLoading } = api.post.postPost.useMutation({
    onSuccess: async () => {
      await ctx.post.invalidate();
    },
  });

  const ctx = api.useContext();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      const resp = mutate({ content: inputText });
      console.log(resp);
      setInputText("");
    }
  };

  return (
    <input
      className="w-full bg-transparent outline-none"
      placeholder="Type here!"
      onChange={(e) => setInputText(e.target.value)}
      value={inputText}
      onKeyUp={handleKeyPress}
    ></input>
  );
};

export default InputField;
