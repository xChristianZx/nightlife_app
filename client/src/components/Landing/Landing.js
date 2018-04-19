import React from "react";
import styles from "./Landing.css";
import Search from "../../containers/Search/Search";
const Landing = () => {
  return (
    <div className={styles.hero_wrapper}>
      <div className={styles.hero_container} >
        <h1>Where are you going tonight?</h1>
        <Search />
      </div>
    </div>
  );
};

export default Landing;
