"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "@/ui/commentText/index.module.scss";
import { useFormState } from "react-dom";
import { deleteComment, editComment } from "@/lib/actions";

type Props = {
  postId: string;
  isOwner: boolean;
  commentId: string;
  text: string;
};

const CommentText: FC<Props> = ({ postId, isOwner, commentId, text }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentText, setCommentText] = useState(text);
  const [state, formAction] = useFormState(editComment, undefined);

  useEffect(() => {
    setIsEdit(false);
  }, [state]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  return (
    <>
      {isEdit ? (
        <form className={styles.textWrapper} action={formAction}>
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="_id" value={commentId} />
          <textarea
            className={styles.commentTextEdit}
            name="commentText"
            value={commentText}
            onChange={handleCommentText}
            required
          />
          {isOwner ? (
            <div className={styles.btnsRow}>
              <button className={styles.commentBtn}>Done</button>
            </div>
          ) : null}
        </form>
      ) : (
        <div className={styles.textWrapper}>
          <div className={styles.commentText}>{commentText}</div>
          {isOwner ? (
            <div className={styles.btnsRow}>
              <button className={styles.commentBtn} onClick={handleEdit}>
                Edit
              </button>
              <form action={deleteComment}>
                <input type="hidden" name="postId" value={postId} />
                <input type="hidden" name="_id" value={commentId} />
                <button className={styles.commentBtn}>Delete</button>
              </form>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CommentText;
