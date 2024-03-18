import React, { FC } from "react";
import styles from "@/app/(basicLayout)/search/page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { fetchSearchPosts } from "@/lib/data";

type Props = {
  searchParams: {
    q: string;
  };
};

const SearchPage: FC<Props> = async ({ searchParams }) => {
  const searchData = searchParams.q;
  const posts = await fetchSearchPosts(searchData);

  if (!searchParams.q || posts.length === 0) {
    return (
      <div>
        <h2 className={styles.searchTitle}>Search results</h2>
        <p>Nothing...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.searchTitle}>Search results</h2>
      <ul className={styles.resultsList}>
        {posts.map((post) => (
          <li key={post._id}>
            <Link className={styles.resultItem} href={`/${post._id}`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={
                    post.image
                      ? post.image
                      : "https://placehold.co/600x400.png?text=No+Image"
                  }
                  alt="image"
                  fill
                />
              </div>
              <div className={styles.info}>
                <h6 className={styles.title}>{post.title}</h6>
                {/* <p className={styles.author}>{post.author}</p> */}
                <p className={styles.date}>
                  {post.createdAt.toString().slice(4, 15)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
