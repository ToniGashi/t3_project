import Feed, { FeedWrapper } from "~/components/feed";
import { FeedSkeleton } from "~/components/skeletons";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  console.log(username);
  const { data, isLoading } = api.userProfile.getProfileById.useQuery(username);

  if (isLoading) return <FeedSkeleton />;

  if (!data) return <div>404</div>;

  const secondaryUserName = data.firstName + " " + data.lastName;

  return (
    <>
      <Head>
        <title>{data.username ?? secondaryUserName}</title>
      </Head>
      <FeedWrapper>
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.imageUrl}
            alt={`${data.username ?? secondaryUserName ?? "unknown"}'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? secondaryUserName ?? "unknown"
        }`}</div>
        <div className="w-full border-b border-slate-400" />
        <Feed userId={data.id} />
      </FeedWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.username;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  return {
    props: {
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
