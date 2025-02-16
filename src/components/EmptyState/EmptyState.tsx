// Icons
import { Eyes } from "@phosphor-icons/react";
// Styles
import style from "./EmptyState.module.scss";

export const EmptyState = () => {
  return (
    <div className="flex flex-column align-items-center justify-content-center w-full">
      <div className="flex flex-row align-items-center justify-content-center w-full">
        <Eyes size={80} weight="bold" className={style.icon} />
        <h1 className={`${style.headline} m-0`}>Nothing found</h1>
      </div>
      <p className={`${style.description} m-0`}>Please try different search or filter</p>
    </div>
  );
};
