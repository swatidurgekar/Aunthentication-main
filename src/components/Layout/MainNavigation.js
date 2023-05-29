import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import Context from "../Store/Context";

const MainNavigation = () => {
  const ctx = useContext(Context);
  const logoutHandler = () => {
    ctx.logoutHandler();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!ctx.isLoggedIn && <Link to="/auth">Login</Link>}</li>
          <li>{ctx.isLoggedIn && <Link to="/profile">Profile</Link>}</li>
          <li>
            {ctx.isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
