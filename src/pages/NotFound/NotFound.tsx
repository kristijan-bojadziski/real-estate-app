import { useEffect } from "react";
import { useNavigate } from "react-router";
// Store
import { useAuthStore } from "store/auth.store";
// Components
import { Button } from "primereact/button";
// Icons
import { SmileyXEyes } from "@phosphor-icons/react";
// Styles
import style from "./NotFound.module.scss";

export const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={`${style.wrapper}`}>
      <div className={`${style.card} pt-4 pb-6 px-6 gap-3`}>
        <SmileyXEyes className={style.icon} size={96} weight="bold" />
        <h1 className={style.headline}>Page Not Found</h1>
        <p className={style.description}>The page you are looking for does not exist.</p>
        {!isAuthenticated && <Button className="mt-4" label="Go to Login" onClick={() => navigate("/login")} />}
      </div>
    </div>
  );
};
