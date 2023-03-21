import { Route, Routes } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import LoginPage from "../components/LoginPage";
import GoBackButton from "../components/GoBackButton";
import Header from "../components/Header";

const LoginRouter = () => {
  return (
    <div>
      <Header navButton={<GoBackButton to="/" />}></Header>
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
