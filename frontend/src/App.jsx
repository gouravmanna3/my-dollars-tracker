import { useMemo, useState } from "react";
import Orb from "./components/Orb/orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import UserAuth from "./components/Login";

import "./App.scss";

function Home() {
  const [active, setActive] = useState(1);
  const { loading } = useSelector((state) => state.incomes);

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserAuth />} />
    </Routes>
  );
};

export default App;
