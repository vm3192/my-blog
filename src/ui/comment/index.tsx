import { FC } from "react";
import Image from "next/image";
import styles from "@/ui/comment/index.module.scss";
import { fetchAuthor } from "@/lib/data";
import CommentText from "@/ui/commentText";

type Props = {
  postId: string;
  currentUser?: string | null;
  comment: {
    _id: string;
    commentator: string;
    avatar: string;
    commentText: string;
    createdAt: string;
  };
};

const Comment: FC<Props> = async ({ postId, currentUser, comment }) => {
  const { _id, commentator, commentText, createdAt } = comment;
  const { username, image } = await fetchAuthor(commentator);
  const isOwner = commentator === currentUser ? true : false

  return (
    <div className={styles.comment}>
      <div className={styles.commentImage_wrapper}>
        <Image src={image} alt="avatar" fill />
      </div>
      <div className={styles.commentBox}>
        <div className={styles.commentInfo}>
          <span className={styles.commentAuthor}>{username}</span>
          <span className={styles.commentDate}>
            {createdAt.toString().slice(4, 15)}
          </span>
        </div>
        <CommentText postId={postId} isOwner={isOwner} commentId={_id.toString()} text={commentText} />
      </div>
    </div>
  );
};

export default Comment;
