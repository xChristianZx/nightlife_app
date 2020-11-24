import React from 'react';
import styles from './LogOut.module.scss';
import { Link } from 'react-router-dom';

const LogOut = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3>You are now logged out</h3>
      </div>
      <div className={styles.container}>
        Return to {`  `}
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default LogOut;
