import type { Metadata } from "next";
import "@/app/globals.scss";
import { FC, ReactNode } from "react";
import SearchProvider from "@/lib/providers/SearchProvider";
import { SearchContextProvider } from "@/lib/context/SearchContext";
import { EdgeStoreProvider } from "@/lib/edgestore";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "My Blog",
  description: "My blog pet project",
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <SearchContextProvider>
        <SearchProvider>
          <EdgeStoreProvider>
          {children}
          </EdgeStoreProvider>
        </SearchProvider>
      </SearchContextProvider>
    </html>
  );
};

export default RootLayout;
