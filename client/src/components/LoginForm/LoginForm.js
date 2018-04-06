import React from "react";
import styles from "./LoginForm.css";

const LoginForm = props => {
  const { handleChange, handleSubmit } = props;
  return (
    <div className={styles.wrapper}>
      <div className="ui container text raised segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <h3 className="ui header centered">Log In</h3>
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <a href="/">Back</a>
          <input className="ui button primary right floated" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
