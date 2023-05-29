import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import Context from "../Store/Context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);
  const [loader, setLoader] = useState(false);

  const ctx = useContext(Context);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    //add validation

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlZyDYZo4QLVRkyBpqcRzuhBHMvTFQFgQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            ctx.loginHandler(data.idToken);

            history.replace("/profile");
            setLoader(false);
          });
        } else {
          res.json().then((data) => {
            alert(data.error.message);
            setLoader(false);
          });
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlZyDYZo4QLVRkyBpqcRzuhBHMvTFQFgQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
        } else {
          res.json().then((data) => {
            alert(data.error.message);
            setLoader(false);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {loader && <p>Sending request...</p>}
        <div className={classes.actions}>
          <Link to="/profile">
            <button onClick={submitHandler}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          </Link>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
