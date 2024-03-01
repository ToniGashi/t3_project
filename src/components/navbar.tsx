import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="mb-8 flex h-fit w-full justify-end bg-gray-800 p-4">
      <SignedIn>
        <UserButton afterSignOutUrl={"/"} />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 "
          >
            Sign In
          </button>
        </Link>
        <Link href="/sign-up">
          <button
            type="button"
            className="focus:teal-blue-300 mb-2 me-2 rounded-lg bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 dark:shadow-lg dark:shadow-teal-800/80 dark:focus:ring-teal-800 "
          >
            Sign Up
          </button>
        </Link>
      </SignedOut>
    </div>
  );
};

export default NavBar;
