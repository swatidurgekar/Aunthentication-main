import { createContext } from "react";

const Context = createContext({
  idToken: null,
  isLoggedIn: false,
  loginHandler: (id) => {},
  logoutHandler: () => {},
});

export default Context;
