import React, { Component } from "react";
import styles from "./Search.css";

class Search extends Component {
  render() {
    return (
      <div className={styles.container}>
        <form action="/" method="post">
          <input type="text" for="/" name="location" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Search;
