"use client";

import React, { FC } from "react";
import styles from "@/ui/pagination/index.module.scss";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  count: number;
};

const Pagination: FC<Props> = ({ count }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = searchParams.get("page") || "1";
  const POSTS_PER_PAGE = 5;

  const params = new URLSearchParams(searchParams);

  const hasPrevious = POSTS_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext =
    POSTS_PER_PAGE * (parseInt(page) - 1) + POSTS_PER_PAGE < count;

  const pagesCount = Math.ceil(count / POSTS_PER_PAGE);
  const pages: string[] = Array.from({ length: pagesCount }, (_, index) =>
    (index + 1).toString(),
  );

  const handleClick = (action: string) => {
    action === "Previous"
      ? params.set("page", (parseInt(page) - 1).toString())
      : params.set("page", (parseInt(page) + 1).toString());
    replace(`${pathname}?${params}`);
  };

  const handlePageClick = (pageNumber: string) => {
    params.set("page", pageNumber);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.previous}
        disabled={!hasPrevious}
        onClick={() => handleClick("Previous")}>
        <GrFormPrevious size={20} />
      </button>
      <ul className={styles.pagesList}>
        {pages.map((pageNumber, index) => (
          <li
            key={`key ${index}`}
            className={`${styles.pageNumber} ${
              page === pageNumber ? styles.active : ""
            }`}
            onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </li>
        ))}
      </ul>
      <button
        className={styles.next}
        disabled={!hasNext}
        onClick={() => handleClick("Next")}>
        <GrFormNext size={20} />
      </button>
    </div>
  );
};

export default Pagination;
