// Components
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
// Style
import style from "./Search.module.scss";

export const Search = () => {
  return (
    <IconField iconPosition="left" className="mt-4">
      <InputIcon className="pi pi-search"> </InputIcon>
      <InputText placeholder="Search" className={style.search} />
    </IconField>
  );
};
