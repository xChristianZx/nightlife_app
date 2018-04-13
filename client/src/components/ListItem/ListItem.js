import React from "react";
import styles from "./ListItem.css";

const ListItem = ({ data, isLoggedIn, addUserToAttending }) => {
  // id is yelp_id
  const { name, image_url, url, id, usersAttending } = data;
  return (
    <li className={styles.container}>
      <img src={image_url} alt={name} />
      <div className={styles.content}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Link to Yelp"
        >
          <h2>{name}</h2>
        </a>
        <div className={styles.extra}>
          <span>
            <i className="user icon" />
            {usersAttending.length} Going
          </span>
          {isLoggedIn ? (
            <button
              className="tiny ui button primary"
              onClick={() => addUserToAttending(id)}
            >
              I'm Going!
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
