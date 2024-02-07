import { PropsWithChildren, useState } from "react";

import { createContext } from "./createContext";

import { LayoutData } from "../Flyer/schema";
import { layoutData } from "../../assets/template/layout";

type LayoutContext = {
  layout: LayoutData;
  setLayout: (header: LayoutData) => void;
};

const [Provider, useContext] = createContext<LayoutContext>();

export const FlyerLayoutProvider = (props: PropsWithChildren) => {
  const [layout, setLayout] = useState<LayoutData>(layoutData);

  return (
    <Provider
      value={{
        layout,
        setLayout,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useLayout = useContext;
