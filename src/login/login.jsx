import React from 'react';
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export function Login() {
  return (
    <>
      <Tabs
        defaultActiveKey="login"
        className="justify-content-center"
        id="optionTabs"
      >
        <Tab eventKey="login" title="Log In">
          <form className="text-center login-tab-content">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="name@example.com"
              />
              <label htmlFor="loginEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder={12345}
              />
              <label htmlFor="loginPassword">Password</label>
            </div>
            <Link to="home" className="btn btn-primary">
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
              />
              <label htmlFor="signupEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="signupUser"
                placeholder="username123"
              />
              <label htmlFor="signupUser">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="signupPassword"
                placeholder={12345}
              />
              <label htmlFor="signupPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="signupPasswordConfirm"
                placeholder={12345}
              />
              <label htmlFor="signupPasswordConfirm">Confirm Password</label>
            </div>
            <Link to="home" className="btn btn-primary">
              Continue
            </Link>
          </form>
        </Tab>
      </Tabs>
    </>
  );
}