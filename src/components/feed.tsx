/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React, { type ReactElement } from "react";
import { api } from "src/utils/api";
import { FeedSkeleton } from "./skeletons";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type postWithUserInfo = {
  username: string | null;
  imageUrl: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
};

export const FeedWrapper = ({
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

const Feed = (props: { userId?: string }) => {
  const resp = props.userId
    ? api.post.getPostsOfUser.useQuery(props.userId)
    : api.post.getAll.useQuery();

  if (resp.isError) return null;

  if (!resp.data) return <FeedSkeleton />;

  return (
    <FeedWrapper>
      {resp.data.map((post: postWithUserInfo, i: number) => {
        return (
          <div key={i} className="flex h-48 items-center border-y-2">
            <PostView post={post} />
          </div>
        );
      })}
    </FeedWrapper>
  );
};

export const PostView = ({ post }: { post: postWithUserInfo }) => {
  return (
    <>
      <Image
        src={post.imageUrl}
        width={48}
        height={48}
        alt="account pic"
        className="m-4 rounded-full "
      />
      <div className="flex flex-col">
        <div className="text-sm opacity-80">
          <Link href={`${post.authorId}`}>@{post.username}</Link> ·{" "}
          <Link href={`/post/${post.id}`}>
            {dayjs(post.createdAt.toISOString()).fromNow().replace("a ", "1 ")}
          </Link>
        </div>
        <Link href={`/post/${post.id}`} className="text-xl">
          {post.content}
        </Link>
      </div>
    </>
  );
};

export default Feed;
