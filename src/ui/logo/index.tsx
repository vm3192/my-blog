import { FC } from "react";
import styles from "@/ui/logo/index.module.scss";
import Link from "next/link";

type Props = {};

const Logo: FC = () => {
  return (
    <Link className={styles.logo} href="/">
      MyBlog
    </Link>
  );
};

export default Logo;
