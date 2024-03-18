"use client";

import { FC } from "react";
import styles from "@/app/login/page.module.scss";
import Button from "@/ui/button";
import { useFormState } from "react-dom";
import { authenticate } from "@/lib/actions";
import Link from "next/link";

type Props = {};

const LoginPage: FC<Props> = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} action={dispatch}>
        <h2 className={styles.loginTitle}>LogIn</h2>
        <input
          className={styles.loginInput}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className={styles.loginInput}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button text="LogIn" />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.createNewOne}>
          <Link href="/register">Create new user</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
