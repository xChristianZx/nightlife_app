import React from 'react';
import styles from './RegisterForm.module.scss';
import { Link } from 'react-router-dom';

const RegisterForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    firstname,
    lastname,
    username,
    password,
  } = props;
  return (
    <div className={styles.wrapper}>
      <div className="ui container text raised segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <h3 className="ui header centered">Register</h3>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              value={firstname}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              value={lastname}
            />
          </div>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={username}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <a href="/">Back</a>
          <input className="ui button primary right floated" type="submit" />
        </form>
      </div>
      <div>
        Already a member?{` `}
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
