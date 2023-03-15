import { Route, Routes } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import LoginPage from "../components/LoginPage";
import GoBackButton from "../components/GoBackButton";

const LoginRouter = () => {
  return (
    <div>
      <GoBackButton to="/" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="*"
          element={<NoMatch fallbackRoute="/login" fallbackPageName="Login" />}
        />
      </Routes>
    </div>
  );
};

export default LoginRouter;
