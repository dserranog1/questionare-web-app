import { Link } from "react-router-dom";

const NoMatch = ({
  fallbackRoute = "/",
  fallbackPageName,
}: {
  fallbackRoute?: string;
  fallbackPageName: string;
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-blue-200 text-3xl">
      Sorry the site you were looking for is unavailable
      <Link to={fallbackRoute}>
        <button className="w-fit rounded-md border-2 border-blue-500 bg-slate-300 p-2 hover:bg-slate-100">
          Back to {fallbackPageName}
        </button>
      </Link>
    </div>
  );
};

export default NoMatch;
