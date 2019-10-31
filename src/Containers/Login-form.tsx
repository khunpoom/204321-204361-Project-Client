import React from "react";
import { connect } from "react-redux";
import { loggingIn } from "../Service/login-service";

const LoginForm = ({ dispatch }) => {
  let username;
  let password;

  return (
    
    <form
      
      onSubmit={e => {
        e.preventDefault();
        if (!(username.value.trim() && password.value.trim())) {
          return;
        }
        dispatch(loggingIn(username.value.trim(), password.value.trim()));
        password.value = "";
      }}
    >
  
   
    

      
    
    
    
    <body>
      
    <label className="LOGO">Plan.G</label>
    <div className="loginbox">
      <div className="field">
        <label className="label">ID</label>
        <div className="control">
          <input
            className="input"
            type="username"
            name="username"
            ref={node => (username = node)}
          />
        </div>
      </div>
    

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            ref={node => (password = node)}
          />
        </div>
      </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="buttonis-link">
            Login
          </button>
        </div>
      </div>
    </body>
    
    </form>
  );
};

export default connect()(LoginForm);