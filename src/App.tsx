import { ChakraProvider } from "@chakra-ui/react";

import { Sidebar } from "./components/Layout/Sidebar";

import { FlyerDataProvider } from "./components/Contexts/FlyerDataProvider";
import { FlyerLayoutProvider } from "./components/Contexts/FlyerLayoutProvider";

function App() {
  return (
    <ChakraProvider>
      <FlyerLayoutProvider>
        <FlyerDataProvider>
          <Sidebar />
        </FlyerDataProvider>
      </FlyerLayoutProvider>
    </ChakraProvider>
  );
}

export default App;
