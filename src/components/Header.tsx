import { FC } from "react";

interface Props {
  navButton?: JSX.Element;
  title?: string;
}

const Header: FC<Props> = ({ navButton, title }) => {
  return (
    <header className="absolute top-0 flex w-full flex-row items-center justify-between bg-cool-grey-800 py-3 px-4 text-8">
      <div>{navButton}</div>
      <h1 className="text-8 text-cool-grey-050">{title}</h1>
      <span className="font-pacifico text-cool-grey-200">Questionare</span>
    </header>
  );
};

export default Header;
