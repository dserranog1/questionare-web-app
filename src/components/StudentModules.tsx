import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

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
          <Button colorScheme="blue" variant="outline">
            Ir al Cuestionario
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentModules;
