"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "@/ui/newPostForm/page.module.scss";
import Button from "@/ui/button";
import AddImage from "@/ui/addImage";
import { newPost } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const NewPostForm: FC<Props> = ({ session }) => {
  const [state, formAction] = useFormState(newPost, undefined);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setTitle("");
    setText("");
  }, [state?.success]);

  return (
    <form className={styles.formWrapper} action={formAction}>
      <div className={styles.title}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <input type="hidden" name="author" value={session?.user?.email!} />
      <div className={styles.text}>
        <label htmlFor="text">Enter your text</label>
        <textarea
          name="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
      </div>
      <div className={styles.banner}>
        <span className={styles.addText}>Add your banner:</span>
        <AddImage state={state} />
      </div>
      <Button text="Create post" />
      {state?.success && <p className={styles.success}>{state.success}</p>}
    </form>
  );
};

export default NewPostForm;
