import React, { Component } from "react";
import styles from "./App.css";
// import Search from "./containers/Search/Search";
import NavBar from "./components/NavBar/NavBar";
import Display from "./containers/Display/Display";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

const LogOut = () => <div>You are now logged out!</div>;

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Router>
          <div>
            {/* <Search /> */}
            {/* <Display /> */}
            <NavBar />
            <Route exact path="/" component={Display} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
