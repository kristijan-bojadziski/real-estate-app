import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
// Stores
import { useAuthStore } from "store/auth.store";
import { usePropertiesStore } from "store/properties.store";
//Components
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ActionButtons, Filters, PropertyForm, Search } from "components";
// Icons
import { CaretLeft, Plus, SignOut } from "@phosphor-icons/react";
// Images
import logo from "assets/logo.svg";
//Styles
import style from "./Sidebar.module.scss";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout, username } = useAuthStore();
  const isDetailsPage = pathname === "/";
  const [open, setOpen] = useState(false);
  const addProperty = usePropertiesStore(state => state.addProperty);

  return (
    <div className={`pt-4 px-4 pb-2 ${style.toolbar}`}>
      <div>
        <div
          className="flex align-items-center justify-content-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Image src={logo} width="50" />
          <h2 className="m-0">Realtor</h2>
        </div>
        {isDetailsPage ? (
          <div className="flex flex-column gap-2">
            <Search />
            <Button
              className="mt-2 w-full justify-content-center"
              outlined
              severity="info"
              icon={<Plus size={20} weight="bold" />}
              onClick={() => setOpen(true)}
            >
              Add new
            </Button>
            <Filters />
          </div>
        ) : (
          <div>
            <Button
              className="mt-4 w-full justify-content-center"
              outlined
              severity="secondary"
              icon={<CaretLeft size={20} weight="bold" />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <ActionButtons />
          </div>
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
      <Dialog
        header="Add property"
        visible={open}
        position="bottom"
        style={{ width: "50vw" }}
        onHide={() => setOpen(false)}
        draggable={false}
        resizable={false}
      >
        <PropertyForm
          onSubmit={data => {
            addProperty(data);
            setOpen(false);
          }}
        />
      </Dialog>
    </div>
  );
};
