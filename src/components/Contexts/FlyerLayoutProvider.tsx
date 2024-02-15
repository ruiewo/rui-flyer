import { PropsWithChildren, useState } from "react";

import { createContext } from "./createContext";

import { Layout } from "../Flyer/schema";

type LayoutContext = {
  layout: Layout;
  setLayout: (header: Layout) => void;
};

const [Provider, useContext] = createContext<LayoutContext>();

export const FlyerLayoutProvider = ({
  layout: layoutData,
  children,
}: PropsWithChildren & { layout: Layout }) => {
  const [layout, setLayout] = useState<Layout>(layoutData);

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
