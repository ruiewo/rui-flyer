import { PropsWithChildren, useState } from "react";

import { createContext } from "./createContext";

import { FlyerData } from "../Flyer/schema";

type FlyerDataContext = {
  data: FlyerData;
  setData: React.Dispatch<React.SetStateAction<FlyerData>>;
};

const [Provider, useContext] = createContext<FlyerDataContext>();

export const FlyerDataProvider = ({
  data: flyerData,
  children,
}: PropsWithChildren & { data: FlyerData }) => {
  const [data, setData] = useState<FlyerData>(flyerData);

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
