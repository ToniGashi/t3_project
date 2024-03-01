import Post from "../components/post";
import { useUser } from "@clerk/nextjs";

import toast from "react-hot-toast";
import Feed from "../components/feed";
import NavBar from "../components/navbar";

export default function Home() {
  const { isSignedIn, user } = useUser();

  const notify = (message: string, status: "success" | "error") => {
    if (status === "success") {
      toast.success(message, {
        position: "top-center",
      });
    } else {
      toast.error(message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <main>
        <NavBar />
        {isSignedIn && <Post notify={notify} user={user} />}
        <Feed />
      </main>
    </>
  );
}
