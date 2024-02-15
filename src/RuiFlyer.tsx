import { ChakraProvider } from "@chakra-ui/react";

import { Sidebar } from "./components/Layout/Sidebar";

import { FlyerDataProvider } from "./components/Contexts/FlyerDataProvider";
import { FlyerLayoutProvider } from "./components/Contexts/FlyerLayoutProvider";
import { Content, Layout } from "./components/Flyer/schema";

type RuiFlyerProps = {
  layout: Layout;
  data: Content;
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
