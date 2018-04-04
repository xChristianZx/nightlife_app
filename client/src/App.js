import React, { Component } from "react";
import styles from "./App.css";
// import Search from "./containers/Search/Search";
import NavBar from "./components/NavBar/NavBar";
import Display from "./containers/Display/Display";
import { BrowserRouter, Route } from "react-router-dom";

const LogIn = () => <div>LOGIN!</div>;
const LogOut = () => <div>You are now logged out!</div>;
const Register = () => <div>Register</div>;

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <BrowserRouter>
          <div>
            {/* <Search /> */}
            {/* <Display /> */}
            <NavBar />
            <Route exact path="/" component={Display} />
            <Route path="/login" component={LogIn} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
