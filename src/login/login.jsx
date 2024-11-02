import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export function Login({userData, setUserData}) {
  const [loginData, setLoginData] = useState({username: "", email: "", password: "", confirm: "", loginEmail: "", loginPassword:""})
  const [valid, setValidation] = useState(false);
  
  function updateLoginData(key, value, mode) {
    let data = {...loginData};
    data[key] = value;
    setLoginData(data);
    setValidation(validateLogin(data, mode))
  }
  function validateLogin(data, mode) {
    console.log(data);
    if ((mode === "login" && data.loginEmail !== "" && data.loginPassword !== "") || (mode === "signup" && data.email !== "" && data.username !="" && data.password !== "" && data.password === data.confirm)) {
      return true;
    } else {
      return false;
    }
  }
  function completeLogin() {
    if (valid) {
      let data = {...userData};
      data.username = loginData.email;
      setUserData(data);
    }
  }
  function handleTabSelect(key) {
    setLoginData({username: "", email: "", password: "", confirm: "", loginEmail: "", loginPassword:""})
  }
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
            <Link to={valid ? "home" : ""} className={valid ? "btn btn-primary" : "btn btn-secondary"} onClick={completeLogin}>
              Continue
            </Link>
          </form>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <form className="text-center login-tab-content">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
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
                className="form-control"
                id="signupPasswordConfirm"
                placeholder={12345}
                value={loginData.confirm}
                onChange={(event) => updateLoginData("confirm", event.target.value, "signup")}
              />
              <label htmlFor="signupPasswordConfirm">Confirm Password</label>
            </div>
            <Link to={valid ? "home" : ""} className={valid ? "btn btn-primary" : "btn btn-secondary"} onClick={completeLogin}>
              Continue
            </Link>
          </form>
        </Tab>
      </Tabs>
    </>
  );
}