import { useEffect, useState } from "react";
// Store
import { useFiltersStore } from "store/filter.store";
// Hooks
import { useDebounce } from "hooks/useDebounce";
// Components
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
// Style
import style from "./Search.module.scss";

export const Search = () => {
  const { setSearch } = useFiltersStore();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  return (
    <IconField iconPosition="left" className="mt-4">
      <InputIcon className="pi pi-search"> </InputIcon>
      <InputText
        value={inputValue}
        placeholder="Search"
        className={style.search}
        onChange={e => setInputValue(e.target.value)}
      />
    </IconField>
  );
};
