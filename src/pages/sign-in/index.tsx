import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </div>
  );
};