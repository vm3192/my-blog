import { FC } from "react";
import PostPreview from "@/ui/postPreview";
import { fetchPosts } from "@/lib/data";
import Pagination from "@/ui/pagination";

type Props = {
  searchParams: {
    page: number;
  };
};

const Home: FC<Props> = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const { count, posts } = await fetchPosts(page);


  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
      <Pagination count={count} />
    </>
  );
};

export default Home;
