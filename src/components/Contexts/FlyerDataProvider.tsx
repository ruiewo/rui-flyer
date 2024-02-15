import { PropsWithChildren, useState } from "react";

import { createContext } from "./createContext";

import { Content } from "../Flyer/schema";

type FlyerDataContext = {
  data: Content;
  setData: React.Dispatch<React.SetStateAction<Content>>;
};

const [Provider, useContext] = createContext<FlyerDataContext>();

export const FlyerDataProvider = ({
  data: flyerData,
  children,
}: PropsWithChildren & { data: Content }) => {
  const [data, setData] = useState<Content>(flyerData);

  return (
    <Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </Provider>
  );
};

export const useFlyerData = useContext;
