import { FC } from "react";
import styles from "@/ui/postPreview/index.module.scss";
import Image from "next/image";
import Button from "@/ui/button";
import { fetchAuthor } from "@/lib/data";

type Props = {
  post: {
    _id: string;
    title: string;
    author: string;
    text: string;
    image?: string;
    createdAt: string;
  };
};

const PostPreview: FC<Props> = async ({ post }) => {
  const { _id, title, author, text, image, createdAt } = post;
  const { username } = await fetchAuthor(author);

  return (
    <div className={styles.post}>
      <div className={styles.postImage}>
        <Image
          src={image ? image : "https://placehold.co/600x400.png?text=No+Image"}
          alt="Post Preview"
          fill
        />
      </div>
      <div className={styles.postBox}>
        <h2 className={styles.postTitle}>{title}</h2>
        <div className={styles.postInfo}>
          <span>
            By <span className={styles.postInfo_author}>{username}</span>
          </span>
          <span className={styles.postInfo_date}>
            {createdAt.toString().slice(4, 15)}
          </span>
        </div>
        <div className={styles.postText}>{text}</div>
        <Button text="Read more" link={`/${_id}`} />
      </div>
    </div>
  );
};

export default PostPreview;
