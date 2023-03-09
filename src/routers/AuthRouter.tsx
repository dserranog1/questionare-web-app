import { Route, Routes, useNavigate } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import LoginPage from "../components/LoginPage";

const AuthRouter = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="absolute top-2 left-3 text-lg text-slate-600 hover:text-slate-800">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back to home
        </button>
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
