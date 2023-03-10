import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-52 text-slate-700">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl">👋 Bienvenido a Questionare!</p>
        <p className="text-xl">
          Questionare es aplicación diseñada para crear y contestar pregutnas
        </p>
      </div>
      <Link to="/auth/login">
        <Button size="lg" colorScheme="blue">
          Comenzar
        </Button>
      </Link>
    </div>
  );
};
export default Home;
