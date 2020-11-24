import React from 'react';
import styles from './ListItem.module.scss';

const ListItem = ({ data, auth, addUser, removeUser }) => {
  // id is yelp_id
  const { name, image_url, url, id, usersAttending } = data;
  const { isLoggedIn, user } = auth;
  const isAttending = () => {
    if (isLoggedIn && user._id !== null) {
      return usersAttending.includes(user._id) ? true : false;
    }
    return false;
  };

  const attendanceBtn = () => {
    if (isLoggedIn && !isAttending()) {
      return (
        <button className="tiny ui button primary" onClick={() => addUser(id)}>
          Go!
        </button>
      );
    } else if (isLoggedIn && isAttending()) {
      return (
        <div
          id={`${styles.attendance_btn}`}
          className={`ui animated button`}
          onClick={() => removeUser(id)}
        >
          <div className="visible content">
            Going!{'  '} <i className="icon check" />
          </div>
          <div className="hidden content">
            Not Going {'  '}
            <i className="icon times" />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

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
          {attendanceBtn()}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
