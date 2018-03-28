import React, { Component } from "react";
import styles from "./App.css";
import Search from "./containers/Search/Search";
import NavBar from "./components/NavBar/NavBar";
import Display from "./containers/Display/Display";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <NavBar />
        <Search />
        <Display />
      </div>
    );
  }
}

export default App;
