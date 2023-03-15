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

const StudentModules = () => {
  return (
    <div className="flex flex-row gap-8">
      <Card variant="elevated" border="2px">
        <CardHeader>
          <Heading size="md">Cuestionario</Heading>
        </CardHeader>
        <CardBody>
          <Text>Realizar el cuestionario disponible</Text>
        </CardBody>
        <CardFooter>
          <Link to="/dashboard/questionare">
            <Button colorScheme="blue" variant="outline">
              Ir al Cuestionario
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentModules;
