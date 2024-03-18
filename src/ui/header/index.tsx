"use client";

import { FC, useContext, useState } from "react";
import styles from "@/ui/header/index.module.scss";
import Link from "next/link";
import Button from "@/ui/button";
import { TbLogin2 } from "react-icons/tb";
import Logo from "@/ui//logo";
import Seacrh from "@/ui/search";
import { SearchContext } from "@/lib/context/SearchContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import LogoutButton from "@/ui/logoutButton";
import Image from "next/image";

type Props = {
  avatar: string | null;
};

const Header: FC<Props> = ({ avatar }) => {
  const { isSearch, setIsSearch } = useContext(SearchContext)!;
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  const handleSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleBurgerClick = () => {
    setIsBurgerMenu(!isBurgerMenu);
  };

  const handleBurgerSearch = () => {
    setIsSearch(!isSearch);
    setIsBurgerMenu(!isBurgerMenu);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <Logo />
          <ul className={styles.navList}>
            <li className={styles.navList_item}>
              <Link className={styles.navList_link} href="/">
                Home
              </Link>
            </li>
            {avatar && (
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
            <li className={styles.navList_item}>
              <Link
                className={styles.navList_link}
                href="/search"
                onClick={handleSearch}>
                Search
              </Link>
            </li>
          </ul>
          <div className={styles.loginButton}>
            {avatar ? (
              <>
                <div className={styles.avatar}>
                  <Image src={avatar} alt="avatar" fill />
                </div>
                <LogoutButton />
              </>
            ) : (
              <Button text="LogIn" link="/login">
                <TbLogin2 />
              </Button>
            )}
          </div>
          <GiHamburgerMenu
            className={styles.burgerIcon}
            size={25}
            onClick={handleBurgerClick}
          />
        </div>
      </div>
      <Seacrh />
      <div
        className={`${styles.burgerMenu} ${isBurgerMenu ? styles.active : ""}`}
        onClick={handleBurgerClick}>
        <Link
          className={styles.navList_link}
          href="/"
          onClick={handleBurgerClick}>
          Home
        </Link>
        {avatar && (
          <>
            <Link
              className={styles.navList_link}
              href="/profile"
              onClick={handleBurgerClick}>
              Profile
            </Link>
            <Link
              className={styles.navList_link}
              href="/newpost"
              onClick={handleBurgerClick}>
              New Post
            </Link>
          </>
        )}
        <Link
          className={styles.navList_link}
          href="/search"
          onClick={handleBurgerSearch}>
          Search
        </Link>
        <div className={styles.loginInBurger}>
          {avatar ? (
            <LogoutButton />
          ) : (
            <Button text="LogIn" link="/login">
              <TbLogin2 />
            </Button>
          )}
        </div>
        <IoCloseSharp
          className={styles.burgerCloseIcon}
          size={25}
          onClick={handleBurgerClick}
        />
      </div>
    </header>
  );
};

export default Header;
