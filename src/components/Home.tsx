import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-72">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl">👋 Bienvenido a Questionare!</p>
        <p className="text-xl">
          Questionare es aplicación diseñada para crear y contestar pregutnas
        </p>
      </div>
      <Link to="/auth/login">
        <button className="rounded-md bg-blue-medium-deep p-2 text-white hover:bg-blue-bright">
          Iniciar sesión
        </button>
      </Link>
    </div>
  );
};
export default Home;
