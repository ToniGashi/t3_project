import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import InputField from "./inputField";
import { PostSkeleton } from "./skeletons";

const Post = () => {
  const { user } = useUser();

  if (!user) return <PostSkeleton />;

  return (
    <div className="flex w-full justify-center text-teal-300 ">
      <div className="flex h-48 items-center border-2 md:w-2/3">
        <Image
          src={user.imageUrl}
          width={48}
          height={48}
          alt="account pic"
          className="m-4 rounded-full"
        />
        <InputField />
      </div>
    </div>
  );
};

export default Post;
