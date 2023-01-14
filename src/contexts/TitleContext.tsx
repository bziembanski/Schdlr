import React, { createContext, useContext, useState } from "react";

const TitleContext = createContext<
  [undefined | string, React.Dispatch<React.SetStateAction<undefined | string>>]
>([undefined, () => {}]);

export const useTitleContext = () => {
  const context = useContext(TitleContext);

  return context;
};

export const TitleContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const title = useState<string>();
  return (
    <TitleContext.Provider value={title}>{children}</TitleContext.Provider>
  );
};

export default TitleContext;
