"use client";

import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import styles from "@/ui/search/index.module.scss";
import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "../button";
import { SearchContext } from "@/lib/context/SearchContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

const Seacrh: FC<Props> = () => {
  const { isSearch, setIsSearch } = useContext(SearchContext)!;
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSearch(!isSearch);
    } else if (event.key === "Enter") {
      replace(`${pathname}?${params}`);
    }
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 1) {
      params.set("q", event.target.value);
    } else {
      params.delete("q");
    }
  };

  const goSearch = (event: any) => {
    event.preventDefault();
    replace(`${pathname}?${params}`);
    setIsSearch(!isSearch);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  return (
    <form className={`${styles.search} ${isSearch ? styles.active : ""}`}>
      <div
        className={`${styles.background} ${isSearch ? styles.active : null}`}
        onClick={handleSearch}></div>
      <div className={styles.box}>
        <p className={styles.paragraph}>Press ESC to close</p>
        <div className={styles.searchRow}>
          <input
            className={styles.input}
            type="search"
            placeholder="Type post's title"
            onKeyDown={handleKeyPress}
            ref={inputRef}
            onChange={handleSearchInput}
          />
          <div onClick={goSearch}>
            <Button text="Search">
              <IoIosSearch color={"#fff"} />
            </Button>
          </div>
        </div>
        <IoIosCloseCircle
          className={styles.closeIcon}
          size={50}
          color={"#002050"}
          onClick={handleSearch}
        />
      </div>
    </form>
  );
};

export default Seacrh;
