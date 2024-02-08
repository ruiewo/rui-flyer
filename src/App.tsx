import { flyerData, layoutData } from "./assets/template/layout";
import { RuiFlyer } from "./RuiFlyer";

function App() {
  return <RuiFlyer layout={layoutData} data={flyerData} />;
}

export default App;
