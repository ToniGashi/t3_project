import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
    return (
      <div className="mb-8 flex h-fit w-full justify-end bg-gray-800 p-4">
        <SignedIn>
          <UserButton afterSignOutUrl={"/"} />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </SignedOut>
      </div>
    );
  };
  
export default NavBar;