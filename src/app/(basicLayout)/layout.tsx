import { FC, ReactNode } from "react";
import styles from "@/app/(basicLayout)/layout.module.scss";
import Header from "@/ui/header";
import Footer from "@/ui/footer";
import Sidebar from "@/ui/sidebar";
import { auth } from "@/auth";
import { fetchAuthor } from "@/lib/data";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = async ({ children }) => {
  const session = await auth();
  const user = await fetchAuthor(session?.user?.email!);

  return (
    <>
      <Header avatar={user ? user.image : null} />
      <main className="main">
        <div className="container">
          <div className={styles.mainWrapper}>
            <div className={styles.content}>{children}</div>
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
