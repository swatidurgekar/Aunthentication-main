import { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [idToken, setToken] = useState(null);
  const loginHandler = (id) => {
    setToken(id);
  };
  const logoutHandler = () => {
    setToken(null);
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
