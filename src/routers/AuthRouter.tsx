import { Route, Routes, useNavigate } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import LoginPage from "../components/LoginPage";
import { Button } from "antd";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const AuthRouter = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="absolute top-2 left-3 text-lg text-slate-600 hover:text-slate-800">
        <Button
          className="flex flex-row items-center justify-center gap-3"
          type="text"
          onClick={() => {
            navigate("/");
          }}
        >
          <ChevronLeftIcon className="w-4" />
          Atras
        </Button>
      </div>
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
