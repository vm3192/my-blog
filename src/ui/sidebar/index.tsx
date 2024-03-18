import { FC } from "react";
import styles from "@/ui/sidebar/index.module.scss";
import SidebarCard from "@/ui/sidebarCard";
import { fetchSidebarPosts } from "@/lib/data";

type Props = {};

const Sidebar: FC<Props> = async () => {
  const posts = await fetchSidebarPosts();

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Popular posts</h3>
      <div className={styles.sidebarWrapper}>
        {posts.map((post) => (
          <SidebarCard key={post._id} post={post} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
