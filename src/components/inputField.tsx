"use client";

import { useState } from "react";

const InputField = () => {
  const [inputText, setInputText] = useState("");
  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      console.log(inputText);
    }
  };

  return (
    <input
      className="w-full bg-transparent outline-none"
      placeholder="Type here!"
      onChange={(e) => setInputText(e.target.value)}
      onKeyUp={handleKeywordKeyPress}
    ></input>
  );
};

export default InputField;
