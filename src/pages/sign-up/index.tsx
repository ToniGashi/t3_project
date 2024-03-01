import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignUp />
    </div>
  );
};
