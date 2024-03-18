"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type SearchContextProps = {
  isSearch: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

type SearchContextProviderProps = {
  children: ReactNode;
};

const SearchContextProvider: FC<SearchContextProviderProps> = ({
  children,
}) => {
  const [isSearch, setIsSearch] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ isSearch, setIsSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
