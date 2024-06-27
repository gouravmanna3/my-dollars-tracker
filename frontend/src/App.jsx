import { useMemo, useState } from "react";
import Orb from "./components/Orb/orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import UserAuth from "./components/Login";
import PrivateRoutes from "./PrivateRoutes";

import "./App.scss";

function Home() {
  const [active, setActive] = useState(1);
  const { loading } = useSelector((state) => state.incomes);

  const orbMemo = useMemo(() => <Orb />);

  return (
    <div className="app-container">
      {orbMemo}
      <div className="main-container">
        <Navigation active={active} setActive={setActive} />

        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incomes" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
      </Route>
      <Route path="/login" element={<UserAuth />} />
    </Routes>
  );
};

export default App;
