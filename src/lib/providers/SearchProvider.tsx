"use client";

import { FC, ReactNode, useContext } from "react";
import { Be_Vietnam_Pro } from "next/font/google";
import { SearchContext } from "@/lib/context/SearchContext";

type Props = {
  children: ReactNode;
};

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const SearchProvider: FC<Props> = ({ children }) => {
  const { isSearch } = useContext(SearchContext)!;

  return (
    <body className={`${beVietnamPro.className} ${isSearch ? "noScroll" : ""}`}>
      {children}
    </body>
  );
};

export default SearchProvider;
