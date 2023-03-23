import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center gap-9">
        <div className="flex flex-col items-center gap-3">
          <p className="text-8 text-cool-grey-900">
            👋 Bienvenido a{" "}
            <span className="font-bold text-light-blue-vivid-600">
              Questionare
            </span>
          </p>
          <p className="text-5 text-cool-grey-700">
            Questionare es una aplicación diseñada para crear y contestar
            preguntas
          </p>
        </div>
        <Link to="/login">
          <Button
            size="lg"
            bgColor="light-blue-vivid-500"
            textColor="cool-grey-050"
            _hover={{ bgColor: "light-blue-vivid-800" }}
          >
            Comenzar
          </Button>
        </Link>
      </div>
    </>
  );
};
export default Home;
