import React from "react";
import styles from "./ListItem.css";

const ListItem = ({ data }) => {
  const { name, image_url, url } = data;
  return (
    <li className={styles.container}>
      <img src={image_url} alt={name} />
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h2>{name}</h2>
      </a>
      <button>I'm Going!</button>
    </li>
  );
};

export default ListItem;
