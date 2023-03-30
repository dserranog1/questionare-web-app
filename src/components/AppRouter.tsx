import { Route, Routes } from "react-router-dom";
import { DisclosuresProvider } from "../providers/DisclosuresProvider";
import Auth from "./Auth";
import DashboardAddQuestion from "./DashboardAddQuestion";
import DashboardAddStudent from "./DashboardAddStudent";
import DashboardEditQuestion from "./DashboardEditQuestion";
import DashboardEditStudent from "./DashboardEditStudent";
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
            <Route path="add" element={<DashboardAddQuestion />} />
            <Route path=":questionId" element={<DashboardQuestions />} />
            <Route
              path=":questionId/edit"
              element={<DashboardEditQuestion />}
            />
          </Route>
          <Route path="students">
            <Route index element={<DashboardStudents />} />
            <Route path="add" element={<DashboardAddStudent />} />
            <Route path=":studentId" element={<DashboardStudents />} />
            <Route path=":studentId/edit" element={<DashboardEditStudent />} />
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
