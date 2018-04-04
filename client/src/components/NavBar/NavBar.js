import React from "react";
import styles from "./NavBar.css";

const NavBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <h2>uNight</h2>
        </div>
        <ul className={styles.routesContainer}>
          <li>
            <a>Login</a>
          </li>
          <li>
            <a>Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
