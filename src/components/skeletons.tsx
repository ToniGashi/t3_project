export function PostSkeleton() {
  return (
    <div className={`flex w-full animate-pulse justify-center overflow-hidden`}>
      <div className="flex h-48 items-center border-2 md:w-2/3">
        <div className="flex items-center p-4">
          <div className={`h-12 w-12 rounded-full bg-gray-200`} />
          <div
            className={`ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium`}
          />
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );
}
