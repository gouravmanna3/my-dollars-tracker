import { useMemo, useState, Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import Orb from "./components/Orb/orb";
import Navigation from "./components/Navigation/Navigation";
import LoaderSpinner from "./components/common/LoaderSpinner/LoaderSpinner";
import UserAuth from "./components/Login";
import PrivateRoutes from "./PrivateRoutes";

const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Income = lazy(() => import("./components/Income/Income"));
const Expenses = lazy(() => import("./components/Expenses/Expenses"));

import "./App.scss";
import { checkToken } from "./redux/authSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

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
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<>...</>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/incomes"
          element={
            <Suspense fallback={<LoaderSpinner />}>
              <Income />
            </Suspense>
          }
        />
        <Route
          path="/expenses"
          element={
            <Suspense fallback={<LoaderSpinner />}>
              <Expenses />
            </Suspense>
          }
        />
      </Route>
      <Route path="/login" element={<UserAuth />} />
    </Routes>
  );
};

export default App;
