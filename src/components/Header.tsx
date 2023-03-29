import { FC, PropsWithChildren } from "react";

interface Props {
  navButton?: JSX.Element;
  title?: string;
}

const Header: FC<PropsWithChildren<Props>> = ({
  navButton,
  title,
  children,
}) => {
  return (
    <header className="flex w-full flex-row justify-between bg-cool-grey-800 py-3 px-4 text-8">
      <div>{navButton}</div>
      {children}
      <h1 className="text-8 text-cool-grey-050">{title}</h1>
      <span className="font-pacifico text-cool-grey-200">Questionare</span>
    </header>
  );
};

export default Header;
