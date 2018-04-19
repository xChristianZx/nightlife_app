import React, { Component } from "react";
import styles from "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Display from "./containers/Display/Display";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";

const LogOut = () => <div>You are now logged out!</div>;

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Router>
          <div className={styles.content_wrapper}>
            <NavBar />
            <Route exact path="/" component={Display} />
            <Route path="/landing" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={Register} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
