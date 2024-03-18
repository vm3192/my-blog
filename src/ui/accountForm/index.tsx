"use client";

import { Session } from "next-auth";
import Image from "next/image";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "@/ui/accountForm/index.module.scss";
import Button from "../button";
import { updateUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { IoIosAdd } from "react-icons/io";
import { useEdgeStore } from "@/lib/edgestore";

type Props = {
  session: Session | null;
  username: string;
  image: string;
};

type imageTarget = {
  target: {
    files: FileList | null;
  };
};

const AccountForm: FC<Props> = ({ session, username, image }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState(username);
  const [avatar, setAvatar] = useState(image);
  const [state, formAction] = useFormState(updateUser, undefined);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
    } else {
      return;
    }
  }, [state]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleImage = async ({ target: { files } }: imageTarget) => {
    if (files) {
      const res = await edgestore.publicFiles.upload({
        file: files[0],
      });
      setAvatar(res.url);
    }
  };

  const handleImageClick = () => {
    imageRef?.current?.click();
  };

  return (
    <>
      {isEdit ? (
        <form className={styles.wrapper} action={formAction}>
          <div className={styles.imageWrapper} onClick={handleImageClick}>
            <input type="hidden" name="email" value={session?.user?.email!} />
            <input type="hidden" name="image" value={avatar} />
            <input
              type="file"
              onChange={handleImage}
              ref={imageRef}
              accept=".jpeg, .png"
            />
            <Image src={avatar} alt="avatar" fill />
            <IoIosAdd className={styles.editImage} />
          </div>
          <input
            className={styles.usernameInput}
            name="username"
            value={nickname}
            onChange={handleUsername}
            required
          />
          <div className={styles.buttonWrapper} onClick={handleEdit}>
            <Button text="Done" />
          </div>
          {state?.error && <p className={styles.error}>{state.error}</p>}
        </form>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <Image src={avatar} alt="avatar" fill />
          </div>
          <span className={styles.username}>{nickname}</span>
          <div className={styles.buttonWrapper} onClick={handleEdit}>
            <Button text="Edit" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;
