import React, { FC } from "react";
import styles from "@/app/(basicLayout)/profile/page.module.scss";
import AccountForm from "@/ui/accountForm";
import { auth } from "@/auth";
import { fetchAuthor } from "@/lib/data";

type Props = {};

const ProfilePage: FC<Props> = async (props) => {
  const session = await auth();
  const { username, image } = await fetchAuthor(session?.user?.email!);

  return (
    <div className={styles.formWrapper}>
      <AccountForm session={session} username={username} image={image} />
    </div>
  );
};

export default ProfilePage;
