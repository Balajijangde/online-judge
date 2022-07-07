import { useNavigate } from "react-router-dom";
import { OJ_TOKEN_KEY } from "../common/constants";
import { useEffect } from "react";
import { useStoreActions } from "../hooks";

const LogoutComponent = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);

  const logout = () => {
    localStorage.removeItem(OJ_TOKEN_KEY);
    setIsLoggedIn(false);
    navigate("../", { replace: true });
  };
  useEffect(() => {
    logout();
  }, []);

  return <p>logging out</p>;
};
export default LogoutComponent;
