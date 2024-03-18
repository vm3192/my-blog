"use client";

import { FC } from "react";
import styles from "@/app/login/page.module.scss";
import Button from "@/ui/button";
import { useFormState } from "react-dom";
import { register } from "@/lib/actions";
import Link from "next/link";

type Props = {};

const RegisterPage: FC<Props> = () => {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} action={dispatch}>
        <h2 className={styles.loginTitle}>Registration</h2>
        <input
          className={styles.loginInput}
          name="username"
          type="text"
          placeholder="Username"
          required
        />
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
        <Button text="Create" />
        {errorMessage && <p className={styles.error}>{errorMessage.error}</p>}
        <div className={styles.createNewOne}>
          <Link href="/login">Login with existing account</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
