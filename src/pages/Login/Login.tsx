import { useState } from "react";
import { useNavigate } from "react-router";
// Stores
import { useAuthStore } from "store/auth.store";
import { usePropertiesStore } from "store/properties.store";
// Api
import { getProperties } from "api/api";
// Components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Image } from "primereact/image";
// Images
import logo from "assets/logo.svg";
// Styles
import style from "./Login.module.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const setProperties = usePropertiesStore(state => state.setProperties);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (login(username, password)) {
        const properties = await getProperties();
        setProperties(properties);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${style.wrapper} flex flex-row align-items-center justify-content-center h-full`}>
      <div className={`${style.card} pt-4 pb-6 px-6 gap-3`}>
        <div className="flex align-items-center justify-content-center gap-2 pb-4">
          <Image src={logo} width="50" />
          <h2 className="m-0">Realtor</h2>
        </div>
        <InputText
          placeholder="Username"
          className="w-full"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Password
          placeholder="Password"
          className={style.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
          feedback={false}
        />
        <Button className="justify-content-center mt-6" onClick={handleLogin} loading={isLoading}>
          Login
        </Button>
      </div>
    </div>
  );
};
