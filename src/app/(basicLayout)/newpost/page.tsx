import React, { FC } from "react";
import { auth } from "@/auth";
import NewPostForm from "@/ui/newPostForm";

type Props = {};

const NewPostPage: FC<Props> = async (props) => {
  const session = await auth();

  return (
    <>
      <NewPostForm session={session} />
    </>
  );
};

export default NewPostPage;
