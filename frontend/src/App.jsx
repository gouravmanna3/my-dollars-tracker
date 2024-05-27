import { useMemo, useState } from "react";
import Orb from "./components/Orb/orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";

import "./App.scss";

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();

  const orbMemo = useMemo(() => <Orb />);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="app-container">
      {orbMemo}
      <div className="main-container">
        <Navigation active={active} setActive={setActive} />
        <main className="content-container">{displayData()}</main>
      </div>
    </div>
  );
}

export default App;
