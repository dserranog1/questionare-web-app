import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  fallbackRoute: string;
  fallbackPageName?: string;
}

const NoMatch: FC<Props> = ({ fallbackRoute = "/", fallbackPageName }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-3xl">
      Sorry the site you were looking for is unavailable
      <Link to={fallbackRoute}>
        <Button colorScheme="blue">Back to {fallbackPageName}</Button>
      </Link>
    </div>
  );
};

export default NoMatch;
