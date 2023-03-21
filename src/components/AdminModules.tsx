import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { QuestionMarkCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const AdminModules = () => {
  return (
    <div className="flex flex-row gap-8">
      <Card variant="elevated" border="4px" borderColor="cool-grey-100">
        <CardHeader>
          <Heading size="md" className="flex flex-row items-center gap-6">
            <UserIcon className="w-6 fill-light-blue-vivid-300"></UserIcon>
            <span className="text-5 font-bold text-cool-grey-700">
              Estudiantes
            </span>
          </Heading>
        </CardHeader>
        <CardBody>
          <Text textColor="cool-grey-500">
            Crear, editar o eliminar estudiantes del sistema
          </Text>
        </CardBody>
        <CardFooter>
          <Link to="/dashboard/students">
            <Button
              bgColor="light-blue-vivid-500"
              textColor="cool-grey-050"
              _hover={{ bgColor: "light-blue-vivid-800" }}
              variant="solid"
              min-w="full"
            >
              Ir a estudiantes
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card variant="elevated" border="4px" borderColor="cool-grey-100">
        <CardHeader>
          <Heading size="md" className="flex flex-row items-center gap-6">
            <QuestionMarkCircleIcon className="w-6 fill-light-blue-vivid-400"></QuestionMarkCircleIcon>
            <span className="text-5 font-bold text-cool-grey-700">
              Preguntas
            </span>
          </Heading>
        </CardHeader>
        <CardBody>
          <Text textColor="cool-grey-500">
            Crear, editar o eliminar preguntas del sistema
          </Text>
        </CardBody>
        <CardFooter>
          <Link to="/dashboard/questions">
            <Button
              bgColor="light-blue-vivid-500"
              textColor="cool-grey-050"
              _hover={{ bgColor: "light-blue-vivid-800" }}
              variant="solid"
              min-w="full"
            >
              Ir a preguntas
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminModules;
