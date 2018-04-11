import React from "react";
import styles from "./ListItem.css";

const ListItem = ({ data, isLoggedIn }) => {
  const { name, image_url, url } = data;
  return (
    <li className={styles.container}>
      {/* <div className={styles.image_container}> */}
        <img src={image_url} alt={name} />
      {/* </div> */}
      <div className={styles.content}>
        <a className="" href={url} target="_blank" rel="noopener noreferrer">
          <h2>{name}</h2>
        </a>
        <div className={styles.extra}>
          <span>
            <i className="user icon" />0 Going
          </span>
          {!isLoggedIn ? (
            <button className="tiny ui button primary">I'm Going!</button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
