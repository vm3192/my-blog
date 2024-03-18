import { FC } from "react";
import styles from "@/ui/sidebarCard/index.module.scss";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: {
    _id: string;
    title: string;
    image?: string;
    createdAt: string;
  };
};

const SidebarCard: FC<Props> = ({ post }) => {
  const { _id, title, image, createdAt } = post;

  return (
    <Link className={styles.sidebarCard} href={`/${_id}`}>
      <div className={styles.sidebarCard_image}>
        <Image
          src={image ? image : "https://placehold.co/600x400.png?text=No+Image"}
          alt="Post title"
          fill
        />
      </div>
      <div className={styles.sidebarCard_info}>
        <h3 className={styles.sidebarCard_title}>{title}</h3>
        <div className={styles.sidebarCard_date}>{createdAt.toString().slice(4, 15)}</div>
      </div>
    </Link>
  );
};

export default SidebarCard;
