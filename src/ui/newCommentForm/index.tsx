"use client";

import { Session } from "next-auth";
import React, { FC, useEffect, useState } from "react";
import { newComment } from "@/lib/actions";
import Button from "@/ui/button";
import styles from "@/ui/newCommentForm/index.module.scss";
import { useFormState } from "react-dom";

type Props = {
  session: Session | null;
  postId: string;
};

const NewCommentForm: FC<Props> = ({ session, postId }) => {
  const [textValue, setTextValue] = useState<string>("");
  const [state, formAction] = useFormState(newComment, undefined);

  useEffect(() => {
    setTextValue("");
  }, [state?.success]);

  return (
    <form className={styles.newComment} action={formAction}>
      <h3 className={styles.contentTitle}>Leave a Comment</h3>
      <input
        type="hidden"
        name="commentator"
        value={session?.user?.email!}
      />
      <textarea
        className={styles.newComment_textarea}
        name="commentText"
        placeholder="Comment"
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
        required
      />
      <input type="hidden" name="belongToPost" value={postId} />
      <Button text="Post Comment" />
    </form>
  );
};

export default NewCommentForm;
