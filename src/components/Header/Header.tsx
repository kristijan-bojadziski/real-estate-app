import { useLocation, useNavigate } from "react-router";
// Store
import { useAuthStore } from "store/auth.store";
//Components
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Filters } from "components/Filters/Filters";
import { Search } from "components/Search/Search";
// Icons
import { CaretLeft, SignOut } from "@phosphor-icons/react";
// Images
import logo from "assets/logo.svg";
//Styles
import style from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout, username } = useAuthStore();

  return (
    <div className={`p-4 ${style.toolbar}`}>
      <div>
        <div
          className="flex align-items-center justify-content-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Image src={logo} width="50" />
          <h2 className="m-0">Realtor</h2>
        </div>
        {pathname === "/" ? (
          <div className="flex flex-column gap-2">
            <Search />
            <Filters />
          </div>
        ) : (
          <Button
            className="mt-4 w-full justify-content-center"
            outlined
            severity="secondary"
            icon={<CaretLeft size={20} weight="bold" />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        )}
      </div>
      <div className={`${style.logout} flex flex-row justify-content-between align-items-center px-2`}>
        <div className="flex flex-row align-items-center gap-3">
          <Avatar icon="pi pi-user" shape="circle" className={style.avatar} />
          <p className={style.username}>{username}</p>
        </div>
        <Button
          tooltip="Logout"
          tooltipOptions={{ position: "top" }}
          icon={<SignOut size={24} weight="bold" />}
          rounded
          text
          onClick={logout}
        />
      </div>
    </div>
  );
};
