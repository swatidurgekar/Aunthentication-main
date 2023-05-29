import { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const existToken = localStorage.getItem("token");
  const [idToken, setToken] = useState(existToken);

  const loginHandler = (id) => {
    setToken(id);
    localStorage.setItem("token", id);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const context = {
    idToken: idToken,
    isLoggedIn: !!idToken,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
  };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
