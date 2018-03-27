import React, { Component } from "react";
import styles from "./App.css";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <form action="/" method="post">
          <input type="text" for="/" name="location" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
