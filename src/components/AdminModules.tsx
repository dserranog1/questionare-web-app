import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AdminModules = () => {
  return (
    <div className="flex flex-row gap-8">
      <Card variant="elevated" border="2px">
        <CardHeader>
          <Heading size="md"> Estudiantes</Heading>
        </CardHeader>
        <CardBody>
          <Text>Crear, editar o eliminar estudiantes del sistema</Text>
        </CardBody>
        <CardFooter>
          <Link to="/dashboard/students">
            <Button colorScheme="blue" variant="outline">
              Ir a estudiantes
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card variant="elevated" border="2px">
        <CardHeader>
          <Heading size="md"> Preguntas</Heading>
        </CardHeader>
        <CardBody>
          <Text>Crear, editar o eliminar preguntas del sistema</Text>
        </CardBody>
        <CardFooter>
          <Link to="/dashboard/questions">
            <Button colorScheme="blue" variant="outline">
              Ir a preguntas
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminModules;
