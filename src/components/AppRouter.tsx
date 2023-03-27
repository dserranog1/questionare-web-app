import { Route, Routes } from "react-router-dom";
import { DisclosuresProvider } from "../providers/DisclosuresProvider";
import Auth from "./Auth";
import DashboardAddStudent from "./DashboardAddStudent";
import DashboardHome from "./DashboardHome";
import DashboardLayout from "./DashboardLayout";
import DashboardQuestionare from "./DashboardQuestionare";
import DashboardQuestions from "./DashboardQuestions";
import DashboardStudents from "./DashboardStudents";
import Home from "./Home";
import LoginLayout from "./LoginLayout";
import LoginPage from "./LoginPage";
import NoMatch from "./NoMatch";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<LoginLayout />}>
        <Route index element={<LoginPage />} />
        <Route
          path="*"
          element={<NoMatch fallbackRoute="" fallbackPageName="Login" />}
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <DisclosuresProvider>
            <DashboardLayout />
          </DisclosuresProvider>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route element={<Auth allowedRole="estudiante" />}>
          <Route path="questionare" element={<DashboardQuestionare />} />
        </Route>
        <Route element={<Auth allowedRole="administrador" />}>
          <Route path="questions">
            <Route index element={<DashboardQuestions />} />
          </Route>
          <Route path="students">
            <Route index element={<DashboardStudents />} />
            <Route path="add" element={<DashboardAddStudent />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<NoMatch fallbackRoute="" fallbackPageName="Dashboard" />}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
