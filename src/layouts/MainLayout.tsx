import { JSX } from "react";
// Components
import { Header } from "components/Header/Header";

interface Props {
  children: JSX.Element;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-row relative">
      <Header />
      {children}
    </div>
  );
};
