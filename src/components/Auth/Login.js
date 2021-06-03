import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoginJsx from "./LoginJsx";
import { SERVER_URL } from "../../config/variables";

const Login = (props) => {
  //   let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const emailHandler = (e) => {
    let email = e.target.value;
    setEmail(email);
    // validateEmail();
  };
  const passwordHandler = (e) => {
    let password = e.target.value;

    // validatePassword();
    setPassword(password);
  };
  const validateEmail = () => {
    let emailErrorText = "";
    if (!email) {
      emailErrorText = "Email is required!";
      return setEmailError(emailErrorText);
    }
    if (email) {
      let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      emailErrorText = emailValid ? "" : "Email is format is incorrect!";
      return setEmailError(emailErrorText);
    }
  };
  const validatePassword = () => {
    let passwordErrorText = "";
    if (!password) {
      passwordErrorText = "Password is required!";
    }
    if ((password && password.length < 6) || password.length > 8) {
      passwordErrorText = "Password must be 6-8 characters long.";
    }
    if (passwordErrorText) {
      setPasswordError(passwordErrorText);
    } else {
      setPasswordError("");
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (!validateForm()) {
      return;
    }

    loginApi(email, password)
      .then((res) => {
        if (res.data.user.isLoggedIn) {
          let expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);
          let user = res.data.user;
          user["expirationTime"] = expirationTime;

          localStorage.setItem("credentials", JSON.stringify(user));

          // props.history.push("/");
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data) {
          setError(error.response.data.message);

          // this.props.history.push("/login");
        }
      });
    setIsLoginLoading(false);
  };
  const validateForm = () => {
    validateEmail();
    validatePassword();
    if (!email || !password || emailError || passwordError) {
      return false;
    }
    return true;
  };
  const loginApi = async (email, password) => {
    setIsLoginLoading(true);
    const response = await axios({
      method: "POST",
      url: SERVER_URL + "/authenticate",
      data: { email, password },
      responseType: "json",
    });
    return response;
  };

  return (
    <LoginJsx
      email={email}
      password={password}
      error={error}
      emailHandler={emailHandler}
      passwordHandler={passwordHandler}
      formHandler={formHandler}
      emailError={emailError}
      passwordError={passwordError}
      isLoginLoading={isLoginLoading}
    />
  );
};

export default withRouter(Login);
