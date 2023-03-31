import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  route: string;
  buttonText: string;
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
}

const ModuleCard: FC<Props> = ({
  title,
  description,
  route,
  buttonText,
  Icon,
}) => {
  return (
    <div className="flex flex-row gap-8">
      <Card variant="elevated" border="4px" borderColor="cool-grey-100">
        <CardHeader>
          <Heading size="md" className="flex flex-row items-center gap-6">
            <Icon className="w-6 fill-light-blue-vivid-300"></Icon>
            <span className="text-5 font-bold text-cool-grey-700">{title}</span>
          </Heading>
        </CardHeader>
        <CardBody>
          <Text textColor="cool-grey-500">{description}</Text>
        </CardBody>
        <CardFooter>
          <Link to={route}>
            <Button
              bgColor="light-blue-vivid-500"
              textColor="cool-grey-050"
              _hover={{ bgColor: "light-blue-vivid-800" }}
              variant="solid"
              min-w="full"
            >
              {buttonText}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ModuleCard;
