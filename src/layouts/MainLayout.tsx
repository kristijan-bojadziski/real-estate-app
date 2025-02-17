import { JSX } from "react";
// Components
import { Sidebar } from "components";

interface Props {
  children: JSX.Element;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-row relative">
      <Sidebar />
      {children}
    </div>
  );
};
