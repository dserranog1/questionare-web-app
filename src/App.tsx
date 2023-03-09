import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthRouter from "./routers/AuthRouter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthRouter />} />
    </Routes>
  );
}

export default App;
