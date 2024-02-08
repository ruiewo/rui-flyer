import { PropsWithChildren, useState } from "react";

import { createContext } from "./createContext";

import { LayoutData } from "../Flyer/schema";

type LayoutContext = {
  layout: LayoutData;
  setLayout: (header: LayoutData) => void;
};

const [Provider, useContext] = createContext<LayoutContext>();

export const FlyerLayoutProvider = ({
  layout: layoutData,
  children,
}: PropsWithChildren & { layout: LayoutData }) => {
  const [layout, setLayout] = useState<LayoutData>(layoutData);

  return (
    <Provider
      value={{
        layout,
        setLayout,
      }}
    >
      {children}
    </Provider>
  );
};

export const useLayout = useContext;
