import { ChakraProvider } from "@chakra-ui/react";

import { Sidebar } from "./components/Layout/Sidebar";

import { FlyerDataProvider } from "./components/Contexts/FlyerDataProvider";
import { FlyerLayoutProvider } from "./components/Contexts/FlyerLayoutProvider";
import { FlyerData, LayoutData } from "./components/Flyer/schema";

type RuiFlyerProps = {
  layout: LayoutData;
  data: FlyerData;
};

export const RuiFlyer = ({ layout, data }: RuiFlyerProps) => {
  return (
    <ChakraProvider>
      <FlyerLayoutProvider layout={layout}>
        <FlyerDataProvider data={data}>
          <Sidebar />
        </FlyerDataProvider>
      </FlyerLayoutProvider>
    </ChakraProvider>
  );
};
