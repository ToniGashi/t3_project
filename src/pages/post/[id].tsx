import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FeedWrapper, PostView } from "~/components/feed";
import { PostSkeleton } from "~/components/skeletons";
import { api } from "~/utils/api";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.post.getSpecificPostInformation.useQuery(id);

  if (isLoading) return <PostSkeleton />;

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.username} - @${data.content}`}</title>
      </Head>
      <FeedWrapper>
        <div className="flex h-48 items-center border-y-2">
          <PostView post={data} />
        </div>
      </FeedWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
