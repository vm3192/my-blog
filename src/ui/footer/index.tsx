import { FC } from "react";
import styles from "@/ui/footer/index.module.scss";
import Logo from "@/ui/logo";
import Link from "next/link";
import SidebarCard from "@/ui/sidebarCard";
import { fetchFooterPosts } from "@/lib/data";
import { auth } from "@/auth";

type Props = {};

const Footer: FC<Props> = async () => {
  const posts = await fetchFooterPosts();
  const session = await auth();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerWrapper}>
          <div className={`${styles.footerItem} ${styles.logo}`}>
            <Logo />
            <p className={styles.footerParagraph}>
              Try MyBlog for communication!
            </p>
          </div>
          <div className={`${styles.footerItem} ${styles.links}`}>
            <h6 className={styles.footerTitle}>Quick Links</h6>
            <ul className={styles.navList}>
              <li className={styles.navList_item}>
                <Link className={styles.navList_link} href="/">
                  Home
                </Link>
              </li>
              {session?.user && (
                <>
                  <li className={styles.navList_item}>
                    <Link className={styles.navList_link} href="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className={styles.navList_item}>
                    <Link className={styles.navList_link} href="/newpost">
                      New Post
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className={`${styles.footerItem} ${styles.posts}`}>
            <h6 className={styles.footerTitle}>Recent Posts</h6>
            <div className={styles.footerPosts_wrapper}>
              {posts.map((post) => (
                <SidebarCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
