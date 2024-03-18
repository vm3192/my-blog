"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "@/ui/button";
import styles from "@/ui/postText/index.module.scss";
import { editPost } from "@/lib/actions";
import { useFormState } from "react-dom";

type Props = {
  isOwner: boolean;
  postId: string;
  text: string;
};

const PostText: FC<Props> = ({ isOwner, postId, text }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState(text);
  const [state, formAction] = useFormState(editPost, undefined);

  useEffect(() => {
    setIsEdit(false);
  }, [state?.success]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleInputText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  return (
    <>
      {isEdit ? (
        <form action={formAction}>
          <input type="hidden" name="_id" value={postId} />
          <textarea
            className={styles.postTextEdit}
            name="text"
            value={inputText}
            onChange={handleInputText}
            required
          />
          {isOwner && (
            <div className={styles.editBtn}>
              <Button text="done" />
            </div>
          )}
        </form>
      ) : (
        <>
          <div className={styles.postText}>{inputText}</div>
          {isOwner && (
            <div className={styles.editBtn} onClick={handleEdit}>
              <Button text="edit" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostText;
