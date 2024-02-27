/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "~/utils/api";
import Image from "next/image";
import type { ReactElement } from "react";
import Post from "~/components/post";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { FeedSkeleton } from "~/components/skeletons";
import Link from "next/link";
import type { Metadata } from "next";

type postWithUserInfo = {
  username: string | null;
  imageUrl: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
};

dayjs.extend(relativeTime);

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

const FeedWrapper = ({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) => (
  <div className="flex h-full justify-center">
    <div className="w-full flex-col text-teal-300 md:w-2/3">
      <div className="flex-col items-center border-2">{children}</div>
    </div>
  </div>
);

const Feed = () => {
  const resp = api.post.getPosts.useQuery();

  if (resp.isError) return null;

  if (!resp.data) return <FeedSkeleton />;

  return (
    <FeedWrapper>
      {resp.data.map((post: postWithUserInfo, i: number) => {
        return (
          <div key={i} className="flex h-48 items-center border-y-2">
            <Image
              src={post.imageUrl}
              width={48}
              height={48}
              alt="account pic"
              className="m-4 rounded-full "
            />
            <div className="flex flex-col">
              <div className="text-sm opacity-80">
                @{post.username} ·{" "}
                {dayjs(post.createdAt.toISOString()).fromNow()}
              </div>
              <div className="text-xl">{post.content}</div>
            </div>
          </div>
        );
      })}
    </FeedWrapper>
  );
};

export const metadata: Metadata = {
  title: "T3 Project",
  description: "Toni's T3 Project",
};

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <>
      <main>
        <NavBar />
        {isSignedIn && <Post />}
        <Feed />
      </main>
    </>
  );
}
