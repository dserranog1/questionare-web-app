import { Route, Routes } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import LoginPage from "../components/LoginPage";
import GoBackButton from "../components/GoBackButton";

const AuthRouter = () => {
  return (
    <div>
      <GoBackButton />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <NoMatch fallbackRoute="/auth/login" fallbackPageName="Login" />
          }
        />
      </Routes>
    </div>
  );
};

export default AuthRouter;
