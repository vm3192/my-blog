import { FC, ReactNode } from "react";
import styles from "@/ui/button/index.module.scss";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  text: string;
  link?: string;
};

const Button: FC<Props> = ({ children, text, link }) => {
  if (link) {

    return (
      <Link className={styles.button} href={link}>
        {children && (
          <span
            style={{
              marginRight: "5px",
              display: "flex",
              alignItems: "center",
            }}>
            {children}
          </span>
        )}
        {text}
      </Link>
    );

  } else {

    return (
      <button className={styles.button}>
        {children && (
          <span
            style={{
              marginRight: "5px",
              display: "flex",
              alignItems: "center",
            }}>
            {children}
          </span>
        )}
        {text}
      </button>
    );
    
  }
};

export default Button;
