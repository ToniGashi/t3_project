/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import InputField from "./inputField";
import { PostSkeleton } from "./skeletons";

const Post = ({
  notify,
  user,
}: {
  notify?: (message: string, status: "success" | "error") => void;
  user: any;
}) => {
  if (!user) return <PostSkeleton />;

  return (
    <div className="flex w-full justify-center text-teal-300 ">
      <div className="flex h-48 w-full items-center border-2 md:w-2/3">
        <Image
          src={user.imageUrl}
          width={48}
          height={48}
          alt="account pic"
          className="m-4 rounded-full"
        />
        <InputField notify={notify} />
      </div>
    </div>
  );
};

export default Post;
