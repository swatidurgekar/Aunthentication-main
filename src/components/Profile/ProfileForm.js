import Context from "../Store/Context";
import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(Context);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAlZyDYZo4QLVRkyBpqcRzuhBHMvTFQFgQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.idToken,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {});
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
