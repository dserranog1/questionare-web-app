import { Route, Routes } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import DashboardHome from "../components/DashboardHome";
import LogOutButton from "../components/LogOutButton";

const DashboardRouter = () => {
  return (
    <div>
      <LogOutButton />
      <Routes>
        <Route path="home" element={<DashboardHome />} />
        <Route
          path="*"
          element={
            <NoMatch
              fallbackRoute="/dashboard/home"
              fallbackPageName="Dashboard"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default DashboardRouter;
