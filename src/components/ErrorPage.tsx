import { ClientResponseError } from "pocketbase";
import { FC } from "react";

interface Props {
  error: unknown;
}

const ErrorPage: FC<Props> = ({ error }) => {
  return (
    <div className="mx-9 mb-6 flex flex-1 flex-col items-center justify-center text-10">
      {error instanceof ClientResponseError ? (
        <p>{error.status}</p>
      ) : (
        <p>Error desconocido</p>
      )}
    </div>
  );
};

export default ErrorPage;
