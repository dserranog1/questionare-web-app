import { Route, Routes } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import GoBackButton from "../components/GoBackButton";
import DashboardHome from "../components/DashboardHome";

const AuthRouter = () => {
  return (
    <div>
      <GoBackButton />
      <Routes>
        <Route path="home" element={<DashboardHome />} />
        <Route
          path="*"
          element={
            <NoMatch fallbackRoute="/dashboard/home" fallbackPageName="Home" />
          }
        />
      </Routes>
    </div>
  );
};

export default AuthRouter;
