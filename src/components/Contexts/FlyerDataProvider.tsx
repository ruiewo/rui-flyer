import { PropsWithChildren, useState } from "react";

import { createContext } from "./createContext";

import { FlyerData } from "../Flyer/schema";
import { flyerData } from "../../assets/template/layout";

type FlyerDataContext = {
  data: FlyerData;
  setData: React.Dispatch<React.SetStateAction<FlyerData>>;
};

const [Provider, useContext] = createContext<FlyerDataContext>();

export const FlyerDataProvider = (props: PropsWithChildren) => {
  const [data, setData] = useState<FlyerData>(flyerData);

  return (
    <Provider
      value={{
        data,
        setData,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useFlyerData = useContext;
