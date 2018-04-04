import React from "react";
import styles from "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <h2>uNight</h2>
          </Link>
        </div>
        <ul className={styles.routesContainer}>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
