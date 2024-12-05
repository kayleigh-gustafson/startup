import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import getUserData from '../functions/getUserData';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";

export function Login({authenticated, userData, setUserData, setUserId, setAuthenticated}) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({username: "", email: "", password: "", confirm: "", loginEmail: "", loginPassword:""})
  const [valid, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailInputValid, setEmailInputValid] = useState(true);
  const [passwordInputValid, setPasswordInputValid] = useState(true);
  
  function updateLoginData(key, value, mode) {
    let data = {...loginData};
    data[key] = value;
    setLoginData(data);
    validateLogin(data, mode);
    // setValidation(validateLogin(data, mode))
  }
  async function validateLogin(data, mode) {
    let email = (mode==="login"?data.loginEmail:data.email);
    let emailValid = false;
    await fetch('https://www.disify.com/api/email/' + email)
          .then((response) => response.json())
          .then((data) => {
            emailValid = data.format;
          });
    if ((emailValid && mode === "login" && data.loginEmail !== "" && data.loginPassword !== "") || (emailValid && mode === "signup" && data.email !== "" && data.username !="" && data.password !== "" && data.password === data.confirm)) {
      setValidation(true);
      setEmailInputValid(true);
      setPasswordInputValid(true);
    } else {
      setValidation(false);
      if (mode === "signup") {
        setEmailInputValid(emailValid);
        setPasswordInputValid(data.password === data.confirm);
      }
    }
  }
  async function completeLogin(mode) {
    validateLogin(loginData, mode);
    setLoading(true);
    if (valid) {
      // let data = {...userData};
      // if (mode==="login") {
      //   data.username = loginData.loginEmail;
      // } else {
      //   data.username = loginData.email;
      // }
      let data = {};
      if (mode==="login"){
        data = {email: loginData.loginEmail, password: loginData.loginPassword};
      } else {
        data = {email: loginData.email, password: loginData.password, username: loginData.username}
      }
      const response = await fetch(`api/auth/${mode==="login"?"login":"create"}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response?.status === 200) {
        // localStorage.setItem('userName', userName);
        // props.onLogin(userName);
        // setUserData(getUserData(data.email));
        localStorage.setItem('userId', data.email);
        setUserId(data.email);
        setAuthenticated(true);
        navigate('/home');
        setLoading(false);
      } else {
        const body = await response.json();
        console.log(`⚠ Error: ${body.msg}`);
        setLoading(false);
      }

    }
  }


  function handleTabSelect(key) {
    setLoginData({username: "", email: "", password: "", confirm: "", loginEmail: "", loginPassword:""})
  }

  if (authenticated) {
    return(<Navigate to="/home" replace={true} />)
  } else {
  return (
    <>
      <Tabs
        defaultActiveKey="login"
        className="justify-content-center"
        id="optionTabs"
        onSelect={handleTabSelect}
      >
        <Tab eventKey="login" title="Log In">
          <form className="text-center login-tab-content">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="name@example.com"
                value={loginData.loginEmail}
                onChange={(event) => updateLoginData("loginEmail", event.target.value, "login")}
              />
              <label htmlFor="loginEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                value={loginData.loginPassword}
                onChange={(event) => updateLoginData("loginPassword", event.target.value, "login")}
                placeholder={12345}
              />
              <label htmlFor="loginPassword">Password</label>
            </div>
            <Button className="login-button" variant={valid ? "primary" : "secondary"} onClick={()=>completeLogin("login")}>
              {(loading && valid)?<i className="fa-solid fa-spinner fa-spin-pulse"></i>:"Continue"}
            </Button>
          </form>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <form className="text-center login-tab-content">
            <div className="form-floating mb-3">
              <input
                type="email"
                className={emailInputValid?"form-control":"form-control is-invalid"}
                id="signupEmail"
                placeholder="name@example.com"
                value={loginData.email}
                onChange={(event) => updateLoginData("email", event.target.value, "signup")}
              />
              <label htmlFor="signupEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="signupUser"
                placeholder="username123"
                value={loginData.username}
                onChange={(event) => updateLoginData("username", event.target.value, "signup")}
              />
              <label htmlFor="signupUser">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="signupPassword"
                placeholder={12345}
                value={loginData.password}
                onChange={(event) => updateLoginData("password", event.target.value, "signup")}
              />
              <label htmlFor="signupPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={passwordInputValid?"form-control":"form-control is-invalid"}
                id="signupPasswordConfirm"
                placeholder={12345}
                value={loginData.confirm}
                onChange={(event) => updateLoginData("confirm", event.target.value, "signup")}
              />
              <label htmlFor="signupPasswordConfirm">Confirm Password</label>
            </div>
            <Button className="login-button" variant={valid ? "primary" : "secondary"} onClick={()=>completeLogin("signup")}>
              {(loading && valid)?<i className="fa-solid fa-spinner fa-spin-pulse"></i>:"Continue"}
            </Button>
          </form>
        </Tab>
      </Tabs>
    </>
  );
  }
}