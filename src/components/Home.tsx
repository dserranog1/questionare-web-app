import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-blue-200 text-3xl">
      You are in the home page!
      <Link to="/auth/login">
        <button className="w-fit rounded-md border-2 border-blue-500 bg-slate-300 p-2 hover:bg-slate-100">
          Go to Login
        </button>
      </Link>
    </div>
  );
};
export default Home;
