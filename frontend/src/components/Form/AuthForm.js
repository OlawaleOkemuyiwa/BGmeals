import { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { authSliceActions } from "../../store/auth-slice";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { isLoading, sendRequest: sendAuthRequest } = useHttp();
  const dispatch = useDispatch();

  const {
    enteredValue: enteredName,
    valueIsValid: enteredNameIsValid,
    valueHasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    resetFunc: resetNameInput,
  } = useInput(
    value => value.trim() !== "" && isNaN(parseInt(value.trim(), 10))
  );

  const {
    enteredValue: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    valueHasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    resetFunc: resetEmailInput,
  } = useInput(value => value.includes("@babbangona.com"));

  const {
    enteredValue: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    valueHasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    resetFunc: resetPasswordInput,
  } = useInput(value => value.trim().length > 5);

  const toggleAuthModeHandler = useCallback(() => {
    setIsLogin(latestState => !latestState);
  }, [setIsLogin]);

  let formIsValid = false;
  if (isLogin) {
    if (enteredEmailIsValid && enteredPasswordIsValid) {
      formIsValid = true;
    }
  } else {
    if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
      formIsValid = true;
    }
  }

  const formSubmissionHandler = async event => {
    event.preventDefault();

    if (!formIsValid) return;

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();

    let url = isLogin ? "/api/users/login" : "/api/users/register";

    const config = {
      url: url,
      method: "POST",
      body: {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginData = await sendAuthRequest(config);

    if (loginData) {
      dispatch(authSliceActions.loginHandler(loginData));
      window.location.href = "/meals";
      //navigate("/meals") not working
    }

    //setup logout setTimeout using expiresIn(timeStamp)
  };

  const nameControlClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailControlClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  const passwordControlClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingIndicator />
        </div>
      )}
      <form onSubmit={formSubmissionHandler}>
        <h1 className="form-heading">{isLogin ? "Login" : "Sign Up"}</h1>
        {!isLogin && (
          <div className={nameControlClasses}>
            <label htmlFor="name">Enter Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
            />
            {nameInputHasError && (
              <p className="error-text">The name field is required.</p>
            )}
          </div>
        )}
        <div className={emailControlClasses}>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className="error-text">Please enter a valid email.</p>
          )}
        </div>
        <div className={passwordControlClasses}>
          <label htmlFor="password">Enter Password</label>
          <input
            type="text"
            id="password"
            value={enteredPassword}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <p className="error-text">
              Password must be more than 5 characters.
            </p>
          )}
        </div>
        <div className="form-actions">
          <button type="submit" className="actionBtn" disabled={!formIsValid}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <div className="cta">
            <p>{!isLogin ? "Already a user?" : "Don't have an account?"}</p>
            <button
              type="button"
              className="toggleBtn"
              onClick={toggleAuthModeHandler}
            >
              {isLogin ? "Register" : "Login with exisiting account"}
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default AuthForm;
