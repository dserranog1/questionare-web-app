import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthRouter from "./routers/AuthRouter";

function App() {
  return (
    <div className="flex h-full min-h-screen flex-col justify-center bg-slate-100 font-roboto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </div>
  );
}

export default App;
