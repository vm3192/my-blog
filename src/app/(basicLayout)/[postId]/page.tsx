import { FC } from "react";
import styles from "@/app/(basicLayout)/[postId]/page.module.scss";
import { fetchAuthor, fetchComments, fetchPost } from "@/lib/data";
import Image from "next/image";
import Comment from "@/ui/comment";
import { auth } from "@/auth";
import NewCommentForm from "@/ui/newCommentForm";
import PostText from "@/ui/postText";

type Props = {
  params: {
    postId: string;
  };
};

const PostPage: FC<Props> = async ({ params }) => {
  const post = await fetchPost(params.postId);
  const author = await fetchAuthor(post.author);
  const comments = await fetchComments(params.postId);
  const session = await auth();
  const isOwner = author.email === session?.user?.email ? true : false;

  return (
    <>
      <div className={styles.post}>
        <div className={styles.postImage_wrapper}>
          <Image
            src={
              post.image
                ? post.image
                : "https://placehold.co/600x400.png?text=No+Image"
            }
            alt="Post Preview"
            fill
          />
        </div>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <div className={styles.postInfo}>
          <span className={styles.postInfo_author}>
            By <span>{author.username}</span>
          </span>
          <span className={styles.postDate}>{post.date}</span>
        </div>
        <PostText isOwner={isOwner} postId={post._id.toString()} text={post.text} />
      </div>
      <div className={styles.comments}>
        <h3 className={styles.contentTitle}>Comments</h3>
        <div className={styles.commentsWrapper}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment._id} postId={post._id.toString()} currentUser={session?.user?.email} comment={comment} />
            ))
          ) : (
            <p>Nothing yet...</p>
          )}
        </div>
      </div>
      {session && <NewCommentForm session={session} postId={params.postId} />}
    </>
  );
};

export default PostPage;
